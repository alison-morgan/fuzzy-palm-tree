import React from 'react';
import { FlatList, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import {observer,inject} from 'mobx-react';
import {SwipeRow} from 'react-native-swipe-list-view'

const CustomList=inject("stores")(observer( 
	class CustomList extends React.Component {
		render() {
			const name=this.props.name.split(' ');
			console.log('name',name);
			const userStore = this.props.stores.userStore;
			let object=null;
			if(name.length>1){
				console.log(userStore)
				object=userStore[name[0]][name[1]]
			}else if(name.length>0)
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
								/>
							
								<Button
								buttonStyle={styles.list}
								title={item.title}
								leftIcon={object.isOnline 
								? {type:'font-awesome', name: 'eye', color:'green'} 
								: {type:'font-awesome', name: 'eye-slash'}}
								/>
							</SwipeRow>
					}/>)
			}else{
				return(<Text>No results yet</Text>)
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