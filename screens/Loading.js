// // Loading.js
import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, } from 'react-native';
import {inject,observer} from 'mobx-react';

export default Loading=inject('store')(observer(
	class Loading extends React.Component{
		componentDidMount() {
			const store=this.props.store;
			store.setNavigation(this.props.navigation);
			console.log('uid',store.uid)
			store.navigation.navigate(
				// store.uid
					// 'AppStack'
					'AuthStack'
			)
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