import { observable, action } from "mobx";

import store from "./../index";

export default class Chatroom {
	@observable
	loginRegisterStore = store.loginRegister;

	@observable
	roomsStore = store.rooms;

	@observable
	connectedUsers = [];

	@observable
	isProfile = false;

	@observable
	selectedSetting = "";

	@observable
	isPrivate = false;

	@observable
	openSettingDropDown = false;

	@action
	changeIsPrivate(val) {
		this.isPrivate = val;
	}

	@action
	changeIsProfile(val) {
		this.isProfile = val;
	}

	@action
	changeSetting(val) {
		if (val === "logOut") {
			this.loginRegisterStore.logOut();
		} else {
			this.changeIsProfile(true);
		}
	}

	@action
	changeOpenSettingDropDown(val) {
		this.openSettingDropDown = val;
	}

	@action
	confirmConnect(packet, socket) {
		socket.emit("confirmedPrivate", { to: packet.to, from: packet.from });

		this.connectedUsers.push(packet.from);
		this.changeIsPrivate(true);
		this.roomsStore.changeVisiblePrivate(packet.from);
	}

	@action
	clearData() {
		this.connectedUsers = [];
	}

	@action
	confirmedPrivateRequest(packet, socket) {
		this.connectedUsers.push(packet.to);
		this.changeIsPrivate(true);
		this.roomsStore.changeVisiblePrivate(packet.to);
	}

	@action
	refusedConnect(packet, socket) {
		socket.emit("refusedPrivate", { to: packet.to, from: packet.from });
	}
}
