import React from 'react';
import { StyleSheet, View} from 'react-native';
import { observer, inject } from 'mobx-react';

export default Board = inject( "stores" )( observer( 
class Board extends React.Component {

    createBoard=()=>{
        const gameStore=this.props.stores.ticTacToe;
        const board=[];
        for(let i=1;i<gameStore.size;i++){
            const lineCoordinate = i * gameStore.squareSize;
            board.push( 
                <View 
                    key={`${i}x`} 
                    style={ [ styles.linesVertical,
                    { transform: [ { translateX: lineCoordinate } ] } ] } />)
            board.push(
                <View 
                    key={`${i}y`} 
                    style={ [ styles.linesHorizontal,
                    { transform: [ { translateY: lineCoordinate } ] } ] } />)
        }
        return board;
    }
    render(){
    return(
        <View>
          {this.createBoard()}
        </View>
    )
    }
}))  


const styles = StyleSheet.create({
    linesVertical: {
        backgroundColor: '#000',
        height: 300,
        width: 3, 
        position: 'absolute'
    },
    linesHorizontal: {
        backgroundColor: '#000',
        height: 3,
        width: 300, 
        position: 'absolute'
    }
})