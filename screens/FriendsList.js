// Main.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { observer,inject } from 'mobx-react';
import CustomList from '../components/CustomList';
import CustomSearchBar from '../components/CustomSearchBar'

const FriendsList=inject("stores")(observer(
    class FriendsList extends React.Component {

		render(){
			const userStore = this.props.stores.userStore;
			userStore.setNavigate(this.props.navigation);
			console.log(userStore.friendsInfo, "friednnsnsnsn")
			console.log('search Result',userStore.friendSearch,userStore.searchResult)
				if(userStore.friendSearch && userStore.searchResult){
					return(
						<View style={styles.container}>
						<CustomSearchBar name='friends'/>
						<Text>Friend Requests</Text>
							{
								userStore.friendRequests
								?<CustomList name='searchResult friendRequests' action='accept/decline' />
								:<Text>No friend requests at this time</Text>
							}
						<Text>Friends</Text>
							{
								userStore.friendsInfo
								?<CustomList name='searchResult friends' action='sendMessage' nav={this.props.navigation}/>
								:<Text>You didn't find any friends yet</Text>
							}
						<Text>Explore Users</Text>
							{
								userStore.possibleFriends
								?<CustomList name='searchResult possibleFriends' /> 
								:<Text>No possible friends available at this moment</Text>
							}				
						</View> )
				}else{ 
					return ( <View style={styles.container}>
						<CustomSearchBar name='friends'/>				
						<Text>Friend Requests</Text>
						{userStore.friendRequests
						?<CustomList name='friendRequests' action='accept/decline'/>
						:<Text>No friend requests at this time</Text>}

						<Text>Friends</Text>
						{userStore.friendsInfo
						?<CustomList name='friendsInfo' action='sendMessage'/>
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