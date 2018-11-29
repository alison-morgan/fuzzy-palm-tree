import React from 'react';
import { FlatList, Text, StyleSheet, } from 'react-native';
import{ListItem} from 'react-native-elements'
import {observer,inject} from 'mobx-react';

const CustomList=inject("stores")(observer( 
	class CustomList extends React.Component {
		render() {
			const name=this.props.name.split(' ');
			const userStore = this.props.stores.userStore;
			let object=null;
			if(name.length>1){
				object=userStore[name[0]][name[1]]
			}else if(name.length>0){
				object=userStore[name[0]];
			}
			if(Object.keys(object).length>0){
				const data=Object.keys(object).map(name => (
					{title:{name},key:{name}}))
				return(
					<FlatList
					data={data}
					keyExtractor={(item)=>item.key}
					renderItem={({item})=>{
						<ListItem 
						title={item.title}
						rightIcon={{ type:'entypo', name:'paper-plane'}}
						leftIcon={object.hasOwnProperty(isOnline)?
							 ((object.isOnline) ? {type:'font-awesome', name: 'eye', color:'green'} : {type:'font-awesome', name: 'eye-slash'})
							 :null}
						/>}}
					/>)
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
	}
} )
export default CustomList