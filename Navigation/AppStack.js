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
			title: `Hello, `,
			headerLeft: DrawerButton( navigation ),
			headerRight: ( 
				<Icon 
					name = 'home' 
					size = {45}
					color = '#880D1E'
					onPress = { () => navigation.navigate( 'Home' )}/> 
				),
			headerStyle: {
				backgroundColor: '#091540'
			},
			headerTintColor: 'white',
		} )
} )
const DrawerButton = ( navigation ) => {
	return navigation.toggleDrawer
		? <Icon
			name = 'menu'
			size = {45}
			color = '#880D1E'
			onPress = {() => navigation.toggleDrawer() }/>
		: <Icon
			name = 'arrow-back'
			size = {45}
			color = '#880D1E'
			onPress = { () => navigation.goBack() }/>
}
