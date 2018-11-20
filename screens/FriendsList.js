import React from 'react';
import { StyleSheet, Text, View, Button, } from 'react-native';
import firebase from 'react-native-firebase';

const collection = firebase.firestore().collection( 'users' );
export default class FriendsList extends React.Component {
	state = {
		friends: []
	}

	componentDidMount() {
		const { friends } = this.state;
		collection.where("uid","==",firebase.auth().currentUser.uid)
		.get()
		.then( ( querySnapshot )=> {
			console.log("checking")
			querySnapshot.docs.forEach(doc=>{
				doc.data().friends.forEach(friend=>{
					console.log(friend)
				})
			})
			// this.setState({friends: querySnapshot._docs[0]._data.friends},function(){
			// 	console.log(friends)
			// })
		} ).catch( function ( error ) {
			console.log( 'Error getting document: ', error )
		} )
	}
	render() {
		return ( <View style={styles.container}>
			<Text>
				Friends
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
