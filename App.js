import React from 'react';
import Store from './mobx/store';
import {Provider} from 'mobx-react';
import AuthStack from './components/Navigation';
import AppStack from './components/Navigation';
import Main from './screens/Main';

export default class App extends React.Component{

	componentWillMount(){
		this.store = new Store();
	}
	render(){
		return(
			<Provider store={this.store} >
				<AuthStack/>
				{/* <AppStack/> */}
			</Provider>
		)
	}
}
