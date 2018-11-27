// Main.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { List, ListItem, Button, Icon } from 'react-native-elements';
import { observer,inject } from 'mobx-react';
import firebase from 'react-native-firebase';

const FriendsList=inject("stores")(observer(
    class FriendsList extends React.Component {

    render(){
		// this.props.stores.userStore.isFriendOnline()
	let friendInfo = this.props.stores.userStore.friendsInfo;
	let nameArr = Object.keys(friendInfo)
	if (friendInfo) {

		return ( <View style={styles.container}>
			<Text>
				Friends
			</Text>
			<List>
				{
					
				nameArr.map((item) => {
					this.props.stores.userStore.isFriendOnline(friendInfo[item].username)
					console.log(this.props.stores.userStore.friendsInfo[item].isOnline, "in map")
					return(
				<ListItem
					key={item}
					title={friendInfo[item].username}
					rightIcon={{ type:'entypo', name:'paper-plane'}}
					leftIcon={ (this.props.stores.userStore.friendsInfo[item].isOnline) ? {type:'font-awesome', name: 'eye', color:'green'} : {type:'font-awesome', name: 'eye-slash'}}
				>
				</ListItem>
				)
			})
				}
				</List>
			<Text>Explore Users</Text>
			{/* <List>
				{
				 .map(not) => (
				<ListItem
				key={not}
				title={not}
				rightIcon={{ type:'entypo', name:'paper-plane'}}
				leftIcon={{ type:'font-awesome', name: 'eye', color:'green'}}
				>
				</ListItem>
				}
				
			</List>
			 */}
		</View> 
		)
	} else {
		<View>
			<Text>Explore Users</Text>
			{/* <List>
				{
				 .map(not) => (
				<ListItem
				key={not}
				title={not}
				rightIcon={{ type:'entypo', name:'paper-plane'}}
				leftIcon={{ type:'font-awesome', name: 'eye', color:'green'}}
				>
				</ListItem>
				}
				
			</List>
			 */}
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