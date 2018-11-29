import React from 'react';
import { FlatList, Text, StyleSheet, View} from 'react-native';
import{ListItem, Button} from 'react-native-elements';
import {observer,inject} from 'mobx-react';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view'

const CustomList=inject("stores")(observer( 
	class CustomList extends React.Component {
		render() {
			const name=this.props.name.split(' ');
			const userStore = this.props.stores.userStore;
			let object=null;
			if(name.length>1){
				object=userStore[name[0]][name[1]]
				console.log(object, "if")
			}else if(name.length>0){
				object=userStore[name[0]];
				if(Object.keys(object).length>0){
					console.log(Object.keys(object))
					const data=Object.keys(object).map(name => (
						{title:name,key:name}))
					console.log('Styles ==== ', styles)
					return(
						<FlatList
							useFlatList
							data={data}
							keyExtractor={(item)=>item.key}
							renderItem={({item})=>
								<SwipeRow
								rightOpenValue={-300}
								>
									<Button
									title='Request Friend'
									buttonStyle={styles.request}
									onPress={() => userStore.friendReq(item.title)}
									>Request Friend</Button>
								
									<Button
									buttonStyle={styles.list}
									title={item.title}
									rightIcon={{ type:'entypo', name:'paper-plane'}}
									leftIcon={object.hasOwnProperty('isOnline')?
									((object.isOnline) ? {type:'font-awesome', name: 'eye', color:'green'} : {type:'font-awesome', name: 'eye-slash'})
							 		:null}
									/>
								</SwipeRow>
						}>
						</FlatList>
					)
				}else{
					return(
						<Text>No results yet</Text>
					)
				}
			}
		}
	}
))

const styles = StyleSheet.create( {
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	request: {
		backgroundColor: '#99CCFF'
	},
	list: {
		backgroundColor: '#99CCFF'
	}
} )
export default CustomList