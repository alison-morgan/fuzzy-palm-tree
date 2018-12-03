import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class SmallCross extends React.Component{
    
    render(){
        const { xTranslate, yTranslate, color } = this.props;
        console.log('new cross',xTranslate,yTranslate)
        return(
            <View style={[styles.container, {
                transform: [
                    {translateX: xTranslate ? xTranslate : 10},
                    {translateY: yTranslate ? yTranslate : 10},
                ]
            }]}>
                <View style={[styles.line, {
                    transform: [
                        {rotate: '45deg'},
                    ],
                    backgroundColor: color ? color : '#000'
                }]}/>
                <View style={[styles.line, {
                    transform: [
                        {rotate: '135deg'},
                    ],
                    backgroundColor: color ? color : '#000'
                }]}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: 80,
        height: 80,
        justifyContent: 'center',
        marginLeft: '12%'
    },
    line: {
        position: 'absolute',
        width: 8,
        height: 105,
    }
})