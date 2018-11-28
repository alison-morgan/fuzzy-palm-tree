// Main.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { List, ListItem, Button, Icon } from 'react-native-elements';
import { observer,inject } from 'mobx-react';

const FriendsList=inject("stores")(observer(
    class FriendsList extends React.Component {

    render(){
	const userStore = this.props.stores.userStore;
	const friendsNames = Object.keys(userStore.friendsInfo);
	const possibleFriendsNames=Object.keys(userStore.possibleFriends);
	console.log('all of my friends',userStore.friendsInfo)
	console.log('stooooore',userStore)
	if (userStore.friendsInfo) {
		return ( <View style={styles.container}>
			<Text>Friends</Text>
			<List>
				{
				friendsNames.map(friend => (
				<ListItem
					key={friend}
					title={userStore.friendsInfo[friend].username}
					rightIcon={{ type:'entypo', name:'paper-plane'}}
					leftIcon={ (userStore.friendsInfo[friend].isOnline) ? {type:'font-awesome', name: 'eye', color:'green'} : {type:'font-awesome', name: 'eye-slash'}}
				/>))
				}
				</List>
			<Text>Explore Users</Text>
			{/* <List>
				{possibleFriendsNames.length>0?
				 possibleFriendsNames.map(friend => (
				<ListItem
				key={friend}
				title={friend}
				rightIcon={{ type:'entypo', name:'paper-plane'}}
				leftIcon={ (userStore.possibleFriends[friend].isOnline) ? {type:'font-awesome', name: 'eye', color:'green'} : {type:'font-awesome', name: 'eye-slash'}}
				/>))
				:<Text>No possible friends available</Text>
				}
			</List> */}
			
		</View> 
		)
	} else {
		<View>
			<Text>Explore Users</Text>
			{
				friendsNames.map(friend => (
				<ListItem
					key={friend}
					title={userStore.friendsInfo[friend].username}
					rightIcon={{ type:'entypo', name:'paper-plane'}}
					leftIcon={ (userStore.friendsInfo[friend].isOnline) ? {type:'font-awesome', name: 'eye', color:'green'} : {type:'font-awesome', name: 'eye-slash'}}
				/>))
				}
		</View>
	}

	}
	}
))
const styles = StyleSheet.create( {
	container: {
		flex: 1
	}
} )
export default FriendsList;