import React from 'react';
import { StyleSheet, View} from 'react-native';

export default class SmallBoard extends React.Component {
    render(){
    return(
        <View>
            <View style={[styles.lines,{
                transform: [
                { translateX: 200 }
                ] 
            } ] }  
            />
            <View style={[styles.lines,{
                transform: [
                { translateX: 100 }
                ] 
            } ] } 
            />
            <View style={[styles.lines,{
                height: 3,
                width: 295,
                transform: [
                    { translateY: 100 }
                ] 
            } ] } 
            />
            <View style={[styles.lines,{
                height: 3,
                width: 295,
                transform: [
                    { translateY: 200 }
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