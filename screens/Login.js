// Login.js
import React from 'react'
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	Button,
} from 'react-native'
import firebase from 'react-native-firebase'

export default class Login extends React.Component {
	state = {
		email: '',
		password: '',
		errorMessage: null,
		passwordPlaceholder: 'Password',
		emailPlaceholder: 'Email',
	}
	handleLogin = () => {
		const { email, password, } = this.state;
		this.props.navigation.navigate('AppStack')
		 firebase.auth().signInWithEmailAndPassword( email, password ).catch( error => this.setState( { errorMessage: error.message } ) )
	}
	validate = ( text ) => {
		let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if ( reg.test( text ) === false ) 
			return "Email is Not Correct";
		else 
			return text;
		}
	render() {
		let { email, password, passwordPlaceholder, emailPlaceholder, } = this.state
		return ( <View style={styles.container}>
			<Text>Login</Text>
			{
				this.state.errorMessage && <Text style={{
							color: 'red'
						}}>
						{this.state.errorMessage}
					</Text>
			}
			<TextInput
				style={styles.textInput}
				autoCapitalize="none"
				placeholder={this.state.emailPlaceholder}
				onChangeText={email => this.setState( { email } )}
				value={this.state.email}/>
			<TextInput
				secureTextEntry
				style={styles.textInput}
				autoCapitalize="none"
				placeholder={this.state.passwordPlaceholder}
				onChangeText={password => this.setState( { password } )}
				value={this.state.password}/>
			<Button
				title="Login"
				onPress={() => {
					if ( this.state.password === '' ) {
						passwordPlaceholder = 'Please enter password'
						this.setState( { passwordPlaceholder } )
					} else if ( this.state.email === '' ) {
						emailPlaceholder = 'Please enter email'
						this.setState( { emailPlaceholder } )
					} else {
						if ( this.state.password.length < 6 ) {
							passwordPlaceholder = 'Password should be at least 6 characters'
							password = ''
							this.setState( { passwordPlaceholder, password, } )
						} else if ( this.state.email ) {
							if ( this.validate( email ) === 'Email is Not Correct' ) {
								emailPlaceholder = 'Please enter a valid email'
								email = ''
								this.setState( { emailPlaceholder, email, } )
							} else {
								this.handleLogin();
							}
						}
					}
				}}/>
			<Button
				title="Don't have an account? Sign Up"
				onPress={() => this.props.navigation.navigate( 'SignUp' )}/>
		</View> )
	}
}
const styles = StyleSheet.create( {
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	textInput: {
		height: 40,
		width: '90%',
		borderColor: 'gray',
		borderWidth: 1,
		marginTop: 8,
	},
} )
