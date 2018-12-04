import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, } from 'react-native';
import firebase from 'react-native-firebase';
import {inject,observer} from 'mobx-react';
import { AsyncStorage } from 'react-native'
import { asyncStorageKeys } from '../mobx/AsyncStorage'

export default Loading=inject('stores')(observer(
	class Loading extends React.Component{
		componentDidMount() {
			const userStore=this.props.stores.userStore;
			console.log(userStore.username)
			// firebase.auth().onAuthStateChanged(user => {
			// 	if(user){
			// 		console.log(user)
			// 		if(userStore.username==='' && this.props.stores.userStore.email!==''){
			// 			console.log('user exist in the store')
			// 			userStore.signOut();
			// 		}else if(userStore.username!=='' && userStore.email===''){
			// 			console.log('getting info',this.props.stores.userStore.username)
			// 			console.log('navigating')
			// 			userStore.getUserInfo();
			// 			this.props.navigation.navigate( 'AppStack' );
			// 		}else{
			// 			this.props.navigation.navigate( 'AppStack' );
			// 		}
				
			// 	}else{
			// 		userStore.reset();
			// 		this.props.navigation.navigate( 'AuthStack' );
			// 	}
				
			// })
		  }
		render() {
			return ( <View style={styles.container}>
				<Text>Loading</Text>
				<ActivityIndicator size="large"/>
			</View> )
		}	}
))
const styles = StyleSheet.create( {
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
} )