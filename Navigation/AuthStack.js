import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';

export default AuthStack = createSwitchNavigator( {
	Login:{screen:Login},
	SignUp:{screen:SignUp},
}, { initialRouteName: 'Login' } );