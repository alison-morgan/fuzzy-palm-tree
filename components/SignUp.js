// SignUp.js
import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import firebase from 'react-native-firebase'

export default class SignUp extends React.Component {
  state = { email: '', password: '', errorMessage: null, username: '', passwordPlaceholder: 'Password', emailPlaceholder: 'Email', usernamePlaceholder: 'Username', confirmPlaceholder: 'Confirm Password' }

  validate = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false)
      return "Email is Not Correct";
    else
      return text;
  }

  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate('Main'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  render() {
    let { email, passwordPlaceholder, emailPlaceholder, confirmPlaceholder,password,confirmPassword } = this.state
    return (
      <View style={styles.container}>
        <Text>Sign Up</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          placeholder={this.state.emailPlaceholder}
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          placeholder={this.state.usernamePlaceholder}
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={username => this.setState({ username })}
          value={this.state.username}
        />

        <TextInput
          secureTextEntry
          placeholder={this.state.passwordPlaceholder}
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
          <TextInput
          secureTextEntry
          placeholder={this.state.confirmPlaceholder}
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={confirmPassword => this.setState({ confirmPassword })}
          value={this.state.confirmPassword}
        />
        <Button title="Sign Up" onPress={() => {
          if (this.state.password === '') {
            passwordPlaceholder = 'Please enter password'
            this.setState({passwordPlaceholder})
          } else if (this.state.email === '') {
            emailPlaceholder = 'Please enter email'
            this.setState({emailPlaceholder})
          } else if (this.state.username === '') {
            usernamePlaceholder = 'Please enter username'
            this.setState({usernamePlaceholder})
          }
          else {
            if (this.state.password.length < 6) {
              passwordPlaceholder = 'Password should be at least 6 characters';
              password = '';
              this.setState({ passwordPlaceholder, password })
            } else if (this.state.email) {
              if (this.validate(email) === 'Email is Not Correct') {
                emailPlaceholder = 'Please enter a valid email';
                email='';
                this.setState({ emailPlaceholder,email })
              } else{
                  console.log("your right before handle signup")
                  if(password===confirmPassword)
                    this.handleSignUp()
                  else{
                    confirmPlaceholder='Passwords do not match';
                    confirmPassword='';
                    this.setState({confirmPlaceholder,confirmPassword});
                  }
              }  
            }
          }
        }} />
        <Button
          title='Already have an account? Login'
          onPress={() => this.props.navigation.navigate('Login')}
        />
      </View>
    )
  }
}
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
