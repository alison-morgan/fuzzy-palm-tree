import firebase from 'firebase';
import mobxFirebaseStore from 'mobx-firebase-store';

export default class Store extends mobxFirebaseStore {

    constructor() {
        const store = new mobxFirebaseStore(firebase.firestore().collection('users'))
        super(store.fb)
    }

    createUser(user) {
        console.log(this.fb)
    }
}