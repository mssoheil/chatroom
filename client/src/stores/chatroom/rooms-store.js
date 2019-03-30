import { observable, action, toJS } from "mobx";

import axiousFetch from "./../../config/database/fetch";

export default class Rooms {
	@observable
	rooms = [];

	@observable
	roomName = "";

	@observable
	joinedRooms = [];

	@action
	changeRoomsArr(val) {
		this.rooms = val;
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
		this.joinedRooms = [...this.joinedRooms, ...val];
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
