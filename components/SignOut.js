import React from 'react';

export default class SignOut extends React.Component {
	render() {
		return ( this.props.navigation.navigate( 'SignUp' ) )
	}
}
