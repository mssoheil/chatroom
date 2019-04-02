import { observable, action, toJS } from "mobx";

import store from "./../index";

import axiousFetch from "./../../config/database/fetch";

import { toast } from "react-toastify";

export default class Rooms {
	@observable
	chatRoomStore = store.chatroom;

	@observable
	usersStore = store.usersInRoom;

	@observable
	rooms = [];

	@observable
	privateChats = [];

	@observable
	username = "";

	@observable
	openDropDown = false;

	@observable
	visibleRoom = "";

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
		this.visibleRoom = val[0];
	}

	@action
	changeUsername(val) {
		this.username = val;
	}

	@action
	changeRoomsArr(val) {
		this.rooms = val;
	}

	@action
	leavePrivate(val, socket) {
		let currentUser;
		this.usersStore.usersPerRoom.map(item => {
			if (item.username === this.username) {
				return (currentUser = {
					username: this.username,
					socketId: item.socketId
				});
			}
		});

		socket.emit("leftPrivate", {
			currentUser: currentUser,
			otherUser: val
		});
		this.chatRoomStore.connectedUsers.map((item, index) => {
			if (item.username === val.username) {
				return this.chatRoomStore.connectedUsers.splice(index, 1);
			}
		});
		
	}

	@action
	changeSelectedJoinRoom(val, socket, username) {
		this.selectedJoinRoom = val;
		let foundItems = 0;
		this.joinedRooms.map(item => {
			if (item["_id"] === val["_id"]) {
				foundItems++;
			}
		});

		if (foundItems === 0) {
			this.joinRoom(val, socket, username);
		} else {
			toast.error("You already joined the room", {
				position: toast.POSITION.TOP_RIGHT
			});
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
	async joinRoom(val, socket, username) {
		var promise = new Promise((resolve, reject) => {
			socket.emit("joinRoom", {
				username: username,
				room: val
			});
			resolve("done");
		});
		promise.then(result => {
			socket.emit("getJoinedRooms", {
				username: username,
				room: val
			});
			socket.on("joinedRooms", packet => {
				this.joinedRooms = packet;
			});
		});
	}

	@action
	changeVisibleRoom(item, socket) {
		this.visibleRoom = item;
		socket.emit("receiveUsernameRoomSwitch", {
			username: this.username,
			room: this.visibleRoom
		});
	}

	@action
	leaveRoom(val, socket, username) {
		var promise = new Promise((resolve, reject) => {
			socket.emit("leaveRoom", {
				username: username,
				room: val
			});
			resolve("done");
		});
		promise.then(result => {
			socket.emit("getJoinedRooms", {
				username: username,
				room: val
			});
			socket.on("joinedRooms", packet => {
				this.joinedRooms = packet;
			});
		});
	}

	@action
	fetchDefaultJoinedRooms(socket) {
		socket.on("defaultJoinedRooms", packet => {
			this.joinedRooms = packet;
			this.changeDefaultRooms(packet);
		});
		// socket.on("requestUsername", packet => {
		// 	socket.emit("responeUsername", {username: username})
		// });
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
						if (response.roomExist) {
							toast.error(response.message, {
								position: toast.POSITION.TOP_RIGHT
							});
						} else {
							toast.success(response.message, {
								position: toast.POSITION.TOP_RIGHT
							});
						}
					}
					//this.fetchRooms();
				}
			})
			.catch(err => {
				toast.error("Room already exists", {
					position: toast.POSITION.TOP_RIGHT
				});
			});
	}
}
