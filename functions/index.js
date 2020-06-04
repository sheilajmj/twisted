const functions = require('firebase-functions');
 const {Storage} = require('@google-cloud/storage');
const os = require ('os');
const path = require('path');
const spawn = require('child-process-promise').spawn;

const storage = new Storage();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


// exports.onImageChange = functions.storage.object().onFinalize(event => {
//     const object = event;
//     console.log(object, "object")
//     const bucket = object.bucket;
//     const contentType = object.contentType;
//     const filePath = object.name;  //file name and path within bucket
//     console.log('File change detected, function execution started');
    
//     if (object.resourcesState === 'not_exists'){
//         console.log('we deleted a file, exit...');
//         return;
//     }

//     if (path.basename(filePath).startsWith('thumb-')){
//         console.log("we already renamed that file")
//         return;
//     }

//     const destBucket = storage.bucket(bucket)
//     const tmpFilePath = path.join(os.tmpdir(), path.basename(filePath));
//     const metadata = { contentType: contentType };
   
//     console.log("HERE")
//     console.log(storage, "storage")
   
//     return destBucket.file(filePath).download({
//         destination: tmpFilePath
//     }).then(() => {
//         console.log("MADE IT")
//         return spawn('convert', [tmpFilePath, '-resize', '500x500', tmpFilePath ])
//     })
//         .then(() => {
//         return destBucket.upload(tmpFilePath, {
//             destination: 'thumb-' + path.basename(filePath),
//             metadata: metadata
//         })
//     })
// })