import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { observable } from "mobx";

import User from "./../../components/users/users";
import Messages from "./../../components/messages/messages";
import Rooms from "./../../components/rooms/rooms";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

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
} from "./chatroom-page-styled";

import customTheme from "../../config/theme";

const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: 200,
			minHeight: 100,
			width: 200
		}
	}
};

@inject("stores")
@observer
class ChatroomPage extends Component {
	constructor(props) {
		super(props);
		this.socket = io("http://localhost:6464");
	}

	@observable
	loginRegisterStore = this.props.stores.loginRegister;

	@observable
	store = this.props.stores.chatroom;

	componentWillUnmount() {
		this.socket.emit("disconnected", {
			username: this.loginRegisterStore.username,
			connectedUsers: this.store.connectedUsers
		});
		this.store.clearData();
	}

	handleChangeSetting(event, username) {
		this.store.changeSetting(event.target.value, username);
	}

	handleCloseSetting = () => {
		this.store.changeOpenSettingDropDown(false);
	};

	handleOpenSetting = () => {
		this.store.changeOpenSettingDropDown(true);
	};

	render() {
		return (
			<Wrapper>
				<AccountRow>
					<UserAvatar
						src={`http://localhost:6464/chatroom/v1/img/${
							this.loginRegisterStore.userAvatar
						}`}
					/>
					<Username
						onClick={this.handleOpenSetting}
						textColor={customTheme.color.textGray}
					>
						{this.loginRegisterStore.username}
						<i className=" icon-angle-down" />
					</Username>
					<Select
						style={{
							visibility: "hidden",
							position: "relative",
							top: "50px",
							right: "70px"
						}}
						open={this.store.openSettingDropDown}
						onClose={this.handleCloseSetting}
						onOpen={this.handleOpenSetting}
						value={this.store.selectedSetting}
						onChange={e => {
							this.handleChangeSetting(e);
						}}
						MenuProps={MenuProps}
					>
						<MenuItem value={"editProfile"}>Edit profile</MenuItem>
						<MenuItem value={"logOut"}>
							<i className="demo-icon icon-logout" /> Logout
						</MenuItem>
					</Select>
				</AccountRow>

				<ChatSectionWrapper>
					<ChatGrid container>
						<UsersGrid item xl={3} lg={3} md={3} sm={6} xs={12}>
							<User
								username={this.loginRegisterStore.username}
								socket={this.socket}
								customTheme={customTheme}
							/>
						</UsersGrid>
						<MessagesGrid item xl={6} lg={6} md={6} sm={12} xs={12}>
							<Messages
								username={this.loginRegisterStore.username}
								socket={this.socket}
								customTheme={customTheme}
							/>
						</MessagesGrid>
						<RoomsGrid item xl={3} lg={3} md={3} sm={6} xs={12}>
							<Rooms
								defaultRooms={this.loginRegisterStore.joinedRooms}
								customTheme={customTheme}
								socket={this.socket}
								username={this.loginRegisterStore.username}
							/>
						</RoomsGrid>
					</ChatGrid>
				</ChatSectionWrapper>
			</Wrapper>
		);
	}
}

export default ChatroomPage;
