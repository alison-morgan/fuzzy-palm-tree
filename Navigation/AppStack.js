import React from 'react';
import { createStackNavigator,  createDrawerNavigator,createTabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Main from '../screens/Main';
import TicMain from '../screens/TicMain'
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
			SignOut:{screen:SignOut},
		} )
	},
	TicTacToe:{
		screen: TicMain
	}
}, {
	headerMode: 'float',
	navigationOptions: ( { navigation } ) => ( {
		headerLeft: ( <Icon
			name='menu'
			size={45}
			onPress={() => {
				if ( navigation.state.isDrawerOpen ) 
					navigation.closeDrawer()
				else 
					navigation.openDrawer()
			}}/> ),
		headerRight: ( <Icon
			name='home'
			size={45}
			onPress={() => {
				navigation.navigate( 'Home' )
			}}/> ),
		headerStyle: {
			backgroundColor: 'purple'
		},
		headerTintColor: 'white'
	} ),
} )