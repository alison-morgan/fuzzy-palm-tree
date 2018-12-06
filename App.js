import React from 'react';
import Store from './mobx/UserStore';
import TicTacToe from './mobx/TicTacToeStore';
import {Provider} from 'mobx-react';
import AppNavigator from './Navigation/Navigation';
import NavigationStore from 'react-navigation-mobx-helpers';
import {observer,inject} from 'mobx-react';

export default class Root extends React.Component {
	componentWillMount(){
		this.userStore=new Store();
		this.rootNavigation= new NavigationStore();
		this.ticTacToe=new TicTacToe()
	}
  render() {
		console.disableYellowBox=true;
    return (
			<Provider rootNavigation={this.rootNavigation}  stores={{userStore:this.userStore,ticTacToe:this.ticTacToe}} >
				<App />
		</Provider>
    );
  }
} 

const App=inject("rootNavigation")(observer(
class App extends React.Component{
	render(){
		return <AppNavigator myRef={this.props.rootNavigation.createRef} />;
	}
}))
