import React, { Component } from 'react';
import { StyleSheet,Text,View,TouchableOpacity,} from 'react-native';
import {Button} from 'react-native-elements';
import { observer,inject } from 'mobx-react';
import LinearGradient from 'react-native-linear-gradient';

//initial screen for the TicTacToe game
export default TicMain=inject( "stores" )( observer(
  class TicMain extends Component {
    //setting information about the new game
    setGameInfo=(boardSize,squareSize)=>{
      const gameStore=this.props.stores.ticTacToe;
      //setting size for the board
      gameStore.setSize(boardSize);
      //setting square size
      gameStore.setSquareSize(squareSize);
      //navigate user to the next screen
      this.props.navigation.navigate('TTTSelectOpponent')
    }

    render() {
      console.log(this.props)
      return (
        <LinearGradient
            colors={['#075aaa','#efe9e5']}
            start={{x:0, y:1}} 
            end={{x:1.5, y:0}}
            style={styles.container}>
                <Text style={styles.welcome}>
                  Welcome to the game!
                </Text>
                <TouchableOpacity>
                  <View style={styles.buttonContainer}>
                    <Button title='3x3' buttonStyle={styles.buttonStyle} onPress={() => this.setGameInfo(3,100)}/>
                    <Button title='4x4' buttonStyle={styles.buttonStyle} onPress={() => this.setGameInfo(4,75)}/>
                    <Button title='5x5' buttonStyle={styles.buttonStyle} onPress={() => this.setGameInfo(5,60)}/>
                  </View>
                </TouchableOpacity>
                <Text style={styles.instructions}>
                    Choose a board size to play!
                  </Text>
        </LinearGradient>
      )
    }
  }
))

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'space-evenly',
  },
  welcome: {
    fontSize: 30,
    fontFamily:'GreatVibes-Regular',
    // marginTop:40,
    color:'#400000',
    fontWeight: 'bold',
    fontStyle:'italic'
  },
  instructions: {
    textAlign: 'center',
    fontSize:23,
    // marginTop:40,
    color:'#400000',
    fontWeight: 'bold',
    fontStyle:'italic'
  },
  buttonContainer:{
    flexDirection:'row',
    // margin:60
  },
  buttonStyle:{
    width:100,
    height:100,
    backgroundColor:'#01295c',
    borderRadius:50,
  }
})