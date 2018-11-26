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
    this._email = 'ol@m.com';
    this._password = '123456';
    this._confirmPassword = '';
    this._username = '';
    this._errorMessage = '';
    this._isAuthorized = '';
    this._friends = null;
    this._uid = null;
    this._isOnline = null;
    this._instanceId = '';
    this._placeholders = {
      username: 'Username',
      confirmPassword: 'Confirm Password',
      password: 'Password',
      email: 'Email'
    }
  }
  get collectionReference() {return this._collectionReference;}
  get isOnline() {return this._isOnline;}
  setIsOnline(value) {
    console.log('setting', value)
    this._isOnline = value;
  }
  get email() {
    console.log('getting email', this._email)

    return this._email;
  }
  setEmail(value) {
    console.log('setting', value)
    this._email = value;
    console.log('email', this.email)
  }
  get password() {return this._password;}
  setPassword(value) {
    console.log('setting', value)
    this._password = value;
  }
  get username() {
    console.log('getting username', this._username)
    return this._username;
  }
  setUsername(value) {
    console.log('setting', value)
    this._username = value;
    console.log('username', this._username)
  }
  get confirmPassword() {
    return this._confirmPassword;
  }
  setConfirmPassword(value) {
    console.log('setting', value)
    this._confirmPassword = value;
  }
  get errorMessage() {return this._errorMessage;}
  setErrorMessage(value) {
    console.log('setting', value)
    this._errorMessage = value;
  }
  get uid() {return this._uid;}
  setUid(value) {
    console.log('setting', value)
    this._uid = value;
  }
  get placeholders() {return this._placeholders;}
  setPlaceholders(key, value) {
    console.log('setting', value)
    this._placeholders[key] = value;
  }
  get instanceId() {return this._instanceId;}
  setInstanceId(value) {
    console.log('setting', value)
    this._instanceId = value;
    console.log(this._instanceId)
  }

  validate = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false)
      return "Email is Not Correct";
    else
      return text;
  }
  handleLogin = (navigate) => {
	  console.log('handleLogin')
    firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() => {
      console.log('going to navigate',navigate)
      navigate()
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

  handleSignUp = (navigate) => {
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
              navigate()
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
  setInstanceId:action
})
