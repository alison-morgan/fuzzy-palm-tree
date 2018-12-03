import React from 'react';
import {StyleSheet, View} from 'react-native';

export default class MedCross extends React.Component{
    
    render(){
        const { xTranslate, yTranslate, color } = this.props;
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
        width: 40,
        height: 40,
        justifyContent: 'center',
        marginLeft: '15%'
    },
    line: {
        position: 'absolute',
        width: 8,
        height: 40,
    }
})