import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { observable } from "mobx";

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

@inject("stores")
@observer
class Chatroom extends Component {
	@observable
	loginRegisterStore = this.props.stores.loginRegister;

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
					Account
					{/* <img
					src={`http://localhost:6464/chatroom/v1/img/${
						this.loginRegisterStore.userAvatar
					}`}
				/> */}
				</AccountRow>

				<ChatSectionWrapper>
					<ChatGrid container >
						<UsersGrid item xl={3} lg={3} md={3} sm={3} xs={3}>
							a
						</UsersGrid>
						<MessagesGrid item xl={6} lg={6} md={6} sm={6} xs={6}>
							b
						</MessagesGrid>
						<RoomsGrid item xl={3} lg={3} md={3} sm={3} xs={3}>
							c
						</RoomsGrid>
					</ChatGrid>
				</ChatSectionWrapper>
			</Wrapper>
		);
	}
}

export default Chatroom;