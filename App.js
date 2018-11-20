import React from 'react';
import {View,StyleSheet} from 'react-native';
// import Store from './mobx/store';
import AppNavigator from './components/Navigation';
import firebase from 'react-native-firebase';
// import mobxFirebaseStore from 'mobx-firebase-store';

// dont know if you need this ->
// const fbApp = firebase.initializeApp({
//   apiKey: 'yourApiKey',
//   authDomain: "localhost",
//   databaseURL: 'https://docs-examples.firebaseio.com',
//   storageBucket: 'docs-examples.firebaseio.com'
// }, "chatApp");
 
// const store = new MobxFirebaseStore(firebase.firestore().collection('users'));

// // const Main = observer(({timerStore}) => { <- like that
// // more like that really ->
// const Test = observer(({store}) => {
//   return (
//     <View>
//       <Text>hi</Text>
//     </View>
//   );
// });

export default class App extends React.Component{
	// componentWillMount(){
	// 	 this.store = new Store();
	// }	
	render(){
		// console.log(this.store)		
		return(
			 <AppNavigator />
		)
	}
}
