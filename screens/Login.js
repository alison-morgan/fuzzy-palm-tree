
import React from 'react';
import {
	StyleSheet,
	Text,
	TextInput,
	View
} from 'react-native';
import { Button } from 'react-native-elements';
import { observer,inject } from 'mobx-react';
import LinearGradient from 'react-native-linear-gradient'

const Login=inject('stores')(observer(
	class Login extends React.Component{
		componentDidMount(){
			this.props.stores.userStore.setHasSeenAuthPage(true)
		}
	render(){
	const userStore=this.props.stores.userStore;
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
						if ( userStore.password === null ) {
							userStore.setPlaceholders('password','Please enter password');	
						} else if ( userStore.email === null ) {
							userStore.setPlaceholders('email', 'Please enter email');
						} else {
							if ( userStore.password.length < 6 ) {
								userStore.setPlaceholders('password', 'Password should be at least 6 characters');
								userStore.setPassword(null);
							} else if ( userStore.email ) {
								if ( userStore.validate( userStore.email ) === 'Email is Not Correct' ) {
									userStore.setPlaceholders('email', 'Please enter a valid email');
									userStore.setEmail(null)
								} else {
									userStore.handleLogin();
								}
							}
						}
					}}/>
				<Button buttonStyle={styles.button} title='Forgot Password?'/>
				</View>
				<Button
					buttonStyle={styles.button}
					title='Don`t have an account? Sign Up'
					onPress={() => this.props.navigation.navigate('SignUp')}/>
			</View>
			</LinearGradient> )
			}}
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
		color: "white",
		fontSize: 25,
		fontWeight: '400',
	}
} )
export default Login