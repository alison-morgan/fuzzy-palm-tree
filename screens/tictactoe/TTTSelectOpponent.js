import React, { Component } from 'react';
import {StyleSheet,Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import { observer,inject } from 'mobx-react';
import LinearGradient from 'react-native-linear-gradient';

//component that prompts user to select opponent
export default TTTSelectOpponent=inject( "stores" )( observer(
    class TTTSelectOpponent extends Component {
        //function to start the game
        start=(opponent)=>{
            //set opponent value in the game store
            this.props.stores.ticTacToe.setOpponent(opponent);
             //setting game outcome to null
            gameStore.setResult(null);
            //creating new board array to keep of the game
            gameStore.setBoardState( [... Array(boardSize)].map(el => Array(boardSize).fill(1)));
            //navigate user to the game
            this.props.navigation.navigate('TicTacToe')
        }

        render() {
            return (
                <LinearGradient
					colors={['#075aaa','#efe9e5']}
					start={{x:0, y:1}} 
					end={{x:1.5, y:0}}
					style={styles.container}>
                        <Text style={styles.text}>
                            Pick your opponent
                        </Text>
                        <View style={styles.buttonContainer}>
                            <View style={styles.iconContainer}>
                                <Icon 
                                    name='android' 
                                    size={100}
                                    color='#64DD17'
                                    onPress={() => this.start('computer')}/>
                                <Text style={styles.label}>AI</Text>
                            </View>
                            <View style={styles.iconContainer}>
                                <Icon 
                                    name='people'
                                    color='#01295c' 
                                    size={100}
                                    onPress={() => this.start('friend')}/>
                                <Text style={styles.label}>Friend</Text>
                            </View>
                        </View>
                </LinearGradient>
            )
        }
    }
))

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginTop:70,
    marginBottom:100,
    color: '#400000',
  },
  label:{
    fontSize: 20,
    color: '#400000',
  },
  buttonContainer:{
    flexDirection:'row'
  },
  iconContainer:{
    flex:1,
    alignItems: 'center',
    padding: 15,
    borderWidth: 4,
    margin: 20,
    borderColor:'#091540'
  }
})