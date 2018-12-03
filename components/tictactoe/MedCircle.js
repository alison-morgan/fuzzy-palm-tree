import React from 'react';
import { StyleSheet, View } from 'react-native';

export default class MedCircle extends React.Component{

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
        width: 40,
        height: 40,
        borderRadius: 40,
    },
    innerCircle: {
        backgroundColor: 'black',
        width: 40,
        height: 40,
        margin: 15,
        borderRadius: 35
    }
})