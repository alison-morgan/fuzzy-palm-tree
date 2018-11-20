import React from 'react';
import {View} from 'react-native';
import {Provider} from 'mobx-react';
import Store from './mobx/store';
import Test from './screens/Test';
import AppNavigator from './components/Navigation';


// dont know if you need this ->
// const fbApp = firebase.initializeApp({
//   apiKey: 'yourApiKey',
//   authDomain: "localhost",
//   databaseURL: 'https://docs-examples.firebaseio.com',
//   storageBucket: 'docs-examples.firebaseio.com'
// }, "chatApp");
 
// const store = new MobxFirebaseStore(firebase.firestore().collection('users'));



export default class App extends React.Component{
	componentWillMount(){
		 this.store = new Store();
	}	
	render(){
		console.log(this.store)		
		return(
			//  <AppNavigator />

				<Test store={this.store}/>
			
		)
	}
}
