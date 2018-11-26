// // Loading.js
import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, } from 'react-native';
import {inject,observer} from 'mobx-react';

export default Loading=inject('stores')(observer(
	class Loading extends React.Component{
		componentDidMount() {
			console.log('uid',this.props)
			this.props.navigation.navigate(
				this.props.stores.userStore.uid
					?'AppStack'
					:'AuthStack'
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