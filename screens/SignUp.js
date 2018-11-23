// SignUp.js
import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import {observer,inject} from 'mobx-react';

const SignUp=inject("store")(observer(
 class SignUp extends React.Component {

	render() {
		const store=this.props.store;
		return (
		  <View style={styles.container}>
			<Text>Sign Up</Text>
			  <Text style={{ color: 'red' }}>
				{store.errorMessage}
			  </Text>
			<TextInput
			  placeholder={store.placeholders.email}
			  autoCapitalize="none"
			  style={styles.textInput}
			  onChangeText={email => store.setEmail(email)}
			  value={store.email}
			/>
			<TextInput
			  placeholder={store.placeholders.username}
			  autoCapitalize="none"
			  style={styles.textInput}
			  onChangeText={username => store.setUsername(username)}
			  value={store.username}
			/>
			<TextInput
			  secureTextEntry
			  placeholder={store.placeholders.password}
			  autoCapitalize="none"
			  style={styles.textInput}
			  onChangeText={password => store.setPassword(password)}
			  value={store.password}
			/>
			  <TextInput
			  secureTextEntry
			  placeholder={store.placeholders.confirmPassword}
			  autoCapitalize="none"
			  style={styles.textInput}
			  onChangeText={confirmPassword => store.setConfirmPassword(confirmPassword)}
			  value={store.confirmPassword}
			/>
			<Button title="Sign Up" onPress={() => {
			  if (store.password === '') {
				store.placeholders('password', 'Please enter password');
			  } else if (store.email === '') {
				store.placeholders('email','Please enter email');
			  } else if (store.username === '') {
				store.placeholders('username', 'Please enter username');
			  }
			  else {
				if (store.password.length < 6) {
				  store.placeholders('password','Password should be at least 6 characters');
				  store.setPassword('');
				} else if (store.email) {
				  if (store.validate(store.email) === 'Email is Not Correct') {
					store.placeholders('email','Please enter a valid email');
					store.setEmail('');
				  } else{
					  if(store.password===store.confirmPassword)
						store.handleSignUp()
					  else{
						store.placeholders('confirmPassword','Passwords do not match');
						store.setConfirmPassword('');
					  }
				  }  
				}
			  }
			}} />
			<Button
			  title='Already have an account? Login'
			  onPress={() => this.props.navigation.navigate('Login')}/>
		  </View>
		)
	  }
	}
	))
	const styles = StyleSheet.create({
	  container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	  },
	  textInput: {
		height: 40,
		width: '90%',
		borderColor: 'gray',
		borderWidth: 1,
		marginTop: 8
	  }
	})
	export default SignUp;