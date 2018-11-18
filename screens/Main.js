// Main.js
import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import firebase from 'react-native-firebase';


export default class Main extends React.Component {
  state = { currentUser: null, username:'' }
  componentDidMount() {

    const { currentUser}  = firebase.auth();  
    this.setState({ currentUser: currentUser, username: currentUser.uid },() => {
      console.log(this.state.currentUser.uid, ' this is your users uid')
    })
  }
  render() {
    const { currentUser } = this.state;
    return (
      <View style={styles.container}>
        <Text>
          Main Page
        </Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})