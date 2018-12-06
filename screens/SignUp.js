import React from 'react';
import { StyleSheet, Text, TextInput, View} from 'react-native';
import { Button } from 'react-native-elements'
import {observer,inject} from 'mobx-react';
import LinearGradient from 'react-native-linear-gradient'

//signUp screen component
const SignUp=inject('stores')(observer(
	class SignUp extends React.Component {
		render() {
			const userStore=this.props.stores.userStore;
			//set flag that user seen signUp page
			userStore.setHasSeenAuthPage(true)
			return (
				<LinearGradient
					colors={['#880D1E', '#311b92']}
					start={{x:0, y:1}} 
					end={{x:1.5, y:0}}
					style={styles.container}>
					<View>
						<Text style={styles.text}>Sign Up</Text>
						<Text style={{ color: 'red' }}>
							{userStore.errorMessage}
						</Text>
						<TextInput
							placeholder={userStore.placeholders.email}
							autoCapitalize='none'
							style={styles.textInput}
							onChangeText={email => userStore.setEmail(email)}
							value={userStore.email}
						/>
						<TextInput
							placeholder={userStore.placeholders.username}
							autoCapitalize='none'
							style={styles.textInput}
							onChangeText={username => userStore.setUsername(username)}
							value={userStore.username}
						/>
						<TextInput
							secureTextEntry
							placeholder={userStore.placeholders.password}
							autoCapitalize='none'
							style={styles.textInput}
							onChangeText={password => userStore.setPassword(password)}
							value={userStore.password}
						/>
						<TextInput
							secureTextEntry
							placeholder={userStore.placeholders.confirmPassword}
							autoCapitalize='none'
							style={styles.textInput}
							onChangeText={confirmPassword => userStore.setConfirmPassword(confirmPassword)}
							value={userStore.confirmPassword}
						/>
						<Button buttonStyle={styles.button} title='Sign Up' onPress={() => {
							//check if password field empty
							if (userStore.password === null) {
								//remind user to type in password
								userStore.setPlaceholders('password', 'Please enter password');
							//check if email field empty
							} else if (userStore.email === null) {
								//remind user to type in email
								userStore.setPlaceholders('email','Please enter email');
							//check if username field empty
							} else if (userStore.username === null) {
								//remind user to type in username
								userStore.setPlaceholders('username', 'Please enter username');
							//if all fields filled out
							}else {
								//check length of the password
								if (userStore.password.length < 6) {
									//empty out password field
									userStore.setPlaceholders('password','Password should be at least 6 characters');
									userStore.setPassword(null);
								//if(user typed in email)
								} else if (userStore.email) {
									//check if email valid or not
									if (userStore.validate(userStore.email) === 'Email is Not Correct') {
										//empty out email field
										userStore.setPlaceholders('email','Please enter a valid email');
										userStore.setEmail(null);
									//if email valid
									} else{
										//check if password field and confirmPassword field matches
										if(userStore.password===userStore.confirmPassword){
											//sign up user
											userStore.handleSignUp() 
										//if two passwords do not match
										}else{
											//empty out confirmPassword field
											userStore.setPlaceholders('confirmPassword','Passwords do not match');
											userStore.setConfirmPassword(null);
										}
									}  
								}
							}
						}} />
						<Button
							buttonStyle={styles.button}
							title='Already have an account? Login'
							onPress={() => this.props.navigation.navigate('Login')}/>
					</View>
				</LinearGradient>
			)
			}
		}
))
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
			marginTop: 1,
			borderRadius: 20,
			backgroundColor: "rgba(92, 99, 216, 1)",
			elevation: 10,
			flexDirection:'row',
			alignItems:'center',
			justifyContent:'center',
			margin: 15,
		},
		text: {
			textAlign:'center',
			fontFamily: 'GreatVibes-Regular',
			color: "white",
			fontSize: 40,
		}
	} )
	export default SignUp;