import { observable, action } from "mobx";

import axiousFetch from "./../../config/database/fetch";

export default class LoginRegister {
	@observable
	rooms = [];

	@observable
	message = "";

	@observable
	messages = [];

	@observable
	roomName = "";

	@action
	changeRooms(val) {
		this.rooms = val;
	}

	@action
	clearData() {
		this.rooms = [];
		this.roomName = "";
		this.message = "";
		this.messages = [];
	}

	@action
	changeMessage(val) {
		this.message = val;
	}

	@action
	changeRoom(e) {
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
	async fetchRooms() {
		const header = {
			"Content-Type": "application/json"
		};
		await axiousFetch
			.get("rooms", "v1", header)
			.then(response => {
				if (response !== null || response !== undefined) {
					if (response.roomExist !== null || response.roomExist !== undefined) {
						this.changeRooms(response.rooms);
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
