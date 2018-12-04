import React from 'react';
import { createStackNavigator, createDrawerNavigator, } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Main from '../screens/Main';
import TicMain from '../screens/tictactoe/TicMain';
import TicTacToe from '../screens/tictactoe/TicTacToe';
import MessagesList from '../screens/MessagesList';
import FriendsList from '../screens/FriendsList';
import SignOut from '../components/SignOut';
export default AppStack = createStackNavigator( {
	DrawerStack: {
		screen: createDrawerNavigator( {
			Home: {
				screen: Main
			},
			Messages: {
				screen: MessagesList
			},
			Friends: {
				screen: FriendsList
			},
			SignOut: {
				screen: SignOut
			}
		} )
	},
	TicMain: {
		screen: TicMain
	},
	TicTacToe:{
		screen: TicTacToe
	}
}, {
	headerMode: 'float',
	navigationOptions: ( { navigation } ) => ( {
		headerLeft: DrawerButton( navigation ),
		headerRight: ( 
			<Icon 
				name = 'home' 
				size = {45}
				onPress = { () => navigation.navigate( 'Home' ) }/> 
			),
		headerStyle: {
			backgroundColor: 'purple'
		},
		headerTintColor: 'white',
	} )
} )
const DrawerButton = ( navigation ) => {
	return navigation.toggleDrawer
		? <Icon
			name = 'menu'
			size = {45}
			onPress = {() => navigation.toggleDrawer() }/>
		: <Icon
			name = 'arrow-back'
			size = {45}
			onPress = { () => navigation.goBack() }/>
}
