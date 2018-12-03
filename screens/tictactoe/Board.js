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

            board.push( <View key={`${i}x`} style={[styles.lines,{
                transform: [
                { translateX: lineCoordinate }
                ] 
            } ] }  
            />)
            board.push(<View key={`${i}y`} style={[styles.lines,{
                height: 3,
                width: 295,
                transform: [
                    { translateY: lineCoordinate }
                ] 
            } ] } 
            />)
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
    lines: {
        backgroundColor: '#000',
        height: 295,
        width: 3, 
        position: 'absolute'
    }
})