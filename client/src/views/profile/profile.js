import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { observable } from "mobx";

import "react-confirm-alert/src/react-confirm-alert.css";

import { Wrapper } from "./chatroom-styled";

@inject("stores")
@observer
class Profile extends Component {
	@observable
	store = this.props.stores.chatroom;

	render() {
		return <Wrapper>Profile</Wrapper>;
	}
}

export default Profile;
