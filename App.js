import React from 'react';
import {StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import {
  createStackNavigator,
  createSwitchNavigator,
  createDrawerNavigator
} from 'react-navigation';
import Login from './screens/Login';
import Main from './screens/Main';
import SignUp from './screens/SignUp';
import Loading from './screens/Loading';
import MessagesList from './screens/MessagesList';
import FriendsList from './screens/FriendsList';
import SignOut from './components/SignOut';
import firebase from 'react-native-firebase';
const user=firebase.auth();

const AppStack = createStackNavigator({
  DrawerStack: {
    screen: createDrawerNavigator({
      Home: {
        screen: Main
      },
      Messages:{
        screen: MessagesList
      },
      Friends:{
        screen: FriendsList
      },
      SignOut: SignOut
    }),
  }
}, {
  headerMode: 'float',
  navigationOptions: ({navigation}) => ({
    headerLeft: (<Icon name='menu' size={45} onPress={() =>{
     if (navigation.state.isDrawerOpen) 
        navigation.closeDrawer()
      else 
        navigation.openDrawer()
      }}/>),
    title:`hello,${user.username}`,
    headerRight:(<Icon name='home' size={45} onPress={()=>{
     navigation.navigate('Home')
    }
    }/>),
    headerStyle: {backgroundColor: 'purple'},
    headerTintColor: 'white',
  })
})
const AuthStack = createSwitchNavigator({
  Login,
  SignUp
}, {
  initialRouteName: 'Login'
});

export default createSwitchNavigator({
  Loading,
  AppStack,
  AuthStack,
}, {
  initialRouteName: 'Loading',
});
const styles = StyleSheet.create({
  icon: {
    padding:'100px'
  }
})