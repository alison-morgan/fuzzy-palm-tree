import React from 'react';
import { Text, ActivityIndicator, StyleSheet, } from 'react-native';
import {observer,inject} from 'mobx-react';
import LinearGradient from 'react-native-linear-gradient';

//sign out component 
export default SignOut=inject("stores")(observer( 
	class SignOut extends React.Component {

		componentDidMount(){
			//reset email and password before signing out user
			this.props.stores.userStore.setEmail('');
			this.props.stores.userStore.setPassword('');
			//sign out user from the firebase auth,update online status and delete information from the store	
			this.props.stores.userStore.signOut();
			//navigate user to the loading page
			this.props.navigation.navigate('Loading');
		}

		render() {
			return (
				<LinearGradient
				colors={['#880D1E', '#311b92']}
				start={{x:0, y:1}} 
				end={{x:1.5, y:0}}
				style={styles.container}>
					<Text style={styles.text}>Logging out...</Text>
					<ActivityIndicator size='large' color = 'white'/>
				</LinearGradient>
			)
		}
	}
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