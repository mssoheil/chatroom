import { observable, action, toJS } from "mobx";

import store from "./../index";

import axiousFetch from "./../../config/database/fetch";

import { toast } from "react-toastify";

export default class Profile {
	@observable
	chatroomStore = store.chatroom;

	@observable
	loginRegisterStore = store.loginRegister;

	@observable
	activatedChangePassword = false;

	@observable
	imageChanged = false;

	@observable
	imageName;

	@observable
	gender;

	@action
	activateChangePassword(event) {
		this.activatedChangePassword = event.target.checked;
	}

	@action
	changeDefaultGender(val) {
		this.gender = val;
	}

	@action
	changeGender(event) {
		this.gender = event.target.value;
	}

	@action
	async changeFile(event) {
		this.loginRegisterStore.checkAuth();

		let data = new FormData();
		if (
			(event.target.files !== undefined && event.target.files !== null,
			event.target.files !== "")
		) {
			data.append("imageFile", event.target.files[0]);
			const header = {};
			const body = data;
			axiousFetch
				.post("uploadImage", "v1", header, body)
				.then(response => {
					if (response !== undefined && response !== null) {
						if (response.success) {
							this.imageChanged = true;
							this.imageName = response.fileName;
							toast.success(response.message, {
								position: toast.POSITION.TOP_RIGHT
							});
						} else {
							toast.error(response.message, {
								position: toast.POSITION.TOP_RIGHT
							});
						}
					}
				})
				.catch(err => {
					console.log(err);
				});
		}
	}
}
