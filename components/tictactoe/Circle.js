import React from 'react';
import { StyleSheet, View } from 'react-native';
import { observer,inject } from 'mobx-react';
``
export default Circle = inject( "stores" )( observer(
class Circle extends React.Component{

    render() {
            const { xTranslate, yTranslate, color } = this.props;
            const outerCircle=this.props.stores.ticTacToe.squareSize - 20;
            const innerCircle=this.props.stores.ticTacToe.squareSize - 30;
        return(
            <View style={[{height:outerCircle, width:outerCircle}, styles.container, {
                transform: [
                    {translateX: xTranslate ? xTranslate : 10},
                    {translateY: yTranslate ? yTranslate : 10},
                ],
                backgroundColor: color ? color : '#000'
            }]}>
                <View style={[{height:innerCircle, width:innerCircle}, styles.innerCircle]}>
                </View>
            </View>
        )
    }
}))

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
    },
    innerCircle: {
        backgroundColor: 'black',
        margin: 15,
        borderRadius: 35
    }
})