import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { observable, toJS } from "mobx";

import User from "./../../components/users/users";
import Messages from "./../../components/messages/messages";
import Rooms from "./../../components/rooms/rooms";

import io from "socket.io-client";

import {
	Wrapper,
	AccountRow,
	UserAvatar,
	ChatGrid,
	UsersGrid,
	MessagesGrid,
	RoomsGrid,
	ChatSectionWrapper
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


	render() {
		return (
			<Wrapper>
				<AccountRow
					onClick={() => {
						this.loginRegisterStore.logOut();
					}}
					style={{ color: "red" }}
				>
					<UserAvatar
						src={`http://localhost:6464/chatroom/v1/img/${
							this.loginRegisterStore.userAvatar
						}`}
					/>
					{this.loginRegisterStore.username}

					
				</AccountRow>

				<ChatSectionWrapper>
					<ChatGrid container>
						<UsersGrid item xl={3} lg={3} md={3} sm={3} xs={3}>
							<User />
						</UsersGrid>
						<MessagesGrid item xl={6} lg={6} md={6} sm={6} xs={6}>
							<Messages
								username={this.loginRegisterStore.username}
								socket={socket}
							/>
							b
						</MessagesGrid>
						<RoomsGrid item xl={3} lg={3} md={3} sm={3} xs={3}>
							
							<Rooms
								defaultRooms={this.loginRegisterStore.joinedRooms}
								customTheme={customTheme}
							/>
							c
						</RoomsGrid>
					</ChatGrid>
				</ChatSectionWrapper>
			</Wrapper>
		);
	}
}

export default Chatroom;
