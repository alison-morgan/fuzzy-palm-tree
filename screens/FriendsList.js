import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { observer,inject } from 'mobx-react';
import CustomList from '../components/CustomList';
import CustomSearchBar from '../components/CustomSearchBar';
import LinearGradient from 'react-native-linear-gradient';

//component that returns information about your friends,friedRequests and possibleFriends
const FriendsList=inject("stores")(observer(
    class FriendsList extends React.Component {
		render(){
			const userStore = this.props.stores.userStore;
			//check if there is any search requests
			if(userStore.friendSearch && userStore.searchResult){
				return(
					<LinearGradient
						colors={['#091540', '#880D1E']}
						start={{x:0, y:1}} 
						end={{x:1.5, y:0}}
						style={styles.container}>
						<ScrollView>
							<CustomSearchBar name='friends'/>
							<Text style={styles.headers}>Friend Requests</Text>
								{
									Object.keys(userStore.friendRequests).length!==0
									?<CustomList name='searchResult friendRequests' action='accept/decline'/>
									:<Text style={styles.text}>No friend requests at this time</Text>
								}
							<Text style={styles.headers}>Friends</Text>
								{
									Object.keys(userStore.friendsInfo).length!==0
									?<CustomList name='searchResult friends' action='sendMessage'/>
									:<Text style={styles.text}>You didn't find any friends yet</Text>
								}
							<Text style={styles.headers}>Explore Users</Text>
								{
									Object.keys(userStore.possibleFriends).length!==0
									?<CustomList name='searchResult possibleFriends' action='friendRequest'/> 
									:<Text style={styles.text}>No possible friends available at this moment</Text>
								}				
						</ScrollView>
					</LinearGradient>)
			//show initial page
			}else{ 
				return (
					<LinearGradient
						colors={['#091540', '#880D1E']}
						start={{x:0, y:1}} 
						end={{x:1.5, y:0}}
						style={styles.container}>
						<CustomSearchBar name='friends'/>
							<ScrollView> 
								<Text style={styles.headers}>Friend Requests</Text>
								{
									Object.keys(userStore.friendRequests).length!==0
									?<CustomList name='friendRequests' action='accept/decline'/>
									:<Text style={styles.text}>No friend requests at this time</Text>
								}

								<Text style={styles.headers}>Friends</Text>
								{
									Object.keys(userStore.friendsInfo).length!==0
									?<CustomList name='friendsInfo' action='sendMessage'/>
									:<Text style={styles.text}>You didn't find any friends yet</Text>
									}

								<Text style={styles.headers}>Explore Users</Text>
								{	Object.keys(userStore.possibleFriends).length!==0
									?<CustomList name='possibleFriends' action='friendRequest'/> 
									:<Text style={styles.text}>No possible friends available at this moment</Text>
								}				
							</ScrollView>
					</LinearGradient>)
			}
		}
	}
))
const styles = StyleSheet.create( {
	container: {
		flex: 1,
	},
	text:{
		textAlign:'center',
		fontSize:15,
		color:'white'
	},
	headers:{
		textAlign:'center',
		marginTop:50,
		color:'#880D1E',
		fontWeight: 'bold',
		fontSize: 20,
		textShadowColor:'#311b92', 
		textShadowRadius: 1, 
		textShadowOffset: {width: -1, height: 1}
	},
	searchBar:{
		position: 'absolute',
		top: 0
	}
} )
export default FriendsList;