// Main.js
import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import {observer,inject} from 'mobx-react';
const Main=inject("stores")(observer( 
	class Main extends React.Component {
	render(){
		const userStore=this.props.stores.userStore;
	return ( <View style={styles.container}>
				<Text>
					 {userStore.username}
					Hi
				</Text>
				<Button title='TicTacToe' onPress={()=>{this.props.navigation.navigate('TicTacToe')}}/>
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