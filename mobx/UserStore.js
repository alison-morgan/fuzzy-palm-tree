import firebase from 'react-native-firebase';
//import decorators for mobx
import { observable, computed, action, decorate } from 'mobx';
import { AsyncStorage, Alert} from 'react-native'
import { asyncStorageKeys } from './AsyncStorage';
// import admin  from 'firebase-admin';
// var app = admin.initializeApp();

export default class Store {
	//creating initial values for our store values
	constructor() {
		this._collectionReference = firebase.firestore().collection( 'users' );
		AsyncStorage.getItem('USERNAME').then(action(username=>{this._username=username?username:''}))
		this._email = '';
		this._password = '';
		this._unsubscriber=null;
		this._hasSeenAuthPage=false;
		this._confirmPassword = '';
		this._errorMessage = '';
		this._uid = '';
		this._isOnline = '';
		AsyncStorage.getItem('INSTANCE_ID').then(action(instanceId=>{this._instanceId=instanceId?instanceId:''}))
		this._friends = [];
		this._friendsInfo={};
		this._possibleFriends={};
		this._friendSearch=null;
		this._friendRequests={};
		this._searchResult=null;
		this._placeholders = {
			username: 'Username',
			confirmPassword: 'Confirm Password',
			password: 'Password',
			email: 'Email',
			search:'Type in username'
		}
	}

	//getter/computed for unsubscribes
	get unsubscriber(){
		return this._unsubscriber
	}

	//setter/action for searchResult
	setUnsubscriber(value){
		this._unsubscriber=value
	}

	//getter/computed for hasSeenAuthPage
	get hasSeenAuthPage(){
		return this._hasSeenAuthPage
	}

	//setter/action for hasSeenAuthPage
	setHasSeenAuthPage(value){
		this._hasSeenAuthPage=value
	}

	//getter/computed for friendRequests
	get friendRequests() {
		return this._friendRequests
	}
	//setter/action for friendRequests
	setFriendRequests( value ) {
		this._friendRequests = value
	}

	//getter/computed for searchResult
	get searchResult() {
		return this._searchResult
	}

	//setter/action for searchResult
	setSearchResult( value ) {
		this._searchResult = value
	}

	//getter/computed for friendSearch
	get friendSearch() {
		return this._friendSearch
	}

	//setter/action friendSearch
	setFriendSearch( value ) {
		this._friendSearch = value
	}

	//getter/computed for possibleFriends
	get possibleFriends() {
		return this._possibleFriends
	}

	//setter/action PossibleFriends				
	setPossibleFriends( value ) {
		this._possibleFriends = value
	}

	//setter/action FriendsInfo	
	setFriendsInfo( value ) {
		this._friendsInfo = value
	}

	//getter/computed for friendsInfo
	get friendsInfo() {
		return this._friendsInfo
	}

	//getter/computed for friends
	get friends() {
		return this._friends
	}

	//setter/action setFriends
	setFriends( value ) {
		this._friends = value;
	}

	//getter/computed for collectionReference
	get collectionReference() {
		return this._collectionReference
	}

	//getter/computed for isOnline
	get isOnline() {
		return this._isOnline
	}

	//setter/action isOnline
	setIsOnline( value ) {
		this._isOnline = value
	}

	//getter/computed for email
	get email() {
		return this._email
	}

	//setter/action setEmail
	setEmail( value ) {
		this._email = value
	}

	//getter/computed for possibleFriends
	get password() {
		return this._password
	}

	//setter/action setPassword
	setPassword( value ) {
		this._password = value
	}

	//getter/computed for username
	get username() {
		return this._username
	}

	//setter/action setUsername
	setUsername( value ) {
		this._username = value;
		AsyncStorage.setItem(asyncStorageKeys.USERNAME, value)
	}

	//getter/computed for confirmPassword
	get confirmPassword() {
		return this._confirmPassword
	}

	//setter/action setConfirmPassword
	setConfirmPassword( value ) {
		this._confirmPassword = value
	}

	//getter/computed for errorMessage
	get errorMessage() {
		return this._errorMessage
	}

	//setter/action ErrorMessage	
	setErrorMessage( value ) {
		this._errorMessage = value
	}

	//getter/computed for uid	
	get uid() {
		return this._uid;
	}

	//setter/action Uid	
	setUid( value ) {
		this._uid = value
	}

	//getter/computed for placeholders
	get placeholders() {
		return this._placeholders
	}

	//setter/action Placeholders		
	setPlaceholders( key, value ) {
		this._placeholders[ key ] = value
	}

	//getter/computed for InstanceId
	get instanceId() {
		return this._instanceId
	}

	//setter/action InstanceId
	setInstanceId( value ) {
		this._instanceId = value;
		AsyncStorage.setItem(asyncStorageKeys.INSTANCE_ID, value)
	}

	//function that validates email
	validate = ( text ) => {
		//looking for @ and . in the string and making 
		//sure there is no extra special characters
		let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		//if result false => email is incorrect
		if ( reg.test( text ) === false ) 
			return "Email is Not Correct";
		else 
			return text;
	}
	
	handleLogin = () => {
		console.log( 'handle login' )
		//login with email and password
		firebase.auth().signInWithEmailAndPassword( this.email, this.password ).then( () => {
			//requestper permission for token
			firebase.messaging().requestPermission().then( () => {
				//if permission granted recieve token
				firebase.messaging().getToken().then( ( currentToken ) => {
					//assign firebase document id to user uid
					const uid = firebase.auth().currentUser.uid
					//setting listener to document with specific uid and assigning returned function to this variable
					let unsubscribe = this.collectionReference.where( "Uid", "==", uid ).onSnapshot( ( querySnapshot ) => {
						console.log( 'found document' )
						const data = querySnapshot._docs[ 0 ].data();
						//if uid does not exist in the store
						if(this.uid===''){
							this.collectionReference.doc( data.Username ).update( { 'InstanceId': firebase.firestore.FieldValue.arrayUnion( currentToken ), 'IsOnline': true } )
						}
						//call setters for the store
						for ( field in data ) {
							//if it is instanceId field
							if(field==='InstanceId'){
								//assigning currentToken to the instanceId in the store
								this[ `set${ field }` ]( currentToken )
							}else{	
								//assign remaining document fields to their store fields								
								this[ `set${ field }` ]( data[ field ] )
							}
						}
						//get all users info
						this.getAllUsersInfo()
					}, error => {
						console.log( 'error getting document: ', error )
					} )
					//set unsubscribe function to the store
					this.setUnsubscriber(unsubscribe)
				} ).catch( error => console.log( 'An error occurred while retrieving token. ', error ) )
			} ).catch( error => console.log( 'Unable to get permission to notify.', error ) )
		} ).catch( error => this.setErrorMessage( error.message ) )
	}

	handleSignUp = () => {
		console.log( 'handleSignUp' )
		// check if user with entered username already exist in the
		// database
		this.collectionReference.doc( this.username ).get().then( ( doc ) => {
			//if document exist
			if ( doc.exists ) {
				//let user know that he can not user entered username
				this.setPlaceholders( 'username', 'this username already exist' );
				//if username not in use
				this.setUsername( '' );
			} else {
				//creating authorized account with valid email and password
				firebase.auth().createUserWithEmailAndPassword( this.email, this.password ).then( () => {
					//request permission to create token					
					firebase.messaging().requestPermission().then( () => {
						//if permission granted receive token
						firebase.messaging().getToken().then( ( currentToken ) => {
							//set instance id to current token for push notifications
							this.setInstanceId(currentToken);
							const uid = firebase.auth().currentUser.uid;
							//create new document in the database with information that user typed in
							this.collectionReference.doc( this.username ).set( {
								InstanceId: [currentToken],
								Email: this.email,
								Username: this.username,
								Uid: uid,
								IsOnline: true,
								FriendRequests: [],
							} ).then( () => {
								//get information about user
								this.getUserInfo();
							} )
						} ).catch( error => console.log( 'error getting token', error ) )
					} ).catch( error => console.log( 'error getting permission', error ) )
				} ).catch( error => this.setErrorMessage( error.message ) )
			}
		} )
	}

	getUserInfo=()=>{
		//set listener to the user doument and assign returned function to the unsubscribe variable
		let unsubscribe = this.collectionReference.doc( this.username ).onSnapshot( ( doc ) => {
			//assign data from the document to the data variable
			const data = doc.data();
			//go through the fields in data obj
			for ( field in data ) {
				//if this field not instanceId field
				if(field!=='InstanceId'){
					//call setter for the rest of the fields
					this[ `set${ field }` ]( data[ field ] )
				}
			}
			//get all other users info
			this.getAllUsersInfo()	
		}, error => {
			console.log( 'error getting document: ', error )
		} )
		//set unsubscribe function to the store
		this.setUnsubscriber(unsubscribe)
	}

	getAllUsersInfo = () => {
	//get info for all docs in collections		
		this.collectionReference.onSnapshot( querySnapshot => {
			//create object that will have information about all users
		   const users={
			FriendsInfo:{},
			PossibleFriends:{},
			FriendRequests:{}
		   }
		//go through all available documents in querySnapshot
		   querySnapshot.forEach( doc => {
			   //assign all information from the document to the user variable
			   const user = doc.data();
				//if username in this document equals to the current user username
			   if(user.Username===this.username){
				   //skip this document
				   return
				//if document's username inside of friends array
			   }else if(this.friends.indexOf(user.Username)!==-1){
				   //write information about this user to the friendsInfo object
				   users.FriendsInfo[user.Username]={ username: user.Username, isOnline: user.IsOnline, instanceId: user.InstanceId};
				//if document's username inside of friendRequests object			  
				}else if(this.friendRequests.hasOwnProperty(user.Username)){
					//write information about this user to the friendRequests object
				   users.FriendRequests[user.Username]={ username: user.Username, isOnline: user.IsOnline};
				//otherwise
			   }else{
					//write information about this user to the possibleFriends object
				   users.PossibleFriends[user.Username] = { username: user.Username, isOnline: user.IsOnline, instanceId: user.InstanceId, friends: user.Friends }
			   }
		   } )
		   //go througn friends object inside users object
			for(group in users){
				//call setter for each object
				this[ `set${ group }` ]( users[group] )
			}
		} )
	}

	//function that taking care about instant search
	search = ( name ) => {
		//if we are looking for friends
		if ( name === 'friends' ) {
			//create object for each search group and find usernames that have string that user is looking for
			const searchFriend = Object.keys( this.friendsInfo ).reduce( ( searchFriend, name ) => {
				if ( name.toLowerCase().includes( this.friendSearch.toLowerCase() ) ) {
					searchFriend[ name ] = this.friendsInfo[ name ]
				}
				return searchFriend
			}, {} )
			const searchPossibleFriend = Object.keys( this.possibleFriends ).reduce( ( searchPossibleFriend, name ) => {
				if ( name.toLowerCase().includes( this.friendSearch.toLowerCase() ) ) {
					searchPossibleFriend[ name ] = this.possibleFriends[ name ]
				}
				return searchPossibleFriend
			}, {} )
			const searchFriendRequests = Object.keys( this.friendRequests ).reduce( ( searchFriendRequests, name ) => {
				if ( name.toLowerCase().includes( this.friendSearch.toLowerCase() ) ) {
					searchFriendRequests[ name ] = this.friendRequests[ name ]
				}
				return searchFriendRequests
			}, {} )
			//assign result to the searchResult object in the store
			this.setSearchResult( { friends: searchFriend, possibleFriends: searchPossibleFriend, friendRequests: searchFriendRequests } )
		}

	}

	friendReq = ( friend ) => {
		//add friend request to doc of specified person		
		this.collectionReference.doc( friend ).set( {
			//add field if doesn't exist otherwise update			
			FriendRequests: {
				[ this.username ]: {
					username: this.username,
				}
			}
		}, { merge: true } )
	}

	declineReq = (friend) => {
		// delete friend request in doc if declined				
		this.collectionReference.doc(this.username).update({[`FriendRequests.${friend}`]: firebase.firestore.FieldValue.delete()
		})
	  }
	
	
	acceptReq = (friend) => {
		  console.log('accepting')
		  //look at doc of friend and add friend request field if Friends array doesn't exist		  
		this.collectionReference.doc(friend).set({Friends:[this.username]}, { merge: true })
		.then(() => {
			//look at user doc and delete friend request 
		  this.collectionReference.doc(this.username).update({[`FriendRequests.${friend}`]: firebase.firestore.FieldValue.delete()
		  })
		 console.log("deleted")
		})
		.then(() => {
			//add new friend in user doc to friend array
		  this.collectionReference.doc(this.username).update({Friends:firebase.firestore.FieldValue.arrayUnion( friend )})
		  console.log("added new friend to user doc")
		})
		.then(() => {
			//look at user doc and if friend request map is empty delete it
		  this.collectionReference.doc(this.username).get().then(doc => {
			if(Object.keys(doc._data.FriendRequests).length === 0) {
			  this.collectionReference.doc(this.username).update({FriendRequests: firebase.firestore.FieldValue.delete()})
			  console.log("empty object")
			} else {
			  console.log("not empty object")
			}
		  })
		})
		.catch((err) => {
		  console.log(err)
		})
	}

	//function that signing out user from the app
	signOut = () => {
		//sign out user from firebase
		firebase.auth().signOut().then( () => {
			let unsubscribe=this.unsubscriber;
			//unsubscribe store from the listeners 
			unsubscribe();
			//update online status to false and delete current InstanceId from the database
			this.collectionReference.doc( this.username ).update( {
				'InstanceId': firebase.firestore.FieldValue.arrayRemove( this.instanceId ),
				'IsOnline': false
			}).then(()=>{
				//reset all variables in the store
				this.reset();
			})
		} ).catch( error => console.log( 'error when sign out user: ', error ) )
	}

	resetPassword=()=>{
		//make sure email is valid
		if(this.email!==''){
			if(this.validate(this.email)==='Email is Not Correct'){
				this.setPlaceholders('email', 'Please enter a valid email');
			}else{
				//if valid send reset email
				firebase.auth().sendPasswordResetEmail(this.email)
					.then(function() {
						//popup to let you know email has been sent
						Alert.alert(
							`Sorry you forgot your password. :(`,
							'An Email Has Been Sent!',
							[
								{text: 'OK', onPress: () => console.log('OK Pressed')},
							],
							{ cancelable: false }
						  )
					}).catch(function(error) {
						console.log(error)
						// An error happened.
					});
			}
		}else{
			//placeholders
			this.setPlaceholders('email', 'Please enter an email');
		}
		
	}

	//function that resets all variables in the store
	reset = () => {
		this.setHasSeenAuthPage(false)
		this.setEmail( '' );
		this.setPassword( '' );
		this.setConfirmPassword( '' );
		this.setUsername( '' );
		this.setErrorMessage( '' );
		this.setFriends([]);
		this.setFriendSearch( null)
		this.setSearchResult( null )
		this.setUid( '' );
		this.setIsOnline( '' );
		this.setInstanceId( '' );
		this.setUnsubscriber(null);
		this.setFriendRequests({});
		this.setFriendsInfo({});
		this.setPossibleFriends({})
	}

}
//assign decorators to the userStore
decorate( Store, {
	_collectionReference: observable,
	_email: observable,
	_password: observable,
	_confirmPassword: observable,
	_username: observable,
	_errorMessage: observable,
	_hasSeenAuthPage: observable,
	_friends: observable,
	_friendsInfo: observable,
	_possibleFriends: observable,
	_friendSearch: observable,
	_searchResult: observable,
	_friendRequests: observable,
	_uid: observable,
	_isOnline: observable,
	_placeholders: observable,
	_instanceId: observable,
	_unsubscriber:observable,
	collectionReference: computed,
	isOnline: computed,
	setIsOnline: action,
	email: computed,
	setEmail: action,
	password: computed,
	setPassword: action,
	username: computed,
	setUsername: action,
	confirmPassword: computed,
	setConfirmPassword: action,
	errorMessage: computed,
	setErrorMessage: action,
	uid: computed,
	setUid: action,
	placeholders: computed,
	setPlaceholders: action,
	instanceId: computed,
	setInstanceId: action,
	friendsInfo: computed,
	setFriendsInfo: action,
	friends: computed,
	setFriends: action,
	possibleFriends: computed,
	setPossibleFriends: action,
	friendSearch: computed,
	setFriendSearch: action,
	searchResult: computed,
	setSearchResult: action,
	friendRequests: computed,
	setFriendRequests: action,
	hasSeenAuthPage:computed,
	setHasSeenAuthPage:action,
	unsubscriber:computed,
	setUnsubscriber:action
} )