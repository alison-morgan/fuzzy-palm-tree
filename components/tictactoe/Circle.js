import React from 'react';
import { StyleSheet, View } from 'react-native';
import { observer,inject } from 'mobx-react';

//Circle component for TicTacToe game
export default Circle = inject( "stores" )( observer(
    class Circle extends React.Component{

        render() {
                const { xTranslate, yTranslate } = this.props;
                //variable defining circle size
                const circleSize=this.props.stores.ticTacToe.squareSize - 15;
            return(
                <View style={[{height: circleSize, width: circleSize}, styles.container, {
                    transform: [
                        {translateX: xTranslate },
                        {translateY: yTranslate },
                    ],
                    backgroundColor: '#880D1E'
                }]}/>
            )
        }
    }
))

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    }
})