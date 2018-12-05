import React from "react";
import ChatUI from "react-native-chat-ui";
import { StyleSheet, Text, View } from 'react-native';

const messageData = [
	{
		id: 1,
		userId: 1,
		text: "Hello world",
		error: false,
		sending: false,
		createdAt: "2018-12-05 12:13:24",
	}, {
		id: 2,
		userId: 2,
		text: "Hello world",
		error: false,
		sending: false,
		createdAt: "2018-12-05 12:13:26",
	},
];

class MessagesList extends React.Component {
	state = {
		messages: []
	};

	componentDidMount = () => {
		this.getMessages();
	};

	getMessages = () => {
		this.setState( { messages: messageData } );
	};

	sendMessage = message => {
		this.setState( prevState => ( {
			messages: [
				message, ...prevState.messages,
			]
		} ) );
	};

	render() {
		const { messages } = this.state;

		return (
				<ChatUI
				messages={messages}
				user={{
					id: 1
				}}
				chatter={{id: 2}}
				style={{color:'purple'}}
				onSend={this.sendMessage}/>
			)
	}
}
const styles = StyleSheet.create( {
	container: {
		flex: 1,
	}
} )
export default MessagesList;
