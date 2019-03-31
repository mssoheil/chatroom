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
	
	@observable
	store = this.props.stores.rooms;

	@observable
	loginRegisterStore = this.props.stores.loginRegister;

	componentDidMount = () => {
		this.store.fetchRooms();
	};

	

	componentWillUnmount() {
		this.store.clearData();
	}

	handleChange = event => {
		this.store.changeSelectedJoinRoom(event.target.value);
		//this.setState({ [event.target.name]: event.target.value });
	};

	handleClose = () => {
		this.store.changeOpenDropDown(false);
	};

	handleOpen = () => {
		this.store.changeOpenDropDown(true);
	};

	render() {
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
					onChange={this.handleChange}
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
						return <div key={`room_${item["_id"]}`}>{item.name}</div>;
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
