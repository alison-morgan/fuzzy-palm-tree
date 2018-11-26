import React from 'react';
import Store from './mobx/store';
import {Provider} from 'mobx-react';
import AppNavigator from './Navigation/Navigation';
import NavigationStore from 'react-navigation-mobx-helpers';
import {observer,inject} from 'mobx-react';

export default class Root extends React.Component {
	componentWillMount(){
		this.userStore=new Store();
		this.rootNavigation= new NavigationStore();
		console.log('navigation',this.rootNavigation)
	}
  render() {
    return (
			<Provider rootNavigation={this.rootNavigation}  stores={{userStore:this.userStore}} >
				<App />
		</Provider>
    );
  }
} 

const App=inject("rootNavigation")(observer(
class App extends React.Component{
	render(){
		console.log('inside App,checking root navigation',this.props.rootNavigation)
		return <AppNavigator myRef={this.props.rootNavigation.createRef} />;
	}
}))
