import React from 'react';
import {StyleSheet, View} from 'react-native';
import { observer,inject } from 'mobx-react';

export default Cross=inject( "stores" )( observer(
class Cross extends React.Component{

    render(){
        const { xTranslate, yTranslate, color } = this.props;
        
        const containerSize=this.props.stores.ticTacToe.squareSize - 20;
        console.log('new cross',xTranslate,yTranslate)
        return(
            <View style={[styles.container,{height:containerSize,width:containerSize}, {
                transform: [
                    {translateX: xTranslate ? xTranslate : 10},
                    {translateY: yTranslate ? yTranslate : 10},
                ]
            }]}>
                <View style={[{height: containerSize},styles.line, {
                    transform: [
                        {rotate: '45deg'},
                    ],
                    backgroundColor: color ? color : '#000'
                }]}/>
                <View style={[{height:containerSize},styles.line, {
                    transform: [
                        {rotate: '135deg'},
                    ],
                    backgroundColor: color ? color : '#000'
                }]}/>
            </View>
        )
    }
}))

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        justifyContent: 'center',
        marginLeft: '12%'
    },
    line: {
        position: 'absolute',
        width: 8,
    }
})