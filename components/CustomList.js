import React from 'react';
import { FlatList, Text, StyleSheet, } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { observer, inject } from 'mobx-react';
import Swipeable from 'react-native-swipeable';

const CustomList = inject( "stores" )( observer( class CustomList extends React.Component {
	getButtons = ( action,name ) => {
		const userStore = this.props.stores.userStore
		switch ( action ) {
			case 'accept/decline':
				return [
					<Icon
						reverse={true}
						name='check'
						containerStyle={{
							borderRadius: 0,
							flex: 1,
							backgroundColor: 'green'
						}}
						size={35}/>,
					<Icon
						reverse={true}
						name='cancel'
						containerStyle={{
							borderRadius: 0,
							flex: 1,
							backgroundColor: 'red'
						}}
						size={35}/>,
				]
			case 'sendMessage':
				return [ <Icon
					reverse={true}
					name='message'
					containerStyle={{
						borderRadius: 0,
						flex: 1,
						backgroundColor: 'salmon'
					}}
					size={35}/> ]
			default:
				return [ <Icon
					reverse={true}
					name='add-user'
					type='entypo'
					size={35}
					containerStyle={{
						borderRadius: 0,
						flex: 1,
						backgroundColor: 'purple'
					}}
					onPress={() => userStore.friendReq( name )}/> ]
		}
	}
	render() {
		const name = this.props.name.split( ' ' );
		const userStore = this.props.stores.userStore;
		let object = null;
		if ( name.length > 1 ) {
			object = userStore[ name[ 0 ] ][ name[ 1 ] ]
		} else if ( name.length > 0 ) 
			object = userStore[ name[ 0 ] ];
		
		if ( Object.keys( object ).length > 0 ) {
			const data = Object.keys( object ).map( name => ( { title: name, key: name } ) )
			return ( <FlatList
				useFlatList="useFlatList"
				data={data}
				keyExtractor={( item ) => item.key}
				renderItem={( { item } ) => <Swipeable
					rightButtons={this.getButtons(this.props.action,item.title)}
					rightButtonWidth={75}>
					<ListItem
						title={item.title}
						titleStyle={styles.titleStyle}
						containerStyle={styles.list}
						leftIcon={object[ item.title ].isOnline
							? {
								type: 'font-awesome',
								name: 'eye',
								color: 'green'
							}
							: {
								type: 'font-awesome',
								name: 'eye-slash'
							}}/>
				</Swipeable>
				}
			/> )
		} else {
			return ( <Text>No results yet</Text> )
		}
	}
} ) )

const styles = StyleSheet.create( {
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	list: {
		backgroundColor: '#99CCFF'
	},
	titleStyle: {
		color: 'purple',
		fontWeight: 'bold'
	}
} )
export default CustomList
