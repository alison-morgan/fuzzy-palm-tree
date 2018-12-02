import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import {observer,inject} from 'mobx-react';

const SignUp=inject('stores')(observer(
 class SignUp extends React.Component {

	render() {
		const userStore=this.props.stores.userStore;
		return (
		  <View style={styles.container}>
			<Text>Sign Up</Text>
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
			<Button title='Sign Up' onPress={() => {
			  if (userStore.password === null) {
					userStore.setPlaceholders('password', 'Please enter password');
			  } else if (userStore.email === null) {
					userStore.setPlaceholders('email','Please enter email');
			  } else if (userStore.username === null) {
					userStore.setPlaceholders('username', 'Please enter username');
			  }
			  else {
				if (userStore.password.length < 6) {
				  userStore.setPlaceholders('password','Password should be at least 6 characters');
				  userStore.setPassword(null);
				} else if (userStore.email) {
				  if (userStore.validate(userStore.email) === 'Email is Not Correct') {
					userStore.setPlaceholders('email','Please enter a valid email');
					userStore.setEmail(null);
				  } else{
					  if(userStore.password===userStore.confirmPassword){
							userStore.handleSignUp() 
					  }else{
							userStore.setPlaceholders('confirmPassword','Passwords do not match');
							userStore.setConfirmPassword(null);
					  }
				  }  
				}
			  }
			}} />
			<Button title='forgot password'/>
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