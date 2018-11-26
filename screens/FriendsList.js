// Main.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {observer,inject} from 'mobx-react';

const FriendsList=inject("stores")(observer( ({stores})=> {
	console.log("hereeeeee",stores);
	return ( <View style={styles.container}>
				<Text>
					Frineds
				</Text>
			</View> 
			)
}
))
const styles = StyleSheet.create( {
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	}
} )
export default FriendsList;