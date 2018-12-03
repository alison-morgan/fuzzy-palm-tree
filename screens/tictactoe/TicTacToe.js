import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Circle from '../components/Circle';
import Cross from '../components/Cross';
import { observer,inject } from 'mobx-react';
import PromptArea from './PromptArea';


export default TicTacToe= inject( "stores" )( observer( 
class TicTacToe extends React.Component{
    componentWillMount() {
        if(this.props.stores.ticTacToe.size === 5) {
            console.log('small')
            this.state.board = <SmallBoard/>
            this.state.cross = <SmallCross/>
            this.state.circle = <SmallCircle/>
        } else if (this.props.stores.ticTacToe.size === 4) {
            console.log('med')
            this.state.board = <MedBoard/>
            this.state.cross = <MedCross/>
            this.state.circle = <MedCircle/>
        } else if (this.props.stores.ticTacToe.size === 3) {
            console.log('large')
            this.state.board = <LargeBoard/>
            this.state.cross = <LargeCross/>
            this.state.circle = <LargeCircle/>
        }
    }

    boardClickHandler(e) {
        const gameStore=this.props.stores.ticTacToe;
        console.log(gameStore.opponent)
        const { locationX, locationY } = e.nativeEvent
        console.log('location',locationX,locationY)
        const y=Math.floor(locationY/100);
        const x=Math.floor(locationX/100)
        gameStore.setBoardState(gameStore.turn,y,x);
        gameStore.isWinner(y,x,gameStore.turn);
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
                        <View style={[styles.lines,{
                            transform: [
                            { translateX: 200 }
                            ] 
                        } ] }  
                        />
                        <View style={[styles.lines,{
                            transform: [
                                { translateX: 100 }
                            ] 
                        } ] } 
                        />
                        <View style={[styles.lines,{
                            height: 3,
                            width: 295,
                            transform: [
                                { translateY: 100 }
                            ] 
                        } ] } 
                        />
                        <View style={[styles.lines,{
                            height: 3,
                            width: 295,
                            transform: [
                                { translateY: 200 }
                            ] 
                        } ] } 
                        />
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
                                    yTranslate={gameStore.getCenter(row)}
                                />:null)
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
    },
    lines: {
        backgroundColor: '#000',
        height: 295,
        width: 3, 
        position: 'absolute'
    }
})

