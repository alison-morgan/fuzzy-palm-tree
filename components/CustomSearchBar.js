import React from 'react';
import { StyleSheet} from 'react-native';
import { SearchBar} from 'react-native-elements';
import { observer,inject } from 'mobx-react';
import LinearGradient from 'react-native-linear-gradient';

const CustomSearchBar=inject("stores")(observer( 
	class CustomSearchBar extends React.Component {
		render() {
			const userStore = this.props.stores.userStore;
		return(
			<LinearGradient
						colors={['#091540', '#880D1E']}
						start={{x:0, y:1}} 
						end={{x:1.5, y:0}}
						style={styles.container}>
        <SearchBar
            lightTheme
            round
            onChangeText={(text)=>{
                userStore.setFriendSearch(text);
                userStore.search(this.props.name)}}
            inputStyle={styles.text}
            searchIcon={true}
            placeholder={userStore.placeholders.search}
        />
		</LinearGradient>	)
			
		}
	}
))
const styles = StyleSheet.create( {
	container: {
		flex: 1,
		height: 14,
		justifyContent: 'center',
		alignItems: 'stretch'
	}
} )
export default CustomSearchBar