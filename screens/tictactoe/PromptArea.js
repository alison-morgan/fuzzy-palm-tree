import React, { Component } from 'react'
import { observer,inject } from 'mobx-react';
import {StyleSheet,Text,View, TouchableOpacity,} from 'react-native'

//component that returns game outcome
export default PromptArea = inject( "stores" )( observer( 
  class PromptArea extends Component {
    render() {
      const gameStore=this.props.stores.ticTacToe;
      return (
        <View>
          <Text style={styles.text}>{ gameStore.result}</Text>
          {
            gameStore.result===null
            ?(gameStore.opponent==='friend'
              ?<Text style={styles.text}>{gameStore.turn} turn</Text>
              :null)
            :(<TouchableOpacity onPress={() => gameStore.reset()}>
                <Text style={styles.instructions}>
                  Touch here to play again
                </Text>
              </TouchableOpacity>
            )
          }
        </View>
      )
    }
  }
))

const styles = StyleSheet.create({
 text: {
   marginTop: 25,
   fontSize: 30,
   color:'#400000',
   fontWeight: '400',
   textAlign: 'center'
 },
 instructions: {
   marginTop: 20,
   color: '#400000',
   fontWeight: 'bold',
   marginBottom: 5,
   textAlign: 'center'
 },
})