import React, { Component } from 'react'
import {
 StyleSheet,
 Text,
 View,
 TouchableOpacity,
} from 'react-native'

import {
 GAME_RESULT_NO,
 GAME_RESULT_USER,
 GAME_RESULT_AI,
 GAME_RESULT_TIE,
 GAME_RESULT_USER1,
 GAME_RESULT_USER2
} from '../components/Constants'


export default class PromptArea extends Component {
  generateResultText(result) {
    console.log(result, "result in pormpt")
    switch (result) {
      case GAME_RESULT_USER:
        return 'You won!'
      case GAME_RESULT_AI:
        return 'AI won!'
      case GAME_RESULT_USER1:
        return 'Player 1 won!'
      case GAME_RESULT_USER2:
        return 'Player 2 won!'
      case GAME_RESULT_TIE:
        return 'Tie!'
      default:
        return ''
   }
 }

 render() {
   const { result, onRestart, round } = this.props
   return (
     <View>
       <Text style={styles.text}>{ this.generateResultText(result) }</Text>
       {
         result !== GAME_RESULT_NO && (
           <TouchableOpacity onPress={() => onRestart()}>
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

const styles = StyleSheet.create({
 text: {
   marginTop: 20,
   fontSize: 19,
   fontWeight: 'bold',
   textAlign: 'center'
 },
 instructions: {
   marginTop: 20,
   color: 'grey',
   marginBottom: 5,
   textAlign: 'center'
 },
})