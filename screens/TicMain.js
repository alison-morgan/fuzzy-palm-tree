import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button
} from 'react-native';


import TicTac from './TicTac'

export default class App extends Component {
  constructor() {
    super()
    this.state={ gameStarted: false }
  }

  startGame() {
    this.setState({ gameStarted: true })
  }

//   getInstanceId(){
//     const messaging = firebase.messaging();
//     messaging.requestPermission()
//     .then(function() {
//         console.log('Notification permission granted.')
//         messaging.getToken()
//         .then(function(currentToken) {
//             console.log(currentToken, "in current token")
//         })
//     })
//     .catch(function(err) {
//         console.log('Unable to get permission to notify', err);
//     })
// }

  render() {
    const { gameStarted } = this.state
    return (
      <View style={styles.container}>
        {
          gameStarted ? (
            <TicTac />
          ) : (
            <View>
              <Text style={styles.welcome}>
                Welcome to the game!
              </Text>
              <TouchableOpacity onPress={() => this.startGame()}>
                <Text style={styles.instructions}>
                  Touch here to start
                </Text>
              </TouchableOpacity>
              {/* <Button title='instanceId' 
				onPress={() => this.getInstanceId()}/> */}
            </View>
          )
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    marginTop: 50,
  },
  instructions: {
    textAlign: 'center',
    marginTop: 20,
    color: 'grey',
    marginBottom: 5,
  },
})