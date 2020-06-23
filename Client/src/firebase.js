import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyD26Fyf6wu8B94t9Od4x1hJqQR-kPP0jvo",
    authDomain: "jobparser-87e28.firebaseapp.com",
    databaseURL: "https://jobparser-87e28.firebaseio.com",
    projectId: "jobparser-87e28",
    storageBucket: "jobparser-87e28.appspot.com",
    messagingSenderId: "823456531780",
    appId: "1:823456531780:web:cb07272f71b88ba307c311",
    measurementId: "G-M14W2PD1D3"
});

const db = firebaseApp.firestore();

export {db};