import React from 'react'
import { SwitchNavigator } from 'react-navigation'
// import the different screens
import Loading from './components/Loading';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Main from './components/Main';
// create our app's navigation stack
const App = SwitchNavigator(
 {
   Loading,
   SignUp,
   Login,
   Main
 },
 {
   initialRouteName: 'Loading'
 }
)
export default App