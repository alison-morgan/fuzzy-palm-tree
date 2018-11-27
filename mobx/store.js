import firebase from 'react-native-firebase';
import {
  observable,
  computed,
  action,
  decorate
} from 'mobx';

export default class Store {
  constructor() {
    this._collectionReference = firebase.firestore().collection('users');
    this._email = null;
    this._password = null;
    this._confirmPassword = null;
    this._username = null;
    this._errorMessage = null;
    this._friends = null;
    this._uid = null;
    this._isOnline = null;
    this._instanceId = null;
    this._friendsInfo={};
    this._placeholders = {
      username: 'Username',
      confirmPassword: 'Confirm Password',
      password: 'Password',
      email: 'Email'
    }
  }
  get friendsInfo() {return this._friendsInfo}
  setFriendsInfo(value) {this._friendsInfo[value.username] = value}
  get friends() {return this._friends}
  setFriends(value) {
    if(this._friends){
     this._friends.push(value)
    }
    else{
    this._friends = value;
    }
  }
  get collectionReference() {return this._collectionReference}

  get isOnline() {return this._isOnline}

  setIsOnline(value) {this._isOnline = value}

  get email() {return this._email}

  setEmail(value) {this._email = value}

  get password() {return this._password}

  setPassword(value) {this._password = value}

  get username() {return this._username}

  setUsername(value) {this._username = value}

  get confirmPassword() {return this._confirmPassword}

  setConfirmPassword(value) {this._confirmPassword = value;
  }
  get errorMessage() {return this._errorMessage}

  setErrorMessage(value) {this._errorMessage = value}

  get uid() {return this._uid;}

  setUid(value) {this._uid = value}

  get placeholders() {return this._placeholders}

  setPlaceholders(key, value) {this._placeholders[key] = value}

  get instanceId() {return this._instanceId}

  setInstanceId(value) {this._instanceId = value}

  validate = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false)
      return "Email is Not Correct";
    else
      return text;
  }

  handleLogin = () => {
	  console.log('handleLogin')
    firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() => {
      console.log('user auth')
      firebase.messaging().requestPermission().then(() => {
		console.log('permission') 
        firebase.messaging().getToken().then((currentToken) => {
          const uid=firebase.auth().currentUser.uid
			console.log('token',uid)
          this.collectionReference.where("Uid", "==", uid).get().then((querySnapshot) => {
			  const data = querySnapshot.docs[0].data();
			console.log('found document,getting data')
            for (field in data) {
              if (field === 'InstanceId') {
                this.collectionReference.doc(data.Username).update({
                  'InstanceId': firebase.firestore.FieldValue.arrayUnion(currentToken)
                })
                this.setInstanceId(currentToken)
              } else if (field === 'IsOnline') {
                this.collectionReference.doc(data.Username).update({
                  'IsOnline': true
                })
                this.setIsOnline(true)
              } else {
                this[`set${ field }`](data[field])
              }
			      }
          }).catch(error => console.log('Error getting document: ', error))
        }).catch(error => console.log('An error occurred while retrieving token. ', error))
      }).catch(error => console.log('Unable to get permission to notify.', error))
    }).catch(error => this.setErrorMessage(error.message))
  }

  handleSignUp = () => {
    // check if user with entered username already exist in the
    // database
    this.collectionReference.doc(this.username).get().then((doc) => {
      //if document exist
      if (doc.exists) {
        //let user know that he can not user entered username
        this.setPlaceholders('username', 'this username already exist');
        this.setUsername('');
        //if username not in use
      } else {
        //authorize user in the system
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(() => {
          firebase.messaging().requestPermission().then(() => {
            firebase.messaging().getToken().then((currentToken) => {
              const uid = firebase.auth().currentUser.uid;
              this.setUid(uid);
              this.setIsOnline(true);
              this.setInstanceId(currentToken)
              this.collectionReference.doc(this.username).set({
                InstanceId: [this.instanceId],
                Email: this.email,
                Password: this.password,
                Username: this.username,
                Uid: this.uid,
                IsOnline: this.isOnline,
              })
            })
          })
        }).catch(error => this.setErrorMessage(error.message))
      }
    })
  }
  signOut=()=>{
    firebase.auth().signOut().then(()=>{
      this.collectionReference.doc(this.username).update({
      'InstanceId': firebase.firestore.FieldValue.arrayRemove(this.instanceId),
      'IsOnline': false
    })})
}

reset=()=>{
    this.setEmail(null);
    this.setPassword(null);
    this.setConfirmPassword(null);
    this.setUsername(null);
    this.setErrorMessage(null);
    this.setFriends(null);
    this.setUid(null);
    this.setIsOnline(null);
    this.setInstanceId(null);
    this.setFriendsInfo({});
}

}
decorate(Store,{
  _collectionReference:observable,
  _email:observable,
   _password:observable,
   _confirmPassword: observable,
   _username: observable,
   _errorMessage:observable,
   _isAuthorized:observable,
   _friends:observable,
   _friendsInfo:observable,
   _uid:observable,
   _isOnline:observable,
   _placeholders:observable,
   _instanceId:observable,
   collectionReference:computed,
   isOnline:computed,
   setIsOnline:action,
   email:computed,
   setEmail:action,
   password: computed,
  setPassword:action,
  username:computed,
  setUsername:action,
  confirmPassword:computed,
  setConfirmPassword:action,
  errorMessage:computed,
  setErrorMessage:action,
  uid:computed,
  setUid:action,
  placeholders:computed,
  setPlaceholders:action,
  instanceId:computed,
  setInstanceId:action,
  friendsInfo:computed,
  setFriendsInfo:action,
  friends:computed,
  setFriends:action,
  friendsInfo:computed,
  getFriendsInfo:action
})