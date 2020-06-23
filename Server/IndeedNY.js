'use strict';
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
var express = require('express');
var app = express();

const admin = require('firebase');

admin.initializeApp({
    apiKey: "AIzaSyD26Fyf6wu8B94t9Od4x1hJqQR-kPP0jvo",
    authDomain: "jobparser-87e28.firebaseapp.com",
    databaseURL: "https://jobparser-87e28.firebaseio.com",
    projectId: "jobparser-87e28",
    storageBucket: "jobparser-87e28.appspot.com",
    messagingSenderId: "823456531780",
    appId: "1:823456531780:web:cb07272f71b88ba307c311",
    measurementId: "G-M14W2PD1D3"
});

const db = admin.firestore();


const getPage = ( cb ,num) => {
    
const url = 'https://www.indeed.com/jobs?q=javascript&l=New+York%2C+NY&sort=date&fromage=last&start='+num;
    request(url, {
        timeout: 3000
    }, (error, response, body) => {
        if(!error) {
            cb(body);
        }
    });
};

const parsePage = ( data ) => {
    const $ = cheerio.load(data);
    let output = [];
    let count = 0;
    
    $('#resultsCol').find('div').each((index, value) => {
        var date = $(value).find('.date').text().replace(" day ago","").replace(" days ago","").replace("+","");
        if(date < 5 || date === 'Today' || date === 'Just posted'){
            var title = $(value).find('h2').text().replace('new','');
            var link = $(value).find('h2').find('a').attr('href');
            let comNamefull = $(value).find('.sjcl').find('.company').text();

            let comName = $(value).find('.sjcl').find('.company').text().replace(/\s+/g, '').replace(".", '').replace("-", '').replace("..", '').replace("/", '').replace(",", '').toLowerCase();
            let uniceCode = title.replace(/\s+/g, '').replace(".", '').replace("-", '').replace("..", '').replace("/", '').replace(",", '').toLowerCase();
            if(title.match(/React/gi) || title.match(/Javascript/gi) || title.match(/Front/gi) || title.match(/Node/gi) || title.match(/Full/gi)){
            console.log(title);
            console.log(comName);
            // console.log('Unice code '+comName+uniceCode);

                try{
                    db.collection("Indeed").doc(comName+uniceCode).set({
                        jobTitle:title,
                        link:link,
                        comName:comNamefull,
                        uniceCode:comName+uniceCode,
                        active:1,
                        region:'NY'

                    
                    });
               }catch(e){}
               
              // if(!link.indexOf('/rc/clk?jk=')){
                //   console.log(link);
                  // console.log(date);
    
              // }
            }
        }
    });
};
for(let i = 0; i<=20; i++){
    
    getPage( (html) => {
        let data = parsePage( html );
    },i); 
   
}
 




