import React from 'react';
import { Text, ActivityIndicator, StyleSheet, } from 'react-native';
import firebase from 'react-native-firebase';
import {inject,observer} from 'mobx-react';
import LinearGradient from 'react-native-linear-gradient';

export default Loading=inject('stores')(observer(
	class Loading extends React.Component{
		componentDidMount() {
			const userStore=this.props.stores.userStore;
			console.log(userStore.hasSeenAuthPage,userStore)
			firebase.auth().onAuthStateChanged(user => {
				console.log('inside auth change',user )
				if(user){
					if(userStore.hasSeenAuthPage){
						console.log('signed in through auth pages')
						 this.props.navigation.navigate( 'AppStack' );
					}else{
						if(userStore.username!==''){
							console.log('grabbing info from async storage')
							userStore.getUserInfo();
							this.props.navigation.navigate( 'AppStack' )
						}else{
							userStore.signOut();
						}
					}			
				}else{
					console.log('no user will reset')
					this.props.navigation.navigate( 'AuthStack' );
				}
				
			})
		  }
		render() {
			return ( 
			<LinearGradient
				colors={['#880D1E', '#311b92']}
				start={{x:0, y:1}} 
				end={{x:1.5, y:0}}
				style={styles.container}>
					<Text style={styles.text}>Loading...</Text>
					<ActivityIndicator size='large' color = 'white'/>
				</LinearGradient> )
		}	}
))
const styles = StyleSheet.create( {
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	text:{
		color:'white',
		fontSize: 15,
		fontWeight: '400',
	}

} )