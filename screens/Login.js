import React from 'react';
import {StyleSheet,Text,TextInput,View} from 'react-native';
import { Button } from 'react-native-elements';
import { observer,inject } from 'mobx-react';
import LinearGradient from 'react-native-linear-gradient';

//Login screen component
const Login=inject('stores')(observer(
	class Login extends React.Component{
		render(){
		const userStore=this.props.stores.userStore;
		//set flag that user seen Login page
		userStore.setHasSeenAuthPage(true)
		return ( 
			<LinearGradient
					colors={['#880D1E', '#311b92']}
					start={{x:0, y:1}} 
					end={{x:1.5, y:0}}
					style={styles.container}>
				<View> 
					<Text style={styles.text}>Login</Text>
						<Text style={{color: 'red'}}>
							{userStore.errorMessage}
						</Text>
					<TextInput
						style={styles.textInput}
						autoCapitalize='none'
						placeholder={userStore.placeholders.email}
						onChangeText={email => userStore.setEmail(email)}
						value={userStore._email}/> 
					<TextInput
						secureTextEntry
						style={styles.textInput}
						autoCapitalize='none'
						placeholder={userStore.placeholders.password}
						onChangeText={password => userStore.setPassword(password)}
						value={userStore.password}/>
						<View style={{flexDirection:'row'}}>
					<Button
						buttonStyle={styles.button}
						title='Login'
						onPress={() => {
							//check if password field empty
							if ( userStore.password === null ) {
								//remind user to enter password
								userStore.setPlaceholders('password','Please enter password');	
							//check if email field empty
							} else if ( userStore.email === null ) {
								//remind user to type in email
								userStore.setPlaceholders('email', 'Please enter email');
							//if both fields and filled out
							} else {
								//check if password less than correct length
								if ( userStore.password.length < 6 ) {
									//let user know that length is incorrect
									userStore.setPlaceholders('password', 'Password should be at least 6 characters');
									userStore.setPassword(null);
								} else if ( userStore.email ) {
									//check if email is incorrect
									if ( userStore.validate( userStore.email ) === 'Email is Not Correct' ) {
										//ask user to tyoe in correct email
										userStore.setPlaceholders('email', 'Please enter a valid email');
										userStore.setEmail(null)
									} else {
										//login user to the system
										userStore.handleLogin();
									}
								}
							}
						}}/>
					<Button buttonStyle={styles.button} title='Forgot Password?' onPress={()=>userStore.resetPassword()}/>
					</View>
					<Button
						buttonStyle={styles.button}
						title='Don`t have an account? Sign Up'
						onPress={() => this.props.navigation.navigate('SignUp')}/>
				</View>
			</LinearGradient> 
			)
		}
	}
));
const styles = StyleSheet.create( {
	container: {
		flex: 1,
		justifyContent: 'center',
		padding: 13,
		alignItems: 'stretch',
	},
	textInput: {
		margin: 17,
		height: 40,
		width: '90%',
		borderColor: 'white',
		borderWidth: 1,
		marginTop: 8,
		backgroundColor: 'white',
		borderRadius: 15,
		justifyContent: 'center',
		alignItems: 'center',
	},
	button: {
		marginTop: 15,
		borderRadius: 20,
		backgroundColor: "rgba(92, 99, 216, 1)",
		elevation: 10,
    	flexDirection:'row',
    	alignItems:'center',
		justifyContent:'center',
		margin: 17
	},
	text: {
		textAlign:'center',
		fontFamily: 'GreatVibes-Regular',
		color: "white",
		fontSize: 40,
	}
} )
export default Login