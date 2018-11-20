import React from 'react';
import { StyleSheet, Text, View, Button, } from 'react-native';
import firebase from 'react-native-firebase';

export default class Profile extends React.Component {
	render() {
		return ( <View style={styles.container}>
			<Text>
				Profile
			</Text>
		</View> )
	}
}
const styles = StyleSheet.create( {
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	}
} )
