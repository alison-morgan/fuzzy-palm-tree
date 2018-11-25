import firebase from 'react-native-firebase';
import {
  observable,computed,action
} from 'mobx';


export default class Store {
  @observable.ref _navigationState;
  @observable _collectionReference;
  @observable _email;
  @observable _password;
  @observable _confirmPassword;
  @observable _username;
  @observable _errorMessage;
  @observable _isAuthorized;
  @observable _friends;
  @observable _uid;
  @observable _isOnline;
  @observable _placeholders;
  @observable _instanceId;
  // this._collectionReference = firebase.firestore().collection('users');
  // this._navigation = null;
  // this._email = 'ol@m.com';
  // this._password = '123456';
  // this._confirmPassword='123456';
  // this._username = 'ol';
  // this._errorMessage = '';
  // this._isAuthorized='';
  // this._friends=[];
  // this._uid=null;
  // this._isOnline=false;
  // this._instanceId='';
  // this._placeholders = {
  //   username: 'Username',
  //   confirmPassword: 'Confirm Password',
  //   password: 'Password',
  //   email: 'Email',
  // }
  constructor() {
    this._collectionReference = firebase.firestore().collection('users');
    this._navigation = null;
    this._email = '';
    this._password = '';
    this._confirmPassword='';
    this._username = '';
    this._errorMessage = '';
    this._isAuthorized='';
    this._friends=null;
    this._uid=null;
    this._isOnline=null;
    this._instanceId='';
    this._placeholders = {
      username: 'Username',
      confirmPassword: 'Confirm Password',
      password: 'Password',
      email: 'Email',
    }
  }
  @computed get collectionReference(){
    return this._collectionReference;
  }
  @computed get isOnline() { 
    return this._isOnline;
  }
  @action setIsOnline(value) {
    console.log('setting',value)
    this._isOnline = value;
   }
  @computed get navigation() { 
    return this._navigation;
  }
  @action setNavigation(value) {
    console.log('setting',value)
    this._navigation = value;
   }
  @computed get email() {  
    return this._email;
  }
  @action setEmail(value) {
    console.log('setting',value)
    this._email = value;
   }
  @computed get password() {   
    return this._password;
  }
  @action setPassword(value) {
    console.log('setting',value)
    this._password = value;
   }

   @computed get username() {  
    return this._username;
  }
  @action setUsername(value) {
    console.log('setting',value)
    this._username = value;
   }
  @computed get confirmPassword() {
    
    return this._confirmPassword;
  }
  @action setConfirmPassword(value) {
    console.log('setting',value)
    this._confirmPassword = value;
   }

   @computed get errorMessage() {
    
    return this._errorMessage;
  }
  @action setErrorMessage(value) {
    console.log('setting',value)
    this._errorMessage = value;
   }
   @computed get uid() {
    
    return this._uid;
  }
  @action setUid(value) {
    console.log('setting',value)
    this._uid = value;
   }

   @computed get placeholders() {
    
    return this._placeholders;
  }
  @action setPlaceholders(key,value) {
    console.log('setting',value)
    this._placeholders[key] = value;
   }
   @computed get instanceId() {
    
    return this._instanceId;
  }
  @action setInstanceId(value) {
    console.log('setting',value)
    this._instanceId=value;
    console.log(this._instanceId)
   }

     validate = ( text ) => {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if ( reg.test( text ) === false ) 
        return "Email is Not Correct";
      else 
        return text;
      }

  handleLogin = () => {
    messaging = firebase.messaging();
    // messaging.usePublicVapidKey("BBMWsfeTiUk7wFjU12u3rCeFMEMVMKYWm3t4ys-5KXw_mjMLHPJrlyQlzwPJlW1YHQyI9DYqqtMSiM8DtdrmhchE");
    firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(()=>{
      messaging.requestPermission()
      .then(()=>{ 
        messaging.getToken()
        .then((currentToken)=>{
          this.collectionReference.where("Uid", "==", firebase.auth().currentUser.uid)
          .get().then((querySnapshot) => {
            const data=querySnapshot.docs[0].data();
            for(field in data){
              if(field === 'InstanceId'){
                this.collectionReference.doc(data.Username).update({
                 'InstanceId': firebase.firestore.FieldValue.arrayUnion(currentToken)
                 })
                this.setInstanceId(currentToken)
              }else if(field==='IsOnline'){
                this.collectionReference.doc(data.Username).update({'IsOnline': true})
                this.setIsOnline(true)
              }else{
                this[`set${field}`](data[field])
              }
            }
          }).catch(error=>  console.log('Error getting document: ', error))
        }).catch(error=> console.log('An error occurred while retrieving token. ', error))
      }).catch(error=>console.log('Unable to get permission to notify.', error))
    }).catch(error => this.setErrorMessage(error.message))
}


  handleSignUp = () => {
    // check if user with entered username already exist in the
    // database
    messaging = firebase.messaging();
     this.collectionReference.doc( this.username ).get().then( (doc )=> {
        //if document exist
        if ( doc.exists ) {
            //let user know that he can not user entered username
            this.setPlaceholders('username','this username already exist');
            this.setUsername('');
            //if username not in use
          } else {
            //authorize user in the system
            firebase.auth().createUserWithEmailAndPassword( this.email, this.password )
            .then(()=>{
              messaging
              .requestPermission()
              .then(()=>{
                messaging.getToken()
                .then((currentToken)=>{
                  const uid=firebase.auth().currentUser.uid;
                  this.setUid(uid);
                  this.setIsOnline(true);
                  this.setInstanceId(currentToken)
                  this.collectionReference.doc( this.username )
                  .set( { InstanceId:[this.instanceId], Email: this.email, Password: this.password,
                    Username: this.username,
                    Uid: this.uid,IsOnline: this.isOnline })
                })
              }) 
            })
            .catch( error => this.setErrorMessage(error.message))
        }
    } )
 
 }

}
