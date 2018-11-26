import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Circle extends React.Component{

    render() {
            const { xTranslate, yTranslate, color } = this.props;
        return(
            <View style={[styles.container, {
                transform: [
                    {translateX: xTranslate ? xTranslate : 10},
                    {translateY: yTranslate ? yTranslate : 10},
                ],
                backgroundColor: color ? color : '#000'
            }]}>
                <View style={styles.innerCircle}>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    innerCircle: {
        backgroundColor: 'red',
        width: 70,
        height: 70,
        margin: 15,
        borderRadius: 35
    }
})