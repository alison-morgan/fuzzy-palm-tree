import React from 'react';
import { StyleSheet, View} from 'react-native';

export default class MedBoard extends React.Component {
    render(){
        return(
            <View>
                <View style={[styles.lines,{
                    transform: [
                        { translateX: 225 }
                    ] 
                } ] }  
                />
                <View style={[styles.lines,{
                    transform: [
                        { translateX: 150 }
                    ] 
                } ] }  
                />
                <View style={[styles.lines,{
                    transform: [
                        { translateX: 75 }
                    ] 
                } ] } 
                />
                <View style={[styles.lines,{
                    height: 3,
                    width: 295,
                    transform: [
                        { translateY: 75 }
                    ] 
                } ] } 
                />
                <View style={[styles.lines,{
                    height: 3,
                    width: 295,
                    transform: [
                        { translateY: 150 }
                    ] 
                } ] } 
                />
                <View style={[styles.lines,{
                    height: 3,
                    width: 295,
                    transform: [
                        { translateY: 225 }
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

