import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { observable } from "mobx";

@inject("stores")
@observer
class Chatroom extends Component {
	@observable
	loginRegisterStore = this.props.stores.loginRegister;

	render() {
		return (
			<div
				onClick={() => {
					this.loginRegisterStore.logOut();
				}}
				style={{ color: "red", background: "white" }}
			>
				You are logged in {this.loginRegisterStore.userId}
			</div>
		);
	}
}

export default Chatroom;
