import firebase from 'react-native-firebase';
//import decorators for mobx
import { observable, computed, action, decorate } from 'mobx';
import { AsyncStorage } from 'react-native'
import { asyncStorageKeys } from './AsyncStorage'

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
	get unsubscriber(){
		return this._unsubscriber
	}
	setUnsubscriber(value){
		this._unsubscriber=value
	}

	get hasSeenAuthPage(){
		return this._hasSeenAuthPage
	}

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

	//getter/computed for
	get possibleFriends() {
		return this._possibleFriends
	}

	setPossibleFriends( value ) {
		this._possibleFriends = value
	}

	setFriendsInfo( value ) {
		this._friendsInfo = value
	}

	get friendsInfo() {
		return this._friendsInfo
	}

	get friends() {
		return this._friends
	}

	setFriends( value ) {
		this._friends = value;
	}

	get collectionReference() {
		return this._collectionReference
	}

	get isOnline() {
		return this._isOnline
	}

	setIsOnline( value ) {
		this._isOnline = value
	}

	get email() {
		return this._email
	}

	setEmail( value ) {
		this._email = value
	}

	get password() {
		return this._password
	}

	setPassword( value ) {
		this._password = value
	}

	get username() {
		return this._username
	}

	setUsername( value ) {
		this._username = value;
		AsyncStorage.setItem(asyncStorageKeys.USERNAME, value)
	}

	get confirmPassword() {
		return this._confirmPassword
	}

	setConfirmPassword( value ) {
		this._confirmPassword = value
	}

	get errorMessage() {
		return this._errorMessage
	}

	setErrorMessage( value ) {
		this._errorMessage = value
	}

	get uid() {
		return this._uid;
	}

	setUid( value ) {
		this._uid = value
	}

	get placeholders() {
		return this._placeholders
	}

	setPlaceholders( key, value ) {
		this._placeholders[ key ] = value
	}

	get instanceId() {
		return this._instanceId
	}

	setInstanceId( value ) {
		this._instanceId = value;
		AsyncStorage.setItem(asyncStorageKeys.INSTANCE_ID, value)
	}

	validate = ( text ) => {
		let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if ( reg.test( text ) === false ) 
			return "Email is Not Correct";
		else 
			return text;
		}
	
	handleLogin = () => {
		console.log( 'handle login' )
		firebase.auth().signInWithEmailAndPassword( this.email, this.password ).then( () => {
			console.log( 'auth' )
			firebase.messaging().requestPermission().then( () => {
				console.log( 'permission' )
				firebase.messaging().getToken().then( ( currentToken ) => {
					console.log( 'token' ,firebase.auth())
					const uid = firebase.auth().currentUser.uid
					console.log( 'uid  ', uid )
					let unsubscribe = this.collectionReference.where( "Uid", "==", uid ).onSnapshot( ( querySnapshot ) => {
						console.log( 'found document' )
						const data = querySnapshot._docs[ 0 ].data();
						if(this.uid===''){
							console.log('making user online')
							this.collectionReference.doc( data.Username ).update( { 'InstanceId': firebase.firestore.FieldValue.arrayUnion( currentToken ), 'IsOnline': true } )
						}
						for ( field in data ) {
							if(field==='InstanceId'){
								this[ `set${ field }` ]( currentToken )
							}else{
								this[ `set${ field }` ]( data[ field ] )
							}
						}
						this.getAllUsersInfo()
					}, error => {
						console.log( 'error getting document: ', error )
					} )
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
				this.setUsername( '' );
				//if username not in use
			} else {
				//authorize user in the system
				firebase.auth().createUserWithEmailAndPassword( this.email, this.password ).then( () => {
					firebase.messaging().requestPermission().then( () => {
						firebase.messaging().getToken().then( ( currentToken ) => {
							this.setInstanceId(currentToken);
							const uid = firebase.auth().currentUser.uid;
							this.collectionReference.doc( this.username ).set( {
								InstanceId: [currentToken],
								Email: this.email,
								Username: this.username,
								Uid: uid,
								IsOnline: true,
								FriendRequests: [],
							} ).then( () => {
								this.getUserInfo();
							} )
						} ).catch( error => console.log( 'error getting token', error ) )
					} ).catch( error => console.log( 'error getting permission', error ) )
				} ).catch( error => this.setErrorMessage( error.message ) )
			}
		} )
	}

	getUserInfo=()=>{
		let unsubscribe = this.collectionReference.doc( this.username ).onSnapshot( ( doc ) => {
			const data = doc.data();
			for ( field in data ) {
				if(field==='InstanceId'){
					console.log('I dont know token')
					this[ `set${ field }` ]( this.instanceId )
				}else{
					this[ `set${ field }` ]( data[ field ] )
				}
			}			
			this.getAllUsersInfo()	
		}, error => {
			console.log( 'error getting document: ', error )
		} )
		this.setUnsubscriber(unsubscribe)
	}

	getAllUsersInfo = () => {
		this.collectionReference.onSnapshot( querySnapshot => {
		   const users={
			FriendsInfo:{},
			PossibleFriends:{},
			FriendRequests:{}
		   }
		   querySnapshot.forEach( doc => {
			   const user = doc.data();
			   if(user.Username===this.username){
				   return
			   }else if(this.friends.indexOf(user.Username)!==-1){
				   users.FriendsInfo[user.Username]={ username: user.Username, isOnline: user.IsOnline, instanceId: user.InstanceId};
			   }else if(this.friendRequests.hasOwnProperty(user.Username)){
				   users.FriendRequests[user.Username]={ username: user.Username, isOnline: user.IsOnline}
			   }else{
				   users.PossibleFriends[user.Username] = { username: user.Username, isOnline: user.IsOnline, instanceId: user.InstanceId, friends: user.Friends }
			   }
		   } )
			for(group in users){
				this[ `set${ group }` ]( users[group] )
			}
		} )
	}

	search = ( name ) => {
		if ( name === 'friends' ) {
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

			this.setSearchResult( { friends: searchFriend, possibleFriends: searchPossibleFriend, friendRequests: searchFriendRequests } )
		}

	}

	friendReq = ( friend ) => {
		this.collectionReference.doc( friend ).set( {
			FriendRequests: {
				[ this.username ]: {
					username: this.username,
				}
			}
		}, { merge: true } )
	}

	declineReq = (friend) => {
		this.collectionReference.doc(this.username).update({[`FriendRequests.${friend}`]: firebase.firestore.FieldValue.delete()
		})
	  }
	
	acceptReq = (friend) => {
		  console.log('accepting')
		this.collectionReference.doc(friend).set({Friends:[this.username]}, { merge: true })
		.then(() => {
		  this.collectionReference.doc(this.username).update({[`FriendRequests.${friend}`]: firebase.firestore.FieldValue.delete()
		  })
		 console.log("deleted")
		})
		.then(() => {
		  this.collectionReference.doc(this.username).set({Friends:[friend]}, {merge: true})
		  console.log("added new friend to user doc")
		})
		.then(() => {
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


	signOut = () => {
		firebase.auth().signOut().then( () => {
			console.log('signed out',this.username,this.instanceId);
			let unsubscribe=this.unsubscriber;
			unsubscribe();
			this.collectionReference.doc( this.username ).update( {
				'InstanceId': firebase.firestore.FieldValue.arrayRemove( this.instanceId ),
				'IsOnline': false
			}).then(()=>{
				this.reset();
				console.log('updated')
			})
		} ).catch( error => console.log( 'error when sign out user: ', error ) )
	}

	resetPassword=()=>{
		if(this.email!==''){
			if(this.validate(this.email)==='Email is Not Correct'){
				this.setPlaceholders('email', 'Please enter a valid email');
			}else{
				firebase.auth().sendPasswordResetEmail(this.email)
					.then(function() {
						// Email sent.
					}).catch(function(error) {
						// An error happened.
					});
			}
		}else{
			this.setPlaceholders('email', 'Please enter an email');
		}
		
	}

	reset = () => {
		console.log('resetting')
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