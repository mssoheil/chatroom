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
		this.state = {
			age: "",
			open: false
		};
	}
	@observable
	store = this.props.stores.rooms;

	@observable
	loginRegisterStore = this.props.stores.loginRegister;

	componentDidMount = () => {
		this.store.fetchRooms();
	}
	
	componentWillReceiveProps() {
		this.store.joinRoom(this.props.defaultRooms);

	}


	componentWillUnmount() {
		this.store.clearData();
	}

	handleChange = event => {
		//this.setState({ [event.target.name]: event.target.value });
		console.log(event.target.value);
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	handleOpen = () => {
		this.setState({ open: true });
	};

	render() {
		return (
			<Wrapper>
				<HeaderTxt onClick={this.handleOpen}>
					Rooms <i className=" icon-angle-down" />
				</HeaderTxt>
				<Select
					style={{ visibility: "hidden" }}
					open={this.state.open}
					onClose={this.handleClose}
					onOpen={this.handleOpen}
					value={this.state.age}
					onChange={this.handleChange}
					MenuProps={MenuProps}
					
				>
					{this.store.rooms.map(item => {
						return (
							<MenuItem key={`room_${item["_id"]}`} value={item.name}>
								{item.name}
							</MenuItem>
						);
					})}
				</Select>
				<RoomsContainer>
					{/* {this.store.joinedRooms.map(item => {
						return <div key={`room_${item["_id"]}`}>{item.name}</div>;
					})} */}
					{this.props.defaultRooms.map(item => {
						return <div>{item.name}</div>
					}) }
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
