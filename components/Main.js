// Main.js
import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import {Header,Icon} from 'react-native-elements';
import firebase from 'react-native-firebase';

export default class Main extends React.Component {
  state = { currentUser: null }
  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
  }
  render() {
    const { currentUser } = this.state;
    return (<View>
   <Header
      leftComponent={{ icon: 'menu'}}
      centerComponent={{ text: `Hi,${this.props.name}!`, style: { color: '#fff' } }}
      rightComponent={{ icon: 'home', color: '#fff',onPress: ()=> this.props.navigation.navigate('Main')}}
    />
      <View style={styles.container}>
        <Text>
          Main Page
        </Text>
        <Button
          title='sign out'
          onPress={() => this.props.navigation.navigate('SignUp')}/>
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