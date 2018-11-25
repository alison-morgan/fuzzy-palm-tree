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

const Login=inject("store")(observer(
	class Login extends React.Component{

		login=async()=>{
			await this.props.store.handleLogin();
			console.log('logiiiin',this.props.store)
			this.props.store.navigation.navigate('AppStack');
		}
		setLogin=(variable)=>{
			console.log(variable)
		}
		render(){
			console.log(this.props.store);
			const store=this.props.store;
		return ( <View style={styles.container}>
		<Text>Login</Text>
			<Text style={{color: 'red'}}>
				{store.errorMessage}
			</Text>
		 <TextInput
			style={styles.textInput}
			autoCapitalize="none"
			placeholder={store.placeholders.email}
			onChangeText={email => store.setEmail(email)}
			value={store.email}/> 
		<TextInput
			secureTextEntry
			style={styles.textInput}
			autoCapitalize="none"
			placeholder={store.placeholders.password}
			onChangeText={password => store.setPassword(password)}
			value={store.password}/>
		<Button
			title="Login"
			onPress={() => {
				if ( store.password === '' ) {
					store.setPlaceholders('password','Please enter password');	
				} else if ( store.email === '' ) {
					store.placeholders('email', 'Please enter email');
				} else {
					if ( store.password.length < 6 ) {
						store.placeholders('password', 'Password should be at least 6 characters');
						store.setPassword('');
					} else if ( store.email ) {
						if ( store.validate( store.email ) === 'Email is Not Correct' ) {
							store.placeholders('email', 'Please enter a valid email');
							store.setEmail('')
						} else {
							store.handleLogin();
							// const sm='Login';
							// this[`set${sm}`]('testing');
						}
					}
				}
			}}/>
		<Button
			title="Don't have an account? Sign Up"
			onPress={() => this.props.navigation.navigate( 'SignUp' )}/>
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