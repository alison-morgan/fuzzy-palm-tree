// Main.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { List, ListItem,SearchBar,Button, Icon } from 'react-native-elements';
import { observer,inject } from 'mobx-react';

const FriendsList=inject("stores")(observer(
    class FriendsList extends React.Component {

    render(){
	const userStore = this.props.stores.userStore;
	const friendsNames = userStore.friendsInfo?Object.keys(userStore.friendsInfo):null;
	const possibleFriendsNames=userStore.possibleFriends?Object.keys(userStore.possibleFriends):null;
	if(userStore.friendSearch){
		return(<View style={styles.container}>
			<SearchBar
				lightTheme
				round
				onChangeText={(text)=>{
					userStore.setFriendSearch(text);
					userStore.search('friends')}}
				inputStyle={styles.text}
				searchIcon={true}
				placeholder={userStore.placeholders.search}
			/>
				<Text>Friends</Text>
				<List>
					{/* {(friendsNames && friendsNames.length>0)?
					friendsNames.map(friend => (
					<ListItem
						key={friend}
						title={friend}
						rightIcon={{ type:'entypo', name:'paper-plane'}}
						leftIcon={ (userStore.friendsInfo[friend].isOnline) ? {type:'font-awesome', name: 'eye', color:'green'} : {type:'font-awesome', name: 'eye-slash'}}
					/>))
					: */}
					<Text>No results yet</Text>
					{/* } */}
					</List>
				<Text>Explore Users</Text>
				<List>
					{/* {possibleFriendsNames.length>0?
					 possibleFriendsNames.map(friend => (
					<ListItem
					key={friend}
					title={friend}
					rightIcon={{ type:'entypo', name:'paper-plane'}}
					leftIcon={ (userStore.possibleFriends[friend].isOnline) ? {type:'font-awesome', name: 'eye', color:'green'} : {type:'font-awesome', name: 'eye-slash'}}
					/>))

					: */}
					<Text>No results yet</Text>
					{/* } */}
				</List>
				
			</View> )
	}
	else if (friendsNames || possibleFriendsNames) {
		return ( <View style={styles.container}>
		<SearchBar
			lightTheme
			round
			onChangeText={(text)=>{
				userStore.setFriendSearch(text);
				userStore.search('friends')}}
			inputStyle={styles.text}
			searchIcon={true}
			placeholder={userStore.placeholders.search}
		/>
			<Text>Friends</Text>
			<List>
				{(friendsNames && friendsNames.length>0)?
				friendsNames.map(friend => (
				<ListItem
					key={friend}
					title={friend}
					rightIcon={{ type:'entypo', name:'paper-plane'}}
					leftIcon={ (userStore.friendsInfo[friend].isOnline) ? {type:'font-awesome', name: 'eye', color:'green'} : {type:'font-awesome', name: 'eye-slash'}}
				/>))
				:<Text>You didn't find any friends yet</Text>
				}
				</List>
			<Text>Explore Users</Text>
			<List>
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
			</List>
			
		</View> 
		)
	}else{
		return(<Text>No information available it this time</Text>)
	}

	}
	}
))
const styles = StyleSheet.create( {
	container: {
		flex: 1
	},
	text:{
		justifyContent: 'center',
		fontSize:10,
		padding:12
	}
} )
export default FriendsList;