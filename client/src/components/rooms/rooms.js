import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { observable } from "mobx";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import {
	Wrapper,
	RoomsContainer,
	NewRoomContainer,
	NewRoom,
	HeaderTxt,
	RoomsHeaders,
	Divider,
	RoomItems,
	LeaveRoomButton,
	RoomItemText,
	RoomsItemsWrapper
} from "./rooms-styled";

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
class Rooms extends Component {
	constructor(props) {
		super(props);
		this.socket = this.props.socket;
		this.user = this.props.username;
	}

	@observable
	store = this.props.stores.rooms;

	@observable
	chatRoomStore = this.props.stores.chatroom;

	@observable
	loginRegisterStore = this.props.stores.loginRegister;

	

	componentWillMount = () => {
		this.store.fetchDefaultJoinedRooms(this.socket, this.user);
		this.store.fetchRooms();
	};

	componentDidUpdata() {
		this.store.fetchDefaultJoinedRooms(this.socket, this.props.username);
		this.store.fetchRooms();
	}

	componentWillUnmount() {
		this.socket.close();
		this.store.clearData();
	}
	componentWillReceiveProps() {
		this.store.changeUsername(this.props.username);
		this.store.fetchDefaultJoinedRooms(this.socket);
	}

	handleChange(event, username) {
		this.store.changeSelectedJoinRoom(
			event.target.value,
			this.socket,
			username
		);
	}

	handleClose = () => {
		this.store.changeOpenDropDown(false);
	};

	handleOpen = () => {
		this.store.changeOpenDropDown(true);
	};

	render() {
		const { username, customTheme } = this.props;
		return (
			<Wrapper>
				<HeaderTxt
					textColor={customTheme.color.textGray}
					onClick={this.handleOpen}
				>
					Rooms <i className=" icon-angle-down" />
				</HeaderTxt>
				<Select
					style={{ visibility: "hidden" }}
					open={this.store.openDropDown}
					onClose={this.handleClose}
					onOpen={this.handleOpen}
					value={this.store.selectedJoinRoom}
					onChange={e => {
						this.handleChange(e, username);
					}}
					MenuProps={MenuProps}
				>
					{this.store.rooms.map(item => {
						return (
							<MenuItem key={`room_${item["_id"]}`} value={item}>
								{item.name}
							</MenuItem>
						);
					})}
				</Select>
				<RoomsContainer>
					<RoomsHeaders textColor={customTheme.color.textGray}>
						Public rooms
						<Divider />
					</RoomsHeaders>
					<RoomsItemsWrapper>
						{this.store.joinedRooms.map(item => {
							return (
								<RoomItems
									textColor={
										item["_id"] === this.store.visibleRoom["_id"] &&
										!this.chatRoomStore.isPrivate
											? customTheme.color.primaryLight
											: "#eee"
									}
									fontWeight="bold"
									key={`room_${item["_id"]}`}
									onClick={() => {
										this.store.changeVisibleRoom(item, this.socket);
									}}
								>
									<RoomItemText>{item.name}</RoomItemText>

									<LeaveRoomButton
										textColor={
											item["_id"] === this.store.visibleRoom["_id"] &&
											!this.chatRoomStore.isPrivate
												? customTheme.color.primaryLight
												: customTheme.color.textGray
										}
										onClick={() => {
											this.store.leaveRoom(item, this.socket, username);
										}}
									>
										<i className="demo-icon icon-cancel" />
									</LeaveRoomButton>
								</RoomItems>
							);
						})}
					</RoomsItemsWrapper>
					<RoomsHeaders textColor={customTheme.color.textGray}>
						Private rooms
						<Divider />
					</RoomsHeaders>
					<RoomsItemsWrapper>
						{this.chatRoomStore.connectedUsers.map((item, index) => {
							return (
								<RoomItems
									textColor={
										item.username === this.store.visiblePrivate.username &&
										this.chatRoomStore.isPrivate
											? customTheme.color.primaryLight
											: "#eee"
									}
									fontWeight="bold"
									key={`private_${index}_${item.socketId}`}
									onClick={() => {
										this.store.switchToPrivate(item, this.socket);
									}}
								>
									<RoomItemText>{item.username}</RoomItemText>
									<LeaveRoomButton
										textColor={
											item.username === this.store.visiblePrivate.username &&
										this.chatRoomStore.isPrivate
												? customTheme.color.primaryLight
												: customTheme.color.textGray
										}
										onClick={() => {
											this.store.leavePrivate(item, this.socket);
										}}
									>
										<i className="demo-icon icon-cancel" />
									</LeaveRoomButton>
								</RoomItems>
							);
						})}
					</RoomsItemsWrapper>
				</RoomsContainer>
				<NewRoomContainer>
					<NewRoom textColor={customTheme.color.primary} placeholder="type room name to add"
						type="text"
						value={this.store.roomName}
						onChange={e => this.store.changeRoomField(e)}
						onKeyPress={e => this.store.changeRoomField(e)}
					/>
				</NewRoomContainer>
			</Wrapper>
		);
	}
}

export default Rooms;
