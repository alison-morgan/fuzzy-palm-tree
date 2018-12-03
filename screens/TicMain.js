import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import TicTacFriend from './TTTvsFriend';
import TicTacComp from './TTTvsComp';

export default class TicMain extends Component {
  constructor() {
    super()
    this.state={ playFriend: false, playComputer: false }
  }

  render() {
    const { playFriend, playComputer } = this.state
    return (
      <View style={styles.container}>
        {
          playFriend ? (
            <TicTacFriend />
          ) : 
          playComputer ? (
            <TicTacComp/>
          ) : 
          (
            <View>
              <Text style={styles.welcome}>
                Welcome to the game!
              </Text>
              <TouchableOpacity onPress={() => this.setState({ playComputer:true })}>
                <Text style={styles.instructions}>
                  Touch here to play the computer!
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({ playFriend: true })}>
                <Text style={styles.instructions}>
                  Touch here to play a friend!
                </Text>
              </TouchableOpacity>
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