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
	HeaderTxt
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
	loginRegisterStore = this.props.stores.loginRegister;

	componentWillMount = () => {
		this.store.fetchDefaultJoinedRooms(this.socket, this.user);
		this.store.fetchRooms();
	};
	// componentDidMount = () => {
	// 	this.store.fetchDefaultJoinedRooms(this.socket, this.user);
	// 	this.store.fetchRooms();
	// };

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
		//this.setState({ [event.target.name]: event.target.value });
	}

	handleClose = () => {
		this.store.changeOpenDropDown(false);
	};

	handleOpen = () => {
		this.store.changeOpenDropDown(true);
	};

	render() {
		const { username } = this.props;
		return (
			<Wrapper>
				<HeaderTxt onClick={this.handleOpen}>
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
					{this.store.joinedRooms.map(item => {
						return (
							<div
							style={{background: item["_id"] === this.store.visibleRoom["_id"] ? "#4cd964" : "#eee"}}
								key={`room_${item["_id"]}`}
								onClick={() => {
									this.store.changeVisibleRoom(item, this.socket);
								}}
							>
								{item.name}
								<button
									onClick={() => {
										this.store.leaveRoom(item, this.socket, username);
									}}
								>
									X
								</button>
							</div>
						);
					})}
				</RoomsContainer>
				<NewRoomContainer>
					<NewRoom
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
