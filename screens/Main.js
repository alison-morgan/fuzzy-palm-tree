// Main.js
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Icon } from 'react-native-elements'
import {observer,inject} from 'mobx-react';

const Main=inject("store")(observer( ({store})=> {
	console.log("hereeeeee",store);
	return ( 
		<View style={styles.container}>
				<Text>
					Main
				</Text>
				{/* <Button title='rowing' 
				onPress={() => this.props.navigation.navigate('TicTac')}/> */}
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