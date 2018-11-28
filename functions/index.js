const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp(functions.config().firebase);

exports.sendPushNotification = functions.firestore
  .document("users/{Username}")
  .onUpdate(snap => {
    // gets standard JavaScript object from the new write
    console.log(snap.before.data(), "snap")
    const prevData = snap.after.data();
    const afterData = snap.before.data();
    var userDoc = prevData.Username;
    var pushToken = prevData.InstanceId[0];
    // access data necessary for push notification 
    
    // const recipient = writeData.recipient;
    // the payload is what will be delivered to the device(s)
    let payload = {
      notification: {
        title:"Hey there!",
        body:"You have a new friend request!",
        sound:"default",
        badge:"1"
     }
    }
    // either store the recepient tokens in the document write
    // const tokens = writeData.tokens;  
    
    // or collect them by accessing your database
    return admin.firestore().collection('users').doc(userDoc)
      .get()
      .then(doc => {
        if (prevData.FriendRequests !== afterData.FriendRequests) {
            console.log(doc, "doc sent")
            // sendToDevice can also accept an array of push tokens
            return admin.messaging().sendToDevice(pushToken, payload);
        }
          return console.log('no changes to friend requests')
      });
});

// exports.sendPushNotification = functions.firestore
//   .document("users/{alis}")
//   .onUpdate(event => {
//     // gets standard JavaScript object from the new write
//     console.log(event, "event")
//     const writeData = event.after._fieldsProto;
//     // access data necessary for push notification 
//     const sender = writeData.Uid;
//     const senderName = writeData.Username;
//     // const recipient = writeData.recipient;
//     // the payload is what will be delivered to the device(s)
//     let payload = {
//       notification: {
//       title:"hey",
//       body:"ok",
//       sound:"default",
//       badge:"1"
//      }
//     }
//     // either store the recepient tokens in the document write
//     // const tokens = writeData.tokens;  
    
//     // or collect them by accessing your database
//     var pushToken = "fJfPI8fPO3o:APA91bFC-Qnmp-vVHhmVtxB3gvKyLWbAr1yNsv0mnRZsawVCfjJxYaoeXZymVKdmKHYuT8fboMldvnHL-anaf7q0sHXTrTzRj7UcfQokB8VUt8mGH9SH2ZCYMwvgfycWQGIXly4G7Y4c";
//     return admin.firestore().collection('users').doc('to')
//       .get()
//       .then(doc => {
//           console.log(doc)
//          // sendToDevice can also accept an array of push tokens
//          return admin.messaging().sendToDevice(pushToken, payload);
//       });
// });



//test function for creating a new User
exports.createUser = functions.firestore
    .document('users/{Username}')
    .onCreate((snap, context) => {
        console.log(snap, "snap")
        //gets Javascript object from the new write
        const newValue = snap.data();

        return console.log(newValue, 'done')
    });


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
