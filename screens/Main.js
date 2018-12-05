import React from 'react';
import { StyleSheet, Text,View,TouchableOpacity,Image } from 'react-native';
import {observer,inject} from 'mobx-react';

const Main=inject("stores")(observer( 
	class Main extends React.Component {
	render(){
		const userStore=this.props.stores.userStore;
		console.log(userStore)
		return ( <View style={styles.container}>
					<TouchableOpacity  style={{height:125, width:100}}
						onPress={()=>{this.props.navigation.navigate('TicMain')}}>
						<View style={styles.iconContainer}>
							<Image 
								style={styles.icon}
								source={require('../img/TicTacIcon.png')}/>
							<Text>TicTacToe</Text>
						</View>
					</TouchableOpacity>
				</View> 
				)}
	}
))
const styles = StyleSheet.create( {
	container: {
		flex: 1,
	},
	iconContainer:{
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 10,
		width: 100,
		height: 100
	},
	icon:{
		width: 75,
		height: 75
	}
} )
export default Main;