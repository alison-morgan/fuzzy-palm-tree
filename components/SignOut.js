import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, } from 'react-native';
import {observer,inject} from 'mobx-react';

export default SignOut=inject("stores")(observer( 
class SignOut extends React.Component {
	componentDidMount(){
		console.log('will signout',this.props.stores.userStore)
		this.props.stores.userStore.signOut();
		this.props.navigation.navigate('Loading')
	}

	 render() {
		return (<View style={styles.container}>
			<Text>Logging out ...</Text>
			<ActivityIndicator size="large"/>
		</View>)
	}
}))
const styles = StyleSheet.create( {
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
} )