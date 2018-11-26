// Main.js
import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import {observer,inject} from 'mobx-react';
const Main=inject("stores")(observer( 

	class Main extends React.Component {

	render(){
		const userStore=this.props.stores.userStore;
		 console.log("hereeeeee??????",userStore);
	return ( <View style={styles.container}>
				<Text>
					 {userStore.email}
					Hi
				</Text>
				<Button title='click me' onPress={()=>{console.log('clicked');userStore.setEmail("blablabla")}}/>
			</View> 
			)}
}
))
const styles = StyleSheet.create( {
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	}
} )
export default Main;