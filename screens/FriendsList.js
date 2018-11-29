// Main.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { List, ListItem,SearchBar } from 'react-native-elements';
import { observer,inject } from 'mobx-react';
import CustomList from '../components/CustomList';
import CustomSearchBar from '../components/CustomSearchBar'

const FriendsList=inject("stores")(observer(
    class FriendsList extends React.Component {
		render(){
		const userStore = this.props.stores.userStore;
		console.log('search Result',userStore.friendSearch,userStore.searchResult)
		console.log('friendRequests',userStore.friendRequests)
			if(userStore.friendSearch && userStore.searchResult){
				return(<View style={styles.container}>
					<CustomSearchBar name='friends'/>

					<Text>Friend Requests</Text>
					{userStore.friendRequests
					?<CustomList name='searchResult friendRequests'/>
					:<Text>No friend requests at this time</Text>}

					<Text>Friends</Text>
					{userStore.friendsInfo
					?<CustomList name='searchResult friends'/>
					:<Text>You didn't find any friends yet</Text>}

					<Text>Explore Users</Text>
					{userStore.possibleFriends
					?<CustomList name='searchResult possibleFriends'/> 
					:<Text>No possible friends available at this moment</Text>}				
					</View> )
			}else{ 
				return ( <View style={styles.container}>
				<CustomSearchBar name='friends'/>
				
				<Text>Friend Requests</Text>
				{userStore.friendRequests
				?<CustomList name='friendRequests'/>
				:<Text>No friend requests at this time</Text>}

				 <Text>Friends</Text>
				 {userStore.friendsInfo
				 ?<CustomList name='friendsInfo'/>
				 :<Text>You didn't find any friends yet</Text>}

				<Text>Explore Users</Text>
				{userStore.possibleFriends
				?<CustomList name='possibleFriends'/> 
				:<Text>No possible friends available at this moment</Text>}
				</View> 
				)
			}
		}
	}
))
const styles = StyleSheet.create( {
	container: {
		flex: 1,
	},
	text:{
		justifyContent: 'center',
		fontSize:10,
		padding:12
	}
} )
export default FriendsList;