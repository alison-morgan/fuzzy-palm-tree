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
    this._friendsInfo=null;
    this._possibleFriends=null;
    this._friendSearch=null;
    this._friendRequests=null;
    this._searchResult=null;
    this._placeholders = {
      username: 'Username',
      confirmPassword: 'Confirm Password',
      password: 'Password',
      email: 'Email',
      search:'Type in username'
    }
  }

  get friendRequests(){return this._friendRequests}

  setFriendRequests(value){
    if(Array.isArray(value)|| value===null )
    this._friendRequests = value;
  else
     this._friendRequests.push(value)
  }

  get searchResult(){return this._searchResult}

  setSearchResult(value){this._searchResult=value}

  get friendSearch(){return this._friendSearch}

  setFriendSearch(value){this._friendSearch=value}

  get possibleFriends(){return this._possibleFriends}

  setPossibleFriends(value){
    if( Object.keys(value).length !== 0){
      this._possibleFriends[value.username]=value
    }else{
      this._possibleFriends=value
    }
  }

  setFriendsInfo(value) {
    console.log('friends value',value)
    if(Object.keys(value).length !== 0){
      this._friendsInfo[value.username]=value
    }else{
      this._friendsInfo=value
    }
  }

  get friendsInfo() {return this._friendsInfo}

  get friends() {return this._friends}

  setFriends(value) {
    console.log('setting friends',value,'checking friends',this.friends)
    if(Array.isArray(value)|| value===null )
      this._friends = value;
    else
       this._friends.push(value)
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

  setConfirmPassword(value) {this._confirmPassword = value}

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
    console.log('handle login')
    firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() => {
      console.log('auth')
      firebase.messaging().requestPermission().then(() => {
        console.log('permission')
        firebase.messaging().getToken().then((currentToken) => {
          console.log('token')
          const uid=firebase.auth().currentUser.uid
          console.log('uid  ',uid)
          this.collectionReference.where("Uid", "==", uid).onSnapshot((querySnapshot)=>{
            console.log('found document')
            const data=querySnapshot._docs[0].data();
            // console.log('data',data)
            this.collectionReference.doc(data.Username).update({
              'InstanceId': firebase.firestore.FieldValue.arrayUnion(currentToken),
              'IsOnline': true
            })
            for (field in data) {
              this[`set${ field }`](data[field])
            }
            this.getMyFriends();
            this.getAllUsers();
          },error=>{console.log('error getting document: ',error)})
        }).catch(error => console.log('An error occurred while retrieving token. ', error))
      }).catch(error => console.log('Unable to get permission to notify.', error))
    }).catch(error => this.setErrorMessage(error.message))
  }

  getMyFriends=()=>{
    if(this.friends){
      // console.log(this.friends)
      this.friends.forEach(friend => { 
        // console.log('friiiiiend',friend)
        this.collectionReference.doc(friend).onSnapshot(doc => {
          const data=doc.data();
          // console.log(data)
         this.setFriendsInfo({username:data.Username,isOnline:data.IsOnline,instanceId:data.InstanceId})
        })
      });
    } else {
      console.log("no friends")
    }
  }

  handleSignUp = () => {
    console.log('handleSignUp')
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
          console.log('signed up')
          firebase.messaging().requestPermission().then(() => {
            firebase.messaging().getToken().then((currentToken) => {
              const uid = firebase.auth().currentUser.uid;
              this.collectionReference.doc(this.username).set({
                InstanceId: [currentToken],
                Email: this.email,
                Password: this.password,
                Username: this.username,
                Uid: uid,
                IsOnline: true,
                FriendRequests:[],
              }).then(()=>{
                this.collectionReference.doc(this.username).onSnapshot((doc)=>{
                  const data=doc.data();
                  for (field in data) {
                    this[`set${ field }`](data[field])
                  }
                  this.getAllUsers();
                },error=>{console.log('error getting document: ',error)})
              }).catch(error=>console.log('',error))
            })
          })
        }).catch(error => this.setErrorMessage(error.message))
      }
    })
  }
  getAllUsers=()=>{
    console.log('gettingAllUsers')
    this.collectionReference.onSnapshot(querySnapshot=>{
      querySnapshot.forEach(doc=>{
        const user=doc.data();
        if(this.friends){
          if( this.friends.indexOf(user.Username)===-1  
          && user.Username!==this.username)
            this.setPossibleFriends({username:user.Username,isOnline:user.IsOnline,instanceId:user.InstanceId,friends:user.Friends})
        }else{
          if( user.Username!==this.username)
            this.setPossibleFriends({username:user.Username,isOnline:user.IsOnline,instanceId:user.InstanceId,friends:user.Friends})
        }
      })
    })
  }
  search=(name)=>{
    if(name==='friends'){
       const searchFriend = Object.keys(this.friendsInfo).reduce((searchFriend,name)=>{
        if(name.toLowerCase().includes(this.friendSearch.toLowerCase())){
          searchFriend[name]=this.friendsInfo[name]
        }
        return searchFriend
       },{})
       const searchPossibleFriend = Object.keys(this.possibleFriends).reduce((searchPossibleFriend,name)=>{
        if(name.toLowerCase().includes(this.friendSearch.toLowerCase())){
          searchPossibleFriend[name]=this.possibleFriends[name]
        }
        return searchPossibleFriend
       },{})

      this.setSearchResult({
        friends: searchFriend,
        possibleFriends: searchPossibleFriend
      })
    }

  }
  signOut=()=>{
    firebase.auth().signOut().then(()=>{
      this.collectionReference.doc(this.username).update({
      'InstanceId': firebase.firestore.FieldValue.arrayRemove(this.instanceId[0]),
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
    this.setFriendSearch(null)
    this.setSearchResult(null)
    this.setUid(null);
    this.setIsOnline(null);
    this.setInstanceId(null);
    this.setFriendsInfo({});
    this.setPossibleFriends({})
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
  _possibleFriends:observable,
  _friendSearch:observable,
  _searchResult:observable,
  _friendRequests:observable,
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
  possibleFriends:computed,
  setPossibleFriends:action,
  friendSearch:computed,
  setFriendSearch:action,
  searchResult:computed,
  setSearchResult:action,
  friendRequests:computed,
  setFriendRequests:action
})