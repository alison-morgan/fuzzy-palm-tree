// Main.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {observer,inject} from 'mobx-react';
const Main=inject("store")(observer( ({store})=> {
	console.log("hereeeeee",store);
	return ( <View style={styles.container}>
				<Text>
					Main
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
export default Main;