import firebase from 'react-native-firebase';
import MobxFirebaseStore from 'mobx-firebase-store';


export default class Store extends mobxFirebaseStore {

    constructor() {
        // const store = new mobxFirebaseStore(firebase.firestore().collection('users'))
        super(store.fb)
    }

}