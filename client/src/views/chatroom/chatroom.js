import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { observable } from "mobx";

import ChatroomPage from "./chatroom-page";
import ProfilePage from "./../profile/profile";

import "react-confirm-alert/src/react-confirm-alert.css";

import { Wrapper } from "./chatroom-styled";

import io from "socket.io-client";

@inject("stores")
@observer
class Chatroom extends Component {
	// constructor(props) {
	// 	super(props);
	// 	this.socket = io("http://localhost:6464");
	// }
	@observable
	store = this.props.stores.chatroom;

	// componentDidMount() {
	// 	this.socket = io("http://localhost:6464");
	// }

	render() {
		return (
			<Wrapper>
				{this.store.isProfile ? (
					<ProfilePage />
				) : (
					<ChatroomPage />
				)}
			</Wrapper>
		);
	}
}

export default Chatroom;
