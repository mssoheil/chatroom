import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { observable } from "mobx";

import ChatroomPage from "./chatroom-page";
import ProfilePage from "./../profile/profile";

import "react-confirm-alert/src/react-confirm-alert.css";

import { Wrapper } from "./chatroom-styled";


@inject("stores")
@observer
class Chatroom extends Component {
	
	@observable
	store = this.props.stores.chatroom;

	

	

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
