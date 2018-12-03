import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button
} from 'react-native';
import TicTacFriend from './TTTvsFriend';
import TicTacComp from './TTTvsComp';

export default class TicMain extends Component {
  constructor() {
    super()
    this.state={ playFriend: false, playComputer: false, large: false, med: false, small: false }
  }

  render() {
    const { playFriend, playComputer, small, med, large } = this.state
    return (
      <View style={styles.container}>
        {
          playFriend ? (
            <TicTacFriend board={{large, small, med}}/>
          ) : 
          playComputer ? (
            <TicTacComp board={{large, small, med}}/>
          ) : 
          (
            <View>
              <Text style={styles.welcome}>
                Welcome to the game!
              </Text>
              <TouchableOpacity>
                <Text style={styles.instructions}>
                  Choose a board size to play!
                </Text>
                <Button title='3x3' onPress={() => this.setState({ small:true })}>3x3</Button>
                <Button title='4x4' onPress={() => this.setState({ med:true })}>4x4</Button>
                <Button title='5x5' onPress={() => this.setState({ large:true })}>5x5</Button>
              </TouchableOpacity>
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