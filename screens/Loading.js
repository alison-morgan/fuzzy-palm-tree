// // Loading.js
import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, } from 'react-native';
import firebase from 'react-native-firebase';
import {inject,observer} from 'mobx-react';

export default Loading=inject('stores')(observer(
	class Loading extends React.Component{
		componentDidMount() {
			console.log('uid',this.props)
			firebase.auth().onAuthStateChanged(user => {
				if(user){
					this.props.navigation.navigate( 'AppStack')
				}else{
					this.props.stores.userStore.reset()
					this.props.navigation.navigate( 'AuthStack')
				}
				
			})
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