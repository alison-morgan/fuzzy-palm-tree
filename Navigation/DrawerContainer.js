import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {observer,inject} from 'mobx-react';

export default DrawerContainer=inject("stores")(observer( 
    class DrawerContainer extends React.Component {

        render(){
            const {navigation}=this.props;
        return (
            <View style={styles.container}>
              <Text
                onPress={() => navigation.navigate('Home')}>
                Home
              </Text>
              <Text
                onPress={() => navigation.navigate('Messages')}>
                Messages
              </Text>
              <Text
                onPress={() => navigation.navigate('Friends')}>
                Friends
              </Text>
              <Text
                onPress={()=>{console.log('navigating through container');navigation.navigate('AuthStack')}}>
                Sign Out
              </Text>
            </View>
          )}
      
    }))
    const styles = StyleSheet.create( {
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor:'blue'
        }
    } )