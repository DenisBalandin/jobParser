'use strict';
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
var express = require('express');
var app = express();

const url = 'https://www.svoboda.org/news/';
const admin = require('firebase');

admin.initializeApp({
    apiKey: "AIzaSyA0XOsFHsia9EdRuLRma5-QZYxLtEl8Hos",
    authDomain: "nprussia.firebaseapp.com",
    databaseURL: "https://nprussia.firebaseio.com",
    projectId: "nprussia",
    storageBucket: "nprussia.appspot.com",
    messagingSenderId: "758504323641",
    appId: "1:758504323641:web:7cb2850b7c2f9f0c226be8",
    measurementId: "G-C6SVPY21K8"
});

const db = admin.firestore();

exports.SvobodaNews = (req, res) => {
   const getPage = ( cb ) => {
    request(url, {
        timeout: 3000
    }, (error, response, body) => {
        if(!error) {
            cb(body);
        }
    });
};
// const checkImage = (url) =>{
//     var status;
//     var statusText;
//     try{
//         xhr.open("GET", url, true);
//         xhr.send();
//         xhr.onload = function(){
//             status = xhr.status;
//             statusText = xhr.statusText;
//             if(status == 404){
//                 console.log('404');
//             }else{
//                 console.log('200');
//             }
//         }
//     }catch(e){
        
//     }

     
// }
const parsePage = ( data ) => {
    const $ = cheerio.load(data);
    let output = [];
    let count = 0;
    $( "li" ).each((i, elem ) => {
        let $a = $(elem).find('a');
        let url = $a.attr('href');

       // console.log(url);
        if(typeof url !== 'undefined'){
            let img = $(elem).find('img').data();

        //    let news = url.search('/a/');
          // console.log(news);
            if(url.search('/a/3') === 0){
                //console.log();
                request('https://www.svoboda.org'+url, {
                    timeout: 5000
                },(error, response, body) => {
                    //console.log(body);
                    try{
                        var $e = cheerio.load(body);
                        let h1 = $e('.hdr-container').find('h1').text();
                        if(typeof img !== 'undefined'){
                            // console.log(img.src.search('w66'));
                         // if(count < 1){
                                if(img.src.search('w66') > 1){
                                    var newImg = img.src.replace('w66','w960');
                                    let id = url.replace('/a/','');
                                    id = id.replace('.html','');
                                    let description = $e('.wsw').find('p').text();
                                    let text = $e('.wsw').html();
                                    let h1 = $e('.col-title').find('h1').text();
                                    var today = new Date();
                                    var dd = String(today.getDate()).padStart(2, '0');
                                    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                                    var yyyy = today.getFullYear();

                                    today = mm + '/' + dd + '/' + yyyy;
                                    //console.log(today);
                                     console.log(h1);
                                    db.collection("SvobodaNews").doc(id).set({
                                        cpulink:id,
                                        title_head: h1,
                                        title_desc:description,
                                        title:h1,
                                        date:today,
                                        img:newImg,
                                        text:text,
                                        active:1
                                    });
                                    //console.log(id);
                                    //console.log(h1);
                                    //console.log(newImg);
                                }
                            //}
                        }
                        //count ++;

                       // let img = $e('#content').html();
                        //console.log('https://www.svoboda.org'+url);
                        //  console.log(h1);
                       // console.log(img);
                        // let comments = $('.answerslist').find('span').text();
                    
                   }catch(e){}

                });   
             }
        }
    });
};



    getPage( (html) => {
        let data = parsePage( html );
    });  



  let message = req.query.message || req.body.message || 'Hello World!';
  res.status(200).send(message);
};
