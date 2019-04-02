import { confirmAlert } from "react-confirm-alert";

import store from "./../index";

import { observable, action } from "mobx";

import { toast } from "react-toastify";

class Message {
	@observable
	chatRoomStore = store.chatroom;

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
	requestedPrivate(packet, socket) {
		confirmAlert({
			title: "Confirm to connect",
			message: packet.message,
			buttons: [
				{
					label: "Yes",
					onClick: () => this.chatRoomStore.confirmConnect(packet, socket)
				},
				{
					label: "No",
					onClick: () => this.chatRoomStore.refusedConnect(packet, socket)
				}
			]
		});
	}
	
	@action
	refusedPrivateChat(packet, socket) {
		toast.error(packet.message, {
			position: toast.POSITION.TOP_RIGHT
		});
	}

	@action
	confirmedPrivateChat(packet, socket) {
		toast.success(packet.message, {
			position: toast.POSITION.TOP_RIGHT
		});
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
	receivedPrivateMessage(packet, socket) {
		console.log("PRIVATA", packet);

		this.requestedPrivate(packet, socket);
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

export default Message;
