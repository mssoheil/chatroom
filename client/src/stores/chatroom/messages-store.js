import { confirmAlert } from "react-confirm-alert";

import store from "./../index";

import { observable, action } from "mobx";

import { toast } from "react-toastify";

class Message {
	@observable
	chatRoomStore = store.chatroom;

	@observable
	roomsStore = store.rooms;

	@observable
	usersStore = store.usersInRoom;

	@observable
	message = "";

	@observable
	messages = [];

	@observable
	privateMessages = [];

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
	leftPrivateChat(packet, socket) {
		this.chatRoomStore.connectedUsers.map((item, index) => {
			if (item.username === packet.currentUser.username) {
				return this.chatRoomStore.connectedUsers.splice(index, 1);
			}
			return this.chatRoomStore.connectedUsers;
		});
		toast.error(packet.message, {
			position: toast.POSITION.TOP_RIGHT
		});
	}

	@action
	confirmedPrivateChat(packet, socket) {
		this.chatRoomStore.confirmedPrivateRequest(packet, socket);
		toast.success(packet.message, {
			position: toast.POSITION.TOP_RIGHT
		});
	}

	@action
	changeMessage(event, socket, username) {
		if (event.key === "Enter") {
			if (this.message !== "") {
				if (this.chatRoomStore.isPrivate) {
					this.sendMessagePrivateMessage(
						socket,
						username,
						this.roomsStore.visiblePrivate
					);
				} else {
					this.sendMessage(socket, username, this.roomsStore.visibleRoom);
				}
			}
		} else {
			this.message = event.target.value;
		}
	}

	@action
	changeMessages(packet) {
		this.messages.push(packet);
	}

	@action
	changePrivateMessages(packet) {
		this.privateMessages.push({
			from: packet.from,
			to: packet.to,
			time: packet.time,
			message: packet.message
		});
	}

	@action
	receivedPrivateMessage(packet, socket) {
		this.requestedPrivate(packet, socket);
	}

	@action
	sendMessagePrivateMessage(socket, username, privateChat) {
		if (this.message !== "") {
			let currentUser;
			this.usersStore.usersPerRoom.map(item => {
				if (item.username === this.usersStore.username) {
					return (currentUser = {
						username: this.usersStore.username,
						socketId: item.socketId
					});
				}
				return currentUser;
			});
			socket.emit("sendPrivateMessage", {
				message: this.message,
				from: currentUser,
				to: this.roomsStore.visiblePrivate
			});
			this.message = "";
		}
	}

	@action
	receivedPrivateMessageContent(packet, socket) {
		this.changePrivateMessages(packet);
	}

	@action
	sendMessage(socket, username, room) {
		if (this.message !== "") {
			socket.emit("chatMessage", {
				username: username,
				message: this.message,
				room: room
			});
			this.message = "";
		}
	}
}

export default Message;
