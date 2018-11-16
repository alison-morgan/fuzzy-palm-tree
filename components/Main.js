// Main.js
import React from 'react'
import { StyleSheet, Platform, Image, Text, View, Button } from 'react-native'
import firebase from 'react-native-firebase'


export default class Main extends React.Component {
  state = { currentUser: null }
  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser },() => {
      console.log(this.state.currentUser.uid, ' this is your users uid')
    })
  }

  getFromDatabase() {
    let docRef = firebase.firestore().collection("users").doc("MUpvmIyXaEGs0EZcTJI5")
    docRef.get().then(function(doc) {
      if (doc.exists) {
          console.log("Document data:", doc.data());
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
  });  
  }

  render() {
    const { currentUser } = this.state
    return (
      <View style={styles.container}>
        <Text>
          Hi {currentUser && currentUser.email}!
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
        <Button
          title='get to database'
          onPress={() => this.getFromDatabase()}>
        </Button>
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