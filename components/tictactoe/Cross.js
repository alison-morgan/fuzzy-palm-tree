import React from 'react';
import {StyleSheet, View} from 'react-native';
import { observer,inject } from 'mobx-react';
//cross component for TicTacToe game
export default Cross=inject( "stores" )( observer(
    class Cross extends React.Component{

        render(){
            const { xTranslate, yTranslate} = this.props;
            //variable defining container size for cross
            const containerSize=this.props.stores.ticTacToe.squareSize - 10;
            return(
                <View style={[styles.container,{height:containerSize,width:containerSize}, {
                    transform: [
                        {translateX: xTranslate },
                        {translateY: yTranslate },
                    ]
                }]}>
                    <View style={[{height: containerSize},styles.line, {
                        transform: [
                            {rotate: '45deg'},
                        ],
                        backgroundColor: '#091540'
                    }]}/>
                    <View style={[{height:containerSize},styles.line, {
                        transform: [
                            {rotate: '135deg'},
                        ],
                        backgroundColor: '#091540'
                    }]}/>
                </View>
            )
        }
    }
))

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    line: {
        position: 'absolute',
        width: 8,
    }
})