import React from 'react';
import { StyleSheet, Text,View,TouchableOpacity,Image } from 'react-native';
import {observer,inject} from 'mobx-react';
import LinearGradient from 'react-native-linear-gradient'

const Main=inject("stores")(observer( 
	class Main extends React.Component {
	render(){
		const userStore=this.props.stores.userStore;
		console.log(userStore)
		return (
			<LinearGradient
				colors={['#091540', '#880D1E']}
				start={{x:0, y:1}} 
				end={{x:1.5, y:0}}
				style={styles.container}>
					<View > 
					<TouchableOpacity 
						style={{height:125, width:100}} 
						onPress={()=>{this.props.navigation.navigate('TicMain')}}>
						<View style={styles.iconContainer}>
							<Image 
								style={styles.icon}
								source={require('../img/TicTacIcon.png')}/>
							<Text style={styles.gameText}>TicTacToe</Text>
						</View>
					</TouchableOpacity>
				</View>
			</LinearGradient>
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
		height: 100,
	},
	icon:{
		width: 75,
		height: 75,
		borderWidth: 4,
		borderRadius: 40,
		borderColor: '#880D1E'
	},
	gameText:{
		color:'white', 
		fontSize:16, 
		textAlign:'center', 
		fontWeight:'bold', 
		textShadowColor:'#311b92', 
		textShadowRadius: 2, 
		textShadowOffset: {width: -2, height: 2}
	}
} )
export default Main;