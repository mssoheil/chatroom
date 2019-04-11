import { observable, action } from "mobx";

import store from "./../index";

import axiousFetch from "./../../config/database/fetch";

import { toast } from "react-toastify";

export default class Rooms {
	@observable
	chatRoomStore = store.chatroom;

	@observable
	usersStore = store.usersInRoom;

	@observable
	messagesStore = store.messages;

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
	visiblePrivate = "";

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
			return currentUser;
		});

		socket.emit("leftPrivate", {
			currentUser: currentUser,
			otherUser: val
		});
		this.chatRoomStore.connectedUsers.map((item, index) => {
			if (item.username === val.username) {
				return this.chatRoomStore.connectedUsers.splice(index, 1);
			}
			return this.chatRoomStore.connectedUsers;
		});
	}

	@action
	changeSelectedJoinRoom(val, socket, username) {
		this.selectedJoinRoom = val;
		let foundItems = 0;
		this.joinedRooms.map(item => {
			if (item["_id"] === val["_id"]) {
				return foundItems++;
			}
			return foundItems;
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
			return resolve("done");
		});
		promise.then(result => {
			socket.emit("getJoinedRooms", {
				username: username,
				room: val
			});
			socket.on("joinedRooms", packet => {
				this.joinedRooms = packet;
			});
			return null;
		});
	}

	@action
	switchToPrivate(val, socket) {
		this.chatRoomStore.changeIsPrivate(true);
		this.changeVisiblePrivate(val);
	}

	@action
	changeVisibleRoom(item, socket) {
		this.chatRoomStore.changeIsPrivate(false);
		this.visibleRoom = item;

		socket.emit("receiveUsernameRoomSwitch", {
			username: this.username,
			room: this.visibleRoom
		});
	}

	@action
	changeVisiblePrivate(val) {
		this.visiblePrivate = val;
	}

	@action
	leaveRoom(val, socket, username) {
		if (val["_id"] !== this.defaultRooms[0]["_id"]) {
			var promise = new Promise((resolve, reject) => {
				socket.emit("leaveRoom", {
					username: username,
					room: val
				});

				this.messagesStore.messages.map((item, index) => {
					if (item.room["_id"] === val["_id"]) {
						return this.messagesStore.messages.splice(index, 1);
					}
					return this.messagesStore.messages;
				});

				if (this.visibleRoom["_id"] === val["_id"]) {
					this.visibleRoom = this.defaultRooms[0];
				}
				return resolve("done");
			});
			promise.then(result => {
				socket.emit("getJoinedRooms", {
					username: username,
					room: val
				});
				socket.on("joinedRooms", packet => {
					return (this.joinedRooms = packet);
				});
			});
		} else {
			toast.error(`Can't leave ${val.name} room`, {
				position: toast.POSITION.TOP_RIGHT
			});
		}
	}

	@action
	fetchDefaultJoinedRooms(socket) {
		socket.on("defaultJoinedRooms", packet => {
			this.joinedRooms = packet;
			this.changeDefaultRooms(packet);
		});
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
						return this.changeRoomsArr(response.rooms);
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
							return toast.error(response.message, {
								position: toast.POSITION.TOP_RIGHT
							});
						} else {
							return toast.success(response.message, {
								position: toast.POSITION.TOP_RIGHT
							});
						}
					}
				}
			})
			.catch(err => {
				return toast.error("Room already exists", {
					position: toast.POSITION.TOP_RIGHT
				});
			});
	}
}
