import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { observable } from "mobx";

import { Wrapper, AccountRow, UserAvatar } from "./chatroom-styled";

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
					<UserAvatar src={`http://localhost:6464/chatroom/v1/img/${
						this.loginRegisterStore.userAvatar
					}`} />
					Account
					{/* <img
					src={`http://localhost:6464/chatroom/v1/img/${
						this.loginRegisterStore.userAvatar
					}`}
				/> */}
				</AccountRow>

				{/* <img
					src={`http://localhost:6464/chatroom/v1/img/${
						this.loginRegisterStore.userAvatar
					}`}
				/> */}
			</Wrapper>
		);
	}
}

export default Chatroom;
