import { observable, action } from "mobx";

export default class Chatroom {
	@observable
	connectedUsrs = [];

	@action
	confirmConnect(packet, socket) {
		socket.emit("confirmedPrivate", { to: packet.to, from: packet.from });

		this.connectedUsrs.push(packet.from);
	}

	@action
	clearData() {
		this.connectedUsrs = [];
	}

	@action
	refusedConnect(packet, socket) {
		socket.emit("refusedPrivate", { to: packet.to, from: packet.from });
	}
}
