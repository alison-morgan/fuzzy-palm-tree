import React from 'react';
import { StyleSheet, View} from 'react-native';

export default class LargeBoard extends React.Component {
    render(){
        return(
            <View>
                <View style={[styles.lines,{
                    transform: [
                        { translateX: 60 }
                    ] 
                } ] }  
                />
                <View style={[styles.lines,{
                    transform: [
                        { translateX: 120 }
                    ] 
                } ] }  
                />
                <View style={[styles.lines,{
                    transform: [
                        { translateX:  180 }
                    ] 
                } ] } 
                />
                <View style={[styles.lines,{
                    transform: [
                        { translateX:  240 }
                    ] 
                } ] } 
                />
                <View style={[styles.lines,{
                    height: 3,
                    width: 295,
                    transform: [
                        { translateY: 60 }
                    ] 
                } ] } 
                />
                <View style={[styles.lines,{
                    height: 3,
                    width: 295,
                    transform: [
                        { translateY: 120 }
                    ] 
                } ] } 
                />
                <View style={[styles.lines,{
                    height: 3,
                    width: 295,
                    transform: [
                        { translateY: 180 }
                    ] 
                } ] } 
                />
                <View style={[styles.lines,{
                    height: 3,
                    width: 295,
                    transform: [
                        { translateY: 240 }
                    ] 
                } ] } 
                />
            </View>
        )
    }
    }

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

