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
    let payloadFriendReq = {
      notification: {
        title:"Hey there!",
        body:"You have a new friend request!",
        sound:"default",
        badge:"1"
     }
    }

    let payloadNewFriend = {
        notification: {
          title:"Hey!",
          body:"New Friends!",
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
              console.log("in friend req")
              return admin.messaging().sendToDevice(pushToken, payloadFriendReq);
            }
        } else if (Object.keys(afterData.FriendRequests) && Object.keys(prevData.FriendRequests) === undefined) {
            // sendToDevice can also accept an array of push tokens
            console.log("in friend req")
            return admin.messaging().sendToDevice(pushToken, payloadFriendReq);
        } 
        //if new Friends have been added (I.e friend request accepted)
        if (prevData.Friends) {
          if(prevData.Friends.length < afterData.Friends.length) {
            // sendToDevice can also accept an array of push tokens
            console.log("prev data.friends")
            return admin.messaging().sendToDevice(pushToken, payloadNewFriend);
          } else {
            console.log('error')
            }
        } else if (afterData.Friends) {
          console.log("in afterdata.friends")
          return admin.messaging().sendToDevice(pushToken, payloadNewFriend);
        }
          return console.log('no changes to friends')
      });
});

