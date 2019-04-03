import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { observable } from "mobx";

import User from "./../../components/users/users";
import Messages from "./../../components/messages/messages";
import Rooms from "./../../components/rooms/rooms";

import "react-confirm-alert/src/react-confirm-alert.css";

import io from "socket.io-client";

import {
	Wrapper,
	AccountRow,
	UserAvatar,
	ChatGrid,
	UsersGrid,
	MessagesGrid,
	RoomsGrid,
	ChatSectionWrapper,
	Username
} from "./chatroom-styled";

import customTheme from "../../config/theme";

const socket = io("http://localhost:6464");

@inject("stores")
@observer
class Chatroom extends Component {
	@observable
	loginRegisterStore = this.props.stores.loginRegister;

	@observable
	store = this.props.stores.chatroom;

	componentWillUnmount() {
		this.store.clearData();
	}

	render() {
		return (
			<Wrapper>
				<AccountRow>
					<UserAvatar
						onClick={() => {
							this.loginRegisterStore.logOut();
						}}
						src={`http://localhost:6464/chatroom/v1/img/${
							this.loginRegisterStore.userAvatar
						}`}
					/>
					<Username textColor={customTheme.color.textGray}>
						{this.loginRegisterStore.username}
					</Username>
				</AccountRow>

				<ChatSectionWrapper>
					<ChatGrid container>
						<UsersGrid item xl={3} lg={3} md={3} sm={6} xs={12}>
							<User
								username={this.loginRegisterStore.username}
								socket={socket}
								customTheme={customTheme}
							/>
						</UsersGrid>
						<MessagesGrid item xl={6} lg={6} md={6} sm={12} xs={12}>
							<Messages
								username={this.loginRegisterStore.username}
								socket={socket}
								customTheme={customTheme}
							/>
						</MessagesGrid>
						<RoomsGrid item xl={3} lg={3} md={3} sm={6} xs={12}>
							<Rooms
								defaultRooms={this.loginRegisterStore.joinedRooms}
								customTheme={customTheme}
								socket={socket}
								username={this.loginRegisterStore.username}
							/>
						</RoomsGrid>
					</ChatGrid>
				</ChatSectionWrapper>
			</Wrapper>
		);
	}
}

export default Chatroom;
