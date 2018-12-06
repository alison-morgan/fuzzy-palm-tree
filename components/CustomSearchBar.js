import React from 'react';
import { StyleSheet, View,TextInput} from 'react-native';
import { observer,inject } from 'mobx-react';

//search bar component
const CustomSearchBar=inject("stores")(observer( 
	class CustomSearchBar extends React.Component {
		render() {
			const userStore = this.props.stores.userStore;
		return(
			<View style={styles.container}>
			<TextInput
					style={styles.textInput}
					autoCapitalize='none'
					placeholder={userStore.placeholders.search}
					placeholderTextColor='white'
					selectionColor='white'
					inlineImageLeft='search_icon'
					inlineImagePadding={5}
					onChangeText={(text)=>{
						userStore.setFriendSearch(text);
						userStore.search(this.props.name)}}
					value={userStore.friendSearch}/> 
			</View>)
		}
	}
))
const styles = StyleSheet.create( {
	container:{
		marginTop: 10,
		marginLeft:10,
		marginRight:10
	},
	textInput:{
		fontSize:15,
		borderRadius: 50,
		paddingRight:10,
		color:'white',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor:'rgba(255,255,255,.1)'
	}
} )
export default CustomSearchBar