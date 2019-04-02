import { observable, action, toJS } from "mobx";

export default class UsersInRoom {
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
		if(val.username !== this.username) {
			let currentUser;
			this.usersPerRoom.map(item => {
				if(item.username === this.username){
					return currentUser = {
						username: this.username, 
						socketId: item.socketId
					}
				}
			});

			socket.emit("privateMessage", {
				from: currentUser,
				to: {
					username: val.username,
					socketId: val.socketId
				}
			})

			console.log("private", val);
		}
	}

	@action
	changeUsername(val, socket) {
		this.username = val;
		socket.on("getSocketUsername", packet => {
			socket.emit("receiveUsername", {
				socketId: packet,
				username: this.username
			});
		});
		socket.on("socketsInRoom", packet => {
			console.log("MOON", packet);
			let entitiesArr = [];
			let entities = Object.entries(packet.sockets);
			entities.map(item => {
				entitiesArr.push({
					room: packet.room,
					socketId: item[0],
					username: item[1]
				});
			});

			this.usersPerRoom = entitiesArr;
		});
	}
}
