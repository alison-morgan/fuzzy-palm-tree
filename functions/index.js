const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp(functions.config().firebase);


//sends notification when someone recieves a friend request
exports.sendPushNotification = functions.firestore
//looking for changes on all documents
  .document("users/{Username}")
  //on update of a document
  .onUpdate(snap => {
    // gets object with before and after snapshot of changes to doc
    console.log(snap.before.data(), snap.after.data())
    const prevData = snap.before.data();
    const afterData = snap.after.data();
    var userDoc = prevData.Username;
    // access data necessary for push notification 
    var pushToken = prevData.InstanceId[0];
    
    // the payload is what will be delivered to the device(s)
    let payload = {
      notification: {
        title:"Hey there!",
        body:"You have a new friend request!",
        sound:"default",
        badge:"1"
     }
    }

    //look at the doc that had changes made to it
    return admin.firestore().collection('users').doc(userDoc)
      .get()
      .then(doc => {
        //if Friend Requests has changed send push
        if (Object.keys(prevData.FriendRequests) && Object.keys(afterData.FriendRequests)) {
            if (Object.keys(prevData.FriendRequests).length < Object.keys(afterData.FriendRequests).length){
              // sendToDevice can also accept an array of push tokens
              return admin.messaging().sendToDevice(pushToken, payload);
            }
        } else if (Object.keys(afterData.FriendRequests) && Object.keys(prevData.FriendRequests) === undefined) {
            // sendToDevice can also accept an array of push tokens
            return admin.messaging().sendToDevice(pushToken, payload);
        }
          return console.log('no changes to friend requests')
      });
});

//sends notification when someone has a friend request accepted
exports.sendPushNotification = functions.firestore
  .document("users/{Username}")
  .onUpdate(snap => {
    // gets standard JavaScript object from the new write
    console.log(snap.before.data(), snap.after.data())
    const prevData = snap.before.data();
    const afterData = snap.after.data();
    var userDoc = prevData.Username;
    var pushToken = prevData.InstanceId[0];

    // const recipient = writeData.recipient;
    // the payload is what will be delivered to the device(s)
    let payload = {
      notification: {
        title:"Hey!",
        body:"New Friends!",
        sound:"default",
        badge:"1"
     }
    }
    
    return admin.firestore().collection('users').doc(userDoc)
      .get()
      .then(doc => {
        if (prevData.Friends) {
            if(prevData.Friends.length < afterData.Friends.length) {
               // sendToDevice can also accept an array of push tokens
            return admin.messaging().sendToDevice(pushToken, payload);
            } else {
              console.log('error')
            }
        } else if (afterData.Friends) {
          return admin.messaging().sendToDevice(pushToken, payload);
        }
        return console.log('no added friends')
      });
});


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
