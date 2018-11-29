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
		console.log('friendRequests',userStore.friendRequests.length)
			if(userStore.friendSearch && userStore.searchResult){
				return(<View style={styles.container}>
					<CustomSearchBar name='friends'/>
					<Text>Friends</Text>
					<CustomList name='searchResult friends'/>
					<Text>Explore Users</Text>
					<CustomList name='searchResult possibleFriends'/>					
					</View> )
			}else if (userStore.possibleFriends || userStore.friendsInfo) {
				return ( <View style={styles.container}>
				<CustomSearchBar name='friends'/>
				{userStore.friendRequests.length>0
				?<CustomList name='friendRequests'/>
				:null
				}
				 <Text>Friends</Text>
				<CustomList name='friendsInfo'/>

				<Text>Explore Users</Text>
				<CustomList name='possibleFriends'/> 
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