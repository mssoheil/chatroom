import React, { Component } from "react";

import {
	Wrapper,
	UsersContainer,
	UsersAvatar,
	UsersItem,
	UsersItemInnerWrapper,
	UsersItemText
} from "./users-styled";

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

	componentDidMount() {
		this.store.changeUsername(this.props.username, this.socket);
	}

	componentWillReceiveProps = () => {
		this.store.changeUsername(this.props.username, this.socket);
	};

	componentWillUnmount() {
		this.store.clearData();
	}

	render() {
		const { customTheme } = this.props;
		return (
			<Wrapper>
				<UsersContainer>
					{this.store.usersPerRoom.map((item, index) => {
						return (
							<UsersItem key={`user_${item.socketId}_${index}`}>
								{item.room["_id"] === this.roomsStore.visibleRoom["_id"] ? (
									<UsersItemInnerWrapper
										onClick={() => {
											this.store.privateMessage(item, this.socket);
										}}
									>
										<UsersAvatar
											textColor={customTheme.color.textGray}
											src={`http://localhost:6464/chatroom/v1/img/${
												item.avatar
											}`}
										/>
										<UsersItemText textColor={customTheme.color.textGray}>
											{item.username}
										</UsersItemText>
									</UsersItemInnerWrapper>
								) : null}
							</UsersItem>
						);
					})}
				</UsersContainer>
			</Wrapper>
		);
	}
}

export default Users;
