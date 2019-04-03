import { observable, action, toJS } from "mobx";

import { toast } from "react-toastify";

import store from "./../index";

export default class UsersInRoom {
	@observable
	loginRegisterStore = store.loginRegister;

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
			});

			toast.info("Wait so the user accept your private request", {
				position: toast.POSITION.TOP_RIGHT
			});

			socket.emit("privateMessage", {
				from: currentUser,
				to: { socketId: val.socketId, username: val.username }
			});
		}
	}

	@action
	changeUsername(val, socket) {
		this.username = val;
		socket.on("getSocketUsername", packet => {
			socket.emit("receiveUsername", {
				socketId: packet,
				username: this.username,
				avatar: this.loginRegisterStore.userAvatar
			});
		});
		socket.on("socketsInRoom", packet => {
			let entitiesArr = [];
			let entities = Object.entries(packet.sockets);
			entities.map(item => {
				entitiesArr.push({
					room: packet.room,
					socketId: item[1].socketId,
					username: item[1].username,
					avatar: item[1].avatar
				});
			});

			this.usersPerRoom = entitiesArr;
		});
	}
}
