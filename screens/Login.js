// Login.js
import React from 'react'
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	Button,
} from 'react-native';
import {observer,inject} from 'mobx-react';

const Login=inject("stores")(observer(
	class Login extends React.Component{
	render(){
	console.log(this.props);
	const userStore=this.props.stores.userStore;
	return ( <View style={styles.container}>

		<Text>Login</Text>
			<Text style={{color: 'red'}}>
				{userStore.errorMessage}
			</Text>
		 <TextInput
			style={styles.textInput}
			autoCapitalize="none"
			placeholder={userStore.placeholders.email}
			onChangeText={email => userStore.setEmail(email)}
			value={userStore._email}/> 
		<TextInput
			secureTextEntry
			style={styles.textInput}
			autoCapitalize="none"
			placeholder={userStore.placeholders.password}
			onChangeText={password => userStore.setPassword(password)}
			value={userStore.password}/>
		<Button
			title="Login"
			onPress={() => {
				if ( userStore.password === '' ) {
					userStore.setPlaceholders('password','Please enter password');	
				} else if ( userStore.email === '' ) {
					userStore.setPlaceholders('email', 'Please enter email');
				} else {
					if ( userStore.password.length < 6 ) {
						userStore.setPlaceholders('password', 'Password should be at least 6 characters');
						userStore.setPassword('');
					} else if ( userStore.email ) {
						if ( userStore.validate( userStore.email ) === 'Email is Not Correct' ) {
							userStore.setPlaceholders('email', 'Please enter a valid email');
							userStore.setEmail('')
						} else {
							console.log(this.props)
							
							userStore.handleLogin(this.props.navigation.navigate.bind(this,'AppStack'));
						}
					}
				}
			}}/>
		<Button
			title="Don't have an account? Sign Up"
			onPress={() => this.props.navigation.navigate('SignUp')}/>
	</View> )
	}}
));
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
export default Login