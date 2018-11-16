// NavBar.js
import React from 'react';
import { StyleSheet, ListItem,View,Button } from 'react-native';

const list=[
  {title:'friends',icon:''},
  {title:'messages',icon:''},
  {title:'profile',icon:''}]

export default class NavBar extends React.Component {

  render() {
    return (
      <View>
{
    list.map((item, i) => (
      <ListItem
        key={i}
        title={item.title}
        leftIcon={{ name: item.icon }}
      />
    ))
  }
  <Button
          title='sign out'
          onPress={() => this.props.navigation.navigate('SignUp')}/>
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