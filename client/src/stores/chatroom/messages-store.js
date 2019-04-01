import { observable, action } from "mobx";

export default class Message {
	@observable
	message = "";

	@observable
	messages = [];

	@action
	clearData() {
		this.message = "";
		this.messages = [];
	}

	@action
	changeMessage(event) {
		this.message = event.target.value;
	}

	@action
	changeMessages(packet) {

		this.messages.push(packet);
	}

	@action
	sendMessage(socket, username, room) {
		socket.emit("chatMessage", {
			username: username,
			message: this.message,
			room: room
		});
		this.message = "";
	}
}
