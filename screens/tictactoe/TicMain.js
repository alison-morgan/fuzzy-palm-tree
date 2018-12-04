import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-elements'
import TicTacToe from './TicTacToe';
import { observer,inject } from 'mobx-react';

export default TicMain=inject( "stores" )( observer(
class TicMain extends Component {
  setGameInfo=(boardSize,squareSize)=>{
    const gameStore=this.props.stores.ticTacToe;
    gameStore.setSize(boardSize);
    gameStore.setSquareSize(squareSize);
    gameStore.setBoardState( [... Array(boardSize)].map(el => Array(boardSize).fill(1)));
  }

  render() {
    const gameStore=this.props.stores.ticTacToe
    return (
      <View style={styles.container}>
        { !gameStore.opponent?
          (
            <View>
              <Text style={styles.welcome}>
                Welcome to the game!
              </Text>
              <TouchableOpacity>
                <Text style={styles.instructions}>
                  Choose a board size to play!
                </Text>
                <Button title='3x3' onPress={() => this.setGameInfo(3,100)}/>
                <Button title='4x4' onPress={() => this.setGameInfo(4,75)}/>
                <Button title='5x5' onPress={() => this.setGameInfo(5,60)}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => gameStore.setOpponent('computer')}>
                <Text style={styles.instructions}>
                  Touch here to play the computer!
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => gameStore.setOpponent('friend')}>
                <Text style={styles.instructions}>
                  Touch here to play a friend!
                </Text>
              </TouchableOpacity>
            </View>
          ):
          (<TicTacToe/>)
        }
      </View>
    )
  }
}))

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