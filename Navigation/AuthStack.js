import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';

//switch navigator component for the entire app
export default AuthStack = createSwitchNavigator( {
	Login:{
		screen:Login
	},
	SignUp:{
		screen:SignUp
	},
}, { initialRouteName: 'Login' } );