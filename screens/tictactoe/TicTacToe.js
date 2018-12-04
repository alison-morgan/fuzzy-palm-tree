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
        if(this.props.stores.ticTacToe.result===null){
            const gameStore=this.props.stores.ticTacToe;
            const { locationX, locationY } = e.nativeEvent
            console.log('location',locationX,locationY)
            const y=Math.floor(locationY/gameStore.squareSize);
            const x=Math.floor(locationX/gameStore.squareSize)
            if(gameStore.boardState[y][x]===1){
                gameStore.setBoardState(gameStore.turn,y,x);
                gameStore.isWinner(y,x);
                if(gameStore.result===null){
                    gameStore.setTurn(gameStore.turn==='X'?'O':'X')
                    if(gameStore.opponent==='computer'){
                        gameStore.AIAction()
                    }
                }
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
        )
    }
}))

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: '30%',
        alignItems: 'center'
    },
    board: {
        borderWidth: 3,
        height: 305,
        width: 305
    }
})

