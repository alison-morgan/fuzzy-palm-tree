import React from 'react';
import { Text, ActivityIndicator, StyleSheet, } from 'react-native';
import firebase from 'react-native-firebase';
import {inject,observer} from 'mobx-react';
import LinearGradient from 'react-native-linear-gradient';

//Loading screen component
export default Loading=inject('stores')(observer(
	class Loading extends React.Component{
		componentDidMount() {
			//create variable userStore
			const userStore=this.props.stores.userStore;
			//listen to changes in authorization
			firebase.auth().onAuthStateChanged(user => {
				//if user exists in the system
				if(user){
					//check if user seen Login/SignUp pages
					if(userStore.hasSeenAuthPage){
						//user signing in through Login/SignUp page
						//navigate to AppStack
						 this.props.navigation.navigate( 'AppStack' );
					// user is already signed in and try to reopen our app
					}else{
						//checking if username was saved in AsyncStorage
						if(userStore.username!==''){
							//pull infromation about user from database
							console.log('grabbing info from async storage')
							userStore.getUserInfo();
							//navigate user to the AppStack
							this.props.navigation.navigate( 'AppStack' )
						// no information available
						}else{
							//sign out user
							userStore.signOut();
						}
					}	
				//if user doesn't exist navigate to AuthStack		
				}else{
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