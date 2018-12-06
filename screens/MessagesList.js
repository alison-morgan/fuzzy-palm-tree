import React from "react";
import { StyleSheet, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
//future messages list component
class MessagesList extends React.Component {
	render() {

		return (<LinearGradient
				colors={['#091540', '#880D1E']}
				start={{x:0, y:1}} 
				end={{x:1.5, y:0}}
				style={styles.container}>
					<Text style={styles.text}>This feature comming soon...</Text>
				</LinearGradient>
			)
	}
}
const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  alignItems: 'center',
	  justifyContent:'center',
	},
	text: {
	  fontSize: 50,
	  textAlign:'center',
	  fontFamily:'GreatVibes-Regular',
	  color:'white',
	}
  })
export default MessagesList;
