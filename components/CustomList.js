import React from 'react';
import { FlatList, Text, StyleSheet, } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { observer, inject } from 'mobx-react';
import Swipeable from 'react-native-swipeable';

const CustomList = inject( "stores" )( observer( 
	class CustomList extends React.Component {
        //function that return side icons depending on the available options
        getButtons = ( action, name ) => {
            const userStore = this.props.stores.userStore
            switch ( action ) {
                case 'accept/decline':
                    return [
                        <Icon
                            reverse={true}
                            name='check'
                            containerStyle={{
                                flex: 1,
                                backgroundColor: '#009624'
                            }}
                            onPress={() => userStore.acceptReq( name )}
                            size={30}/>,
                        <Icon
                            reverse={true}
                            name='cancel'
                            containerStyle={{
                                flex: 1,
                                backgroundColor: '#880D1E'
                            }}
                            onPress={() => userStore.declineReq( name )}
                            size={30}/>,
                    ]
                case 'sendMessage':
                    return [ <Icon
                        reverse={true}
                        name='message'
                        containerStyle={{
                            flex: 1,
                            backgroundColor: '#880D1E'
                        }}
                        size={30}/> ]
                default:
                    return [ <Icon
                        reverse={true}
                        name='add-user'
                        type='entypo'
                        size={30}
                        containerStyle={{
                            flex: 1,
                            backgroundColor: '#091540'
                        }}
                        onPress={() => userStore.friendReq( name )}/> ]
            }
        }
        render() {
            //see what screen we should show,search result or regular one
            const name = this.props.name.split( ' ' );
            const userStore = this.props.stores.userStore;
            let object = null;
            //if showing search results
            if ( name.length > 1 ) {
                //pull search result object from userStore
                object = userStore[ name[ 0 ] ][ name[ 1 ] ]
            //if we showing initial page 
            } else if ( name.length > 0 )
            //pull out friendsInfo/possibleFriends/FriendRequests object from userstore
                object = userStore[ name[ 0 ] ];
            
            //if there is at least one field in object
            if ( Object.keys( object ).length > 0 ) {
                //create data object for FlatList,that has title and key fields
                const data = Object.keys( object ).map( name => ( { title: name, key: name } ) )
                return (
                    <FlatList
                        useFlatList={true}
                        data={data}
                        keyExtractor={ item  => item.key}
                        renderItem={( { item } ) => 
                        <Swipeable
                            rightButtons={ this.getButtons(this.props.action,item.title) }
                            rightButtonWidth={70}>
                            <ListItem
                                title={item.title}
                                titleStyle={styles.titleStyle}
                                containerStyle={styles.list}
                                leftIcon={object[ item.title ].isOnline
                                    ? {
                                        type: 'font-awesome',
                                        name: 'eye',
                                        color: '#009624'
                                    }
                                    : {
                                        type: 'font-awesome',
                                        name: 'eye-slash'
                                    }}/>
                        </Swipeable>
                    }
                /> )
            } else {
                return ( <Text style={styles.text}>No results yet</Text> )
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
    list: {
        backgroundColor:'rgba(255, 255, 255, .1)',
        borderRadius:50,
        margin: 5,
        borderBottomWidth:0
    },
    text:{
		textAlign:'center',
		fontSize:15,
		color:'white'
	},
    titleStyle: {
        color: 'white',
        fontWeight: 'bold'
    }
} )
export default CustomList
