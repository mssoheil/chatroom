import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { observable } from "mobx";

// import User from "./../../components/users/users";
// import Messages from "./../../components/messages/messages";
// import Rooms from "./../../components/rooms/rooms";

import ChatroomPage from "./chatroom-page";

import "react-confirm-alert/src/react-confirm-alert.css";

//import io from "socket.io-client";

import {
	Wrapper,
	
	ProfilePage
} from "./chatroom-styled";

// import customTheme from "../../config/theme";

// const socket = io("http://localhost:6464");

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
					<ChatroomPage>
						
					</ChatroomPage>
				)}
			</Wrapper>
		);
	}
}

export default Chatroom;
