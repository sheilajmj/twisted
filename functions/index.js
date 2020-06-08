const functions = require('firebase-functions');
 const {Storage} = require('@google-cloud/storage');
const os = require ('os');
const path = require('path');
const spawn = require('child-process-promise').spawn;
const admin = require('firebase-admin');
admin.initializeApp();

const storage = new Storage();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

