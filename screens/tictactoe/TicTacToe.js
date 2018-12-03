import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Circle from '../../components/tictactoe/Circle';
import Cross from '../../components/tictactoe/Cross';
import Board from './Board';
import { observer,inject } from 'mobx-react';
import PromptArea from './PromptArea';


export default TicTacToe= inject( "stores" )( observer( 
class TicTacToe extends React.Component{

    boardClickHandler(e) {
        const gameStore=this.props.stores.ticTacToe;
        console.log(gameStore.opponent)
        const { locationX, locationY } = e.nativeEvent
        console.log('location',locationX,locationY)
        const y=Math.floor(locationY/gameStore.squareSize);
        const x=Math.floor(locationX/gameStore.squareSize)
        gameStore.setBoardState(gameStore.turn,y,x);
        gameStore.isWinner(y,x);
        console.log(gameStore.boardState)
        if(gameStore.result===null){
            gameStore.setTurn(gameStore.turn==='X'?'O':'X')
            if(gameStore.opponent==='computer'){
                gameStore.AIAction()
            }
        }
    }

    render(){
        const gameStore=this.props.stores.ticTacToe
        return(
            <TouchableOpacity onPress={(e) => this.boardClickHandler(e)}>
                <View style={styles.container}> 
                    <View style={styles.board} >
                        <Board />
                        {
                            gameStore.boardState.map((subArr,row) =>
                             subArr.map((el,column)=>{
                                 console.log(el,row,column)
                             return(el==='O'?
                                <Circle
                                    key={`${row} ${column}`}
                                    xTranslate={gameStore.getCenter(column)}
                                    yTranslate={gameStore.getCenter(row)}
                                    color='black'
                                />
                               :(el==='X'? <Cross
                                    key={`${row} ${column}`}
                                    xTranslate={gameStore.getCenter(column)}
                                    yTranslate={gameStore.getCenter(row)}/>
                                    :null)
                            )}))
                        }
                                       
                    </View>
                 <PromptArea/> 
                </View>
            </TouchableOpacity>
        )
    }
}))

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: '80%',
        alignItems: 'center'
    },
    board: {
        borderWidth: 3,
        height: 300,
        width: 300
    }
})

