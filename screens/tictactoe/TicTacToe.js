import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Circle from '../../components/tictactoe/Circle';
import Cross from '../../components/tictactoe/Cross';
import Board from './Board';
import { observer,inject } from 'mobx-react';
import PromptArea from './PromptArea';
import LinearGradient from 'react-native-linear-gradient';

//ticTacToe game page
export default TicTacToe= inject( "stores" )( observer( 
    class TicTacToe extends React.Component{

        //board click handler function
        boardClickHandler(e) {
            //check if winning result doesn't exist
            if(this.props.stores.ticTacToe.result===null){
                const gameStore=this.props.stores.ticTacToe;
                //assign clicked coordinates to the variables
                const { locationX, locationY } = e.nativeEvent
                //find clicked coordinates inside board array
                const y=Math.floor(locationY/gameStore.squareSize);
                const x=Math.floor(locationX/gameStore.squareSize)
                //check if clciked square is empty
                if(gameStore.boardState[y][x]===1){
                    //assign element to the clicjed square
                    gameStore.setBoardState(gameStore.turn,y,x);
                    //check for winning combination
                    gameStore.isWinner(y,x);
                    //if there is no finning combinations
                    if(gameStore.result===null){
                        //pass turn to the next player
                        gameStore.setTurn(gameStore.turn==='X'?'O':'X')
                        //if you playing with computer
                        if(gameStore.opponent==='computer'){
                            //call AI to make a move
                            gameStore.AIAction()
                        }
                    }
                }
            }
        }

        render(){
            const gameStore=this.props.stores.ticTacToe
            return(
                <LinearGradient
                        colors={['#075aaa','#efe9e5']}
                        start={{x:0, y:1}} 
                        end={{x:1.5, y:0}}
                        style={styles.container}>
                <TouchableOpacity onPress={(e) => this.boardClickHandler(e)}>
                    <View > 
                        <View style={styles.board} >
                            <Board />
                            {
                                gameStore.boardState.map((subArr,row) =>
                                subArr.map((el,column)=>
                                el==='O'?
                                    <Circle
                                        key={`${row} ${column}`}
                                        xTranslate={gameStore.getCenter(column)}
                                        yTranslate={gameStore.getCenter(row)}
                                        color='black'
                                    />
                                :(el==='X'
                                        ? <Cross
                                            key={`${row} ${column}`}
                                            xTranslate={gameStore.getCenter(column)}
                                            yTranslate={gameStore.getCenter(row)}/>
                                        :null)
                                ))
                            }    
                        </View>
                    <PromptArea/> 
                    </View>
                </TouchableOpacity>
                </LinearGradient>
            )
        }
    }
))

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    board: {
        borderWidth: 3,
        height: 305,
        width: 305
    }
})

