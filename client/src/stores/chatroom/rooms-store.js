import { observable, action, toJS } from "mobx";

import axiousFetch from "./../../config/database/fetch";

export default class Rooms {
	@observable
	rooms = [];

	@observable
	openDropDown = false;

	@observable
	selectedJoinRoom = "";

	@observable
	defaultRooms = [];

	@observable
	roomName = "";

	@observable
	joinedRooms = [];

	@action
	changeDefaultRooms(val) {
		this.defaultRooms = val;
		this.joinedRooms = val;
	}

	@action
	changeRoomsArr(val) {
		this.rooms = val;
	}

	@action
	changeSelectedJoinRoom(val) {
		this.selectedJoinRoom = val;
		let foundItems = 0;
		this.joinedRooms.map(item => {
			if (item["_id"] === val["_id"]) {
				foundItems++;
			}
		});

		if (foundItems === 0) {
		this.joinRoom(val);
		}
	}

	@action
	changeOpenDropDown(val) {
		this.openDropDown = val;
	}

	@action
	clearData() {
		this.rooms = [];
		this.roomName = "";
		this.joinedRooms = [];
	}

	@action
	changeRoomField(e) {
		if (e.key === "Enter") {
			if (this.roomName !== "") {
				this.createRoom(e.target.value);
				this.roomName = "";
			}
		} else {
			this.roomName = e.target.value;
		}
	}

	@action
	joinRoom(val) {
		var joinedRooms = this.joinedRooms;
		this.joinedRooms = [this.joinedRooms, val];
		this.joinedRooms = [...joinedRooms, val];
	}

	@action
	async fetchRooms() {
		const header = {
			"Content-Type": "application/json"
		};
		await axiousFetch
			.get("rooms", "v1", header)
			.then(response => {
				if (response !== null || response !== undefined) {
					if (response.roomExist !== null || response.roomExist !== undefined) {
						this.changeDefaultRooms(response.defaultRooms);
						this.changeRoomsArr(response.rooms);
					}
				}
			})
			.catch(err => {
				console.log(err);
			});
	}

	@action
	async createRoom() {
		const header = {
			"Content-Type": "application/json"
		};
		const body = {
			name: this.roomName
		};
		await axiousFetch
			.post("rooms", "v1", header, body)
			.then(response => {
				if (response !== null || response !== undefined) {
					if (response.roomExist !== null || response.roomExist !== undefined) {
						this.fetchRooms();
					}
				}
			})
			.catch(err => {
				console.log(err);
			});
	}
}
