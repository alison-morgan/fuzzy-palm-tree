import React from 'react';
import { StyleSheet, View } from 'react-native';
import { observer,inject } from 'mobx-react';
``
export default Circle = inject( "stores" )( observer(
class Circle extends React.Component{

    render() {
            const { xTranslate, yTranslate, color } = this.props;
            const outerCircle=this.props.stores.ticTacToe.squareSize - 15;
            const innerCircle=this.props.stores.ticTacToe.squareSize - 25;
        return(
            <View style={[{height:outerCircle, width:outerCircle}, styles.container, {
                transform: [
                    {translateX: xTranslate },
                    {translateY: yTranslate },
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
        borderRadius: 35
    }
})