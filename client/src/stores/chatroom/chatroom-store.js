import { observable, action } from "mobx";

export default class Chatroom {
	@observable
	connectedUsers = [];

	@observable
	isProfile = false;

	@observable
	isPrivate = false;

	@action
	changeIsPrivate(val) {
		this.isPrivate = val;
	}

	@action
	confirmConnect(packet, socket) {
		socket.emit("confirmedPrivate", { to: packet.to, from: packet.from });

		this.connectedUsers.push(packet.from);
	}

	@action
	clearData() {
		this.connectedUsers = [];
	}

	@action
	confirmedPrivateRequest(packet, socket) {
		this.connectedUsers.push(packet.to);
	}

	@action
	refusedConnect(packet, socket) {
		socket.emit("refusedPrivate", { to: packet.to, from: packet.from });
	}
}
