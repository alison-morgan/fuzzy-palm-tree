// Main.js
import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import {observer,inject} from 'mobx-react';
import firebase from 'react-native-firebase';

const Main=inject("store")(observer( 
	class Main extends React.Component {

	render(){
		const store=this.props.store;
		 console.log("hereeeeee??????",store);
	return ( <View style={styles.container}>
				<Text>
					 {store.email}
					Hi
				</Text>
				<Button title='click me' onPress={()=>{console.log('clicked');store.setEmail("blablabla")}}/>
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