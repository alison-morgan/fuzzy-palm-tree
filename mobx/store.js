import firebase from 'react-native-firebase';
import {
  observable,computed,action
} from 'mobx';


export default class Store {
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

  constructor() {
    this.collectionReference = firebase.firestore().collection('users');
    this._email = 'ol@m.com';
    this._password = '123456';
    this._confirmPassword='123456';
    this._username = 'ol';
    this._errorMessage = '';
    this._isAuthorized='';
    this._friends=[];
    this._uid='';
    this._isOnline=false;
    this._instanceId=[];
    this._placeholders = {
      username: 'Username',
      confirmPassword: 'Confirm Password',
      password: 'Password',
      email: 'Email',
    }
  }

  @computed get email() {
    console.log('gettingEmail')
    return this._email;
  }
  @action setEmail(value) {
    console.log('setting',value)
    this._email = value;
   }
  @computed get password() {
    console.log('gettingEmail')
    return this._password;
  }
  @action setPassword(value) {
    console.log('setting',value)
    this._password = value;
   }

   @computed get username() {
    console.log('gettingEmail')
    return this._username;
  }
  @action setUsername(value) {
    console.log('setting',value)
    this._username = value;
   }
  @computed get confirmPassword() {
    console.log('gettingEmail')
    return this._confirmPassword;
  }
  @action setConfirmPassword(value) {
    console.log('setting',value)
    this._confirmPassword = value;
   }

   @computed get errorMessage() {
    console.log('gettingEmail')
    return this._errorMessage;
  }
  @action setErrorMessage(value) {
    console.log('setting',value)
    this._errorMessage = value;
   }


   @computed get uid() {
    console.log('gettingEmail')
    return this._uid;
  }
  @action setUid(value) {
    console.log('setting',value)
    this._uid = value;
   }

   @computed get placeholders() {
    console.log('gettingEmail')
    return this._placeholders;
  }
  @action setPlaceholders(key,value) {
    console.log('setting',value)
    this._placeholders[key] = value;
   }
   @computed get instanceId() {
    console.log('gettingEmail')
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
    console.log('handleLogin')
    console.log(this['setUsername'])
    // firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
    //   firebase.messaging()
    //   .requestPermission()
    //   .then(()=>{
    //     firebase.messaging().getToken()
    //     .then((currentToken)=>{

    //     this.collectionReference.where("uid", "==", firebase.auth().currentUser.uid)
    //   .get().then((querySnapshot) => {
    //     const data=querySnapshot.docs[0].data;
    //     for(field in data){
    //       if(field === 'InstanceId'){
    //         querySnapshot.docs[0].update({
    //           'InstanceId': FieldValue.arrayUnion(currentToken)
    //         })
    //         this.setInstanceId(currentToken)
    //       }else{
    //       console.log(this[`set${field} data[field]`])
    //     }
    //     }
    //   }).then(()=>{
    //     this.authorization();
    //   }).catch(function (error) {
    //     console.log('Error getting document: ', error)
    //   })

    //      console.log(currentToken)
    //     })
    //   }) 
     
    // ).catch(error => this.setErrorMessage(error.message))
  }


  handleSignUp = () => {
    // check if user with entered username already exist in the
    // database
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
              firebase.messaging()
              .requestPermission()
              .then(()=>{
                firebase.messaging().getToken()
                .then((currentToken)=>{
                  const uid=firebase.auth().currentUser.uid;
                  this.setUid(uid);
                  this.setInstanceId(currentToken)
                  this.collectionReference.doc( this.username )
                  .set( { InstanceId:[this.instanceId], Email: this.email, Password: this.password,
                    Username: this.username,
                    Uid: this.uid })
                })
              }) 
            })
            .catch( error => this.setErrorMessage(error.message))
        }
    } )
 
 }

}
