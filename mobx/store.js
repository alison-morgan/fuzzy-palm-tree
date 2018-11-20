import firebase from 'react-native-firebase';
import MobxFirebaseStore from 'mobx-firebase-store';


export default class Store extends MobxFirebaseStore {

    constructor() {
         const store = new MobxFirebaseStore(firebase.firestore().collection('users'))
        super(store.fb)
    }

}


// componentDidMount() {
	// 	firebase.firestore().collection( 'users' ).where("uid","==",firebase.auth().currentUser.uid)
	// 	.get()
	// 	.then( ( querySnapshot )=> {
	// 		this.setState({ currentUser:querySnapshot._docs[0]._data})
	// 	} ).catch( function ( error ) {
	// 		console.log( 'Error getting document: ', error )
	// 	} )
	// }