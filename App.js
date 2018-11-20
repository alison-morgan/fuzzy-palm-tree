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
		console.log(this.store)
		return(
			<Provider>
			<Main store={this.stores}/>
			</Provider>
		)
	}
}
