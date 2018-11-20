import React from 'react';
import Store from './mobx/store';
import {Provider} from 'mobx-react';
import Main from './screens/Main'
import AppNavigator from './components/Navigation';
 
export default class App extends React.Component{
	componentWillMount(){
		 this.store = new Store();
	}	
	render(){
		return(
			<Provider store={this.store}>
			<AppNavigator />
			</Provider>
		)
	}
}
