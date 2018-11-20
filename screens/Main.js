// Main.js
import React from 'react';
import { StyleSheet, Text, View, Button, } from 'react-native';
import firebase from 'react-native-firebase';
import Store from '../mobx/store'

export default class Main extends React.Component {
	state = {
		currentUser: null,
	}

	componentDidMount() {
		firebase.firestore().collection( 'users' ).where("uid","==",firebase.auth().currentUser.uid)
		.get()
		.then( ( querySnapshot )=> {
			this.setState({ currentUser:querySnapshot._docs[0]._data})
		} ).catch( function ( error ) {
			console.log( 'Error getting document: ', error )
		} )
	}
	render() {
		return ( <View style={styles.container}>
			<Text>
				Main
			</Text>
		</View> )
	}
}
const styles = StyleSheet.create( {
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	}
} )
