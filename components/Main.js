// Main.js
import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import {Header,Icon} from 'react-native-elements';
import firebase from 'react-native-firebase';

export default class Main extends React.Component {
  state = { currentUser: null,username:'' }
  componentDidMount() {
    const { currentUser}  = firebase.auth();
    this.setState({ currentUser: currentUser, username: currentUser.uid },() => {
      console.log(this.state.currentUser.uid, ' this is your users uid')
    })
  }

 

  render() {
    const { currentUser } = this.state;
    return (<View>
   <Header
      leftComponent={{ icon: 'menu'}}
      centerComponent={{ text: `Hi,${this.state.username}!`, style: { color: '#fff' } }}
      rightComponent={{ icon: 'home', color: '#fff',onPress: ()=> this.props.navigation.navigate('Main')}}
    />
      <View style={styles.container}>
        <Text>
          Main Page
        </Text>
        <Button
          title='sign out'
          onPress={() => {
            firebase.auth().signOut().then(function() {
              console.log('Signed Out');
            }, function(error) {
              console.error('Sign Out Error', error);
            });
            this.props.navigation.navigate('SignUp')
          }
          }>
        </Button>
      </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})