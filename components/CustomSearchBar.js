import React from 'react';
import { StyleSheet} from 'react-native';
import { SearchBar} from 'react-native-elements';
import { observer,inject } from 'mobx-react';

const CustomSearchBar=inject("stores")(observer( 
	class CustomSearchBar extends React.Component {
		render() {
			const userStore = this.props.stores.userStore;
		return(
        <SearchBar
            lightTheme
            round
            onChangeText={(text)=>{
                userStore.setFriendSearch(text);
                userStore.search(this.props.name)}}
            inputStyle={styles.text}
            searchIcon={true}
            placeholder={userStore.placeholders.search}
        />	)
			
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
export default CustomSearchBar