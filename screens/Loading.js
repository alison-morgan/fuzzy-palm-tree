// // Loading.js
import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, } from 'react-native';
import {inject,observer} from 'mobx-react';
import firebase from 'react-native-firebase';

export default Loading=inject('store')(observer(
	class Loading extends React.Component{
		componentDidMount() {
			firebase.auth().onAuthStateChanged( user => {
				console.log('user',user)
				this.props.navigation.navigate(
					// user
					// 	?'AppStack'
						'AuthStack'
				)
			} )
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