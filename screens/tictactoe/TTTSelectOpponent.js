import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'react-native-elements';
import { observer,inject } from 'mobx-react';

export default TTTSelectOpponent=inject( "stores" )( observer(
class TTTSelectOpponent extends Component {
  render() {
    const gameStore=this.props.stores.ticTacToe
    console.log(this.props)
    return (
      <View style={styles.container}>
        <View>
            <Text style={styles.text}>
                Pick your opponent
            </Text>
            <View style={{flexDirection:'row'}}>
                <View>
                    <Icon 
                        name='android' 
                        size={100}
                        color='green'
                        onPress={() => { 
                            gameStore.setOpponent('computer');
                            this.props.navigation.navigate('TicTacToe')}}/>
                    <Text>AI</Text>
                </View>
                <View>
                    <Icon 
                        name='people'
                        color='red' 
                        size={100}
                        onPress={() => { 
                            gameStore.setOpponent('friend');
                            this.props.navigation.navigate('TicTacToe')}}/>
                    <Text>Friend</Text>
                </View>
            </View>
        </View>
      </View>
    )
  }
}))

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'purple',
    justifyContent:'space-evenly'
  },
  text: {
    fontSize: 20,
    marginTop: 50,
    color: 'white',
  }
})