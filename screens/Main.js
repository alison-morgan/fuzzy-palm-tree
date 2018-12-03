// Main.js
import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native';
import {observer,inject} from 'mobx-react';
const Main=inject("stores")(observer( 
	class Main extends React.Component {
	render(){
		const userStore=this.props.stores.userStore;
		console.log(userStore)
	return ( <View style={styles.container}>
				<Text>
					 {userStore.username}
					Hi
				</Text>
				<TouchableOpacity  onPress={()=>{this.props.navigation.push('TicTacToe')}}><Image
          source={require('../img/TicTacIcon.png')}
        /></TouchableOpacity>
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