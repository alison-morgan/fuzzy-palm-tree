import React, { Component } from 'react'
import { observer,inject } from 'mobx-react';
import {
 StyleSheet,
 Text,
 View,
 TouchableOpacity,
} from 'react-native'

export default PromptArea = inject( "stores" )( observer( 
class PromptArea extends Component {

 render() {
   const gameStore=this.props.stores.ticTacToe;
   console.log(gameStore)
   return (
     <View>
       <Text style={styles.text}>{ gameStore.result }</Text>
       {
         gameStore.result !== null && (
           <TouchableOpacity onPress={() => {console.log('restart');gameStore.reset()}}>
             <Text style={styles.instructions}>
               Touch here to play again
             </Text>
           </TouchableOpacity>
         )
       }
     </View>
   )
 }
}))

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