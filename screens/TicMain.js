import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button
} from 'react-native';


import TicTacToe from './TicTacToe'

export default class TicMain extends Component {
  constructor() {
    super()
    this.state={ gameStarted: false }
  }

  startGame() {
    this.setState({ gameStarted: true })
  }
  render() {
    const { gameStarted } = this.state
    return (
      <View style={styles.container}>
        {
          gameStarted ? (
            <TicTacToe />
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