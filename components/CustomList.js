import React from 'react';
import { FlatList, Text, StyleSheet, } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { observer, inject } from 'mobx-react';
import Swipeable from 'react-native-swipeable';

const CustomList = inject( "stores" )( observer( 
	class CustomList extends React.Component {
    getButtons = ( action, name ) => {
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
						onPress={() => userStore.acceptReq( name )}
                        size={35}/>,
                    <Icon
                        reverse={true}
                        name='cancel'
                        containerStyle={{
                            borderRadius: 0,
                            flex: 1,
                            backgroundColor: 'red'
						}}
						onPress={() => userStore.declineReq( name )}
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
                        backgroundColor: "rgba(92, 99,216, 1)"
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
                useFlatList={true}
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
        backgroundColor:'rgba(255, 255, 255, .10)',
        borderRadius:50,
        margin: 5,
        
    },
    titleStyle: {
        color: 'white',
        fontWeight: 'bold'
    }
} )
export default CustomList
