import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { observer,inject } from 'mobx-react';
import CustomList from '../components/CustomList';
import CustomSearchBar from '../components/CustomSearchBar'

const FriendsList=inject("stores")(observer(
    class FriendsList extends React.Component {

		render(){
			const userStore = this.props.stores.userStore;
			console.log(userStore)
			if(userStore.friendSearch && userStore.searchResult){
				return(
					<View style={styles.container}>
					<CustomSearchBar name='friends'/>
					<Text style={styles.headers}>Friend Requests</Text>
						{
							Object.keys(userStore.friendRequests).length!==0
							?<CustomList name='searchResult friendRequests' action='accept/decline'/>
							:<Text>No friend requests at this time</Text>
						}
					<Text style={styles.headers}>Friends</Text>
						{
							Object.keys(userStore.friendsInfo).length!==0
							?<CustomList name='searchResult friends' action='sendMessage'/>
							:<Text>You didn't find any friends yet</Text>
						}
					<Text style={styles.headers}>Explore Users</Text>
						{
							Object.keys(userStore.possibleFriends).length!==0
							?<CustomList name='searchResult possibleFriends' action='friendRequest'/> 
							:<Text>No possible friends available at this moment</Text>
						}				
					</View> )
			}else{ 
				return ( <View style={styles.container}>
					<CustomSearchBar name='friends'/>
				<Text style={styles.headers}>Friend Requests</Text>
				{Object.keys(userStore.friendRequests).length!==0
				?<CustomList name='friendRequests' action='accept/decline'/>
				:<Text>No friend requests at this time</Text>}

				<Text style={styles.headers}>Friends</Text>
				{Object.keys(userStore.friendsInfo).length!==0
				?<CustomList name='friendsInfo' action='sendMessage'/>
				:<Text>You didn't find any friends yet</Text>}

				<Text style={styles.headers}>Explore Users</Text>
				{Object.keys(userStore.possibleFriends).length!==0
				?<CustomList name='possibleFriends' action='friendRequest'/> 
				:<Text>No possible friends available at this moment</Text>}				
				</View> )
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
		padding:0
	},
	headers:{
		color: 'purple',
		fontWeight: 'bold'
	}
} )
export default FriendsList;