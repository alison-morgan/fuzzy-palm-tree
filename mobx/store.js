import firebase from 'react-native-firebase';
import MobxFirebaseStore from 'mobx-firebase-store';


export default class Store extends MobxFirebaseStore {

    constructor() {
         const store = new MobxFirebaseStore(firebase.firestore().collection('users'))
        super(store.fb)
    }

}