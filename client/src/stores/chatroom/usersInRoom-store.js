import { observable, action } from "mobx";

import { toast } from "react-toastify";

import store from "./../index";

export default class UsersInRoom {
	@observable
	loginRegisterStore = store.loginRegister;

	@observable
	chatroomStore = store.chatroom;

	@observable
	roomsStore = store.rooms;

	@observable
	username = "";

	@observable
	usersPerRoom = [];

	@action
	clearData() {
		this.usersPerRoom = [];
	}

	@action
	privateMessage(val, socket) {
		if (val.username !== this.username) {
			let currentUser;
			this.usersPerRoom.map(item => {
				if (item.username === this.username) {
					return (currentUser = {
						username: this.username,
						socketId: item.socketId
					});
				}
				return currentUser;
			});

			let connectedUsersCount = 0;

			this.chatroomStore.connectedUsers.map((item, index) => {
				if (item.username === val.username) {
					return connectedUsersCount++;
				}
				return connectedUsersCount;
			});

			if (connectedUsersCount <= 0) {
				toast.info("Wait so the user accept your private request", {
					position: toast.POSITION.TOP_RIGHT
				});

				socket.emit("privateMessage", {
					from: currentUser,
					to: { socketId: val.socketId, username: val.username }
				});
			} else {
				toast.error("Already connected to user", {
					position: toast.POSITION.TOP_RIGHT
				});
			}
		}
	}

	@action
	changeUsername(val, socket) {
		this.username = val;
		socket.on("getSocketUsername", packet => {
			return socket.emit("receiveUsername", {
				socketId: packet,
				username: this.username,
				avatar: this.loginRegisterStore.userAvatar
			});
		});

		socket.on("socketsInRoom", packet => {
			if (this.roomsStore.visibleRoom.name === packet.room.name) {
				let entitiesArr = [];
				let entities = Object.entries(packet.sockets);
				entities.map(item => {
					return entitiesArr.push({
						room: packet.room,
						socketId: item[1].socketId,
						username: item[1].username,
						avatar: item[1].avatar
					});
				});

				this.usersPerRoom = entitiesArr;
			}
		});
	}
}
