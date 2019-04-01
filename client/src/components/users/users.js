import React, { Component } from "react";

import { Wrapper } from "./users-styled";

import { inject, observer } from "mobx-react";

import { observable } from "mobx";

@inject("stores")
@observer
class Users extends Component {
	constructor(props) {
		super(props);
		this.socket = this.props.socket;
		this.username = this.props.username;
	}

	@observable
	loginRegisterStore = this.props.stores.loginRegister;

	@observable
	store = this.props.stores.usersInRoom;

	@observable
	roomsStore = this.props.stores.rooms;

	componentWillReceiveProps = () => {
		this.store.changeUsername(this.props.username, this.socket);
	};

	componentWillUnmount() {
		this.store.clearData();
	}

	render() {
		return (
			<Wrapper>
				{this.store.usersPerRoom.map((item, index) => {
					return (
						<h4 key={`user_${item.socketId}_${index}`}>
							{item.room["_id"] === this.roomsStore.visibleRoom["_id"] ? (
								<span>{item.username}</span>
							) : null}
						</h4>
					);
				})}
			</Wrapper>
		);
	}
}

export default Users;
