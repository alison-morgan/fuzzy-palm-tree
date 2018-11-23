import React from 'react';
import Store from './mobx/store';
import {Provider} from 'mobx-react';
import AppNavigator from './components/Navigation';
import Login from './screens/Login'
import SignUp from './screens/SignUp';
export default class App extends React.Component{
	componentWillMount(){
		this.store = new Store();
	}
	render(){
		return(
			<Provider store={this.store} >
				<SignUp />
			</Provider>
		)
	}
}
