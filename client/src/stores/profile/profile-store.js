import { observable, action } from "mobx";

import store from "./../index";

import axiousFetch from "./../../config/database/fetch";

import { toast } from "react-toastify";

export default class Profile {
	@observable
	chatroomStore = store.chatroom;

	@observable
	loginRegisterStore = store.loginRegister;

	@observable
	username = "";

	@observable
	usernameValidation = true;

	@observable
	password = "";

	@observable
	usernameError = "";

	@observable
	passwordNew = "";

	@observable
	activatedChangePassword = false;

	@observable
	imageChanged = false;

	@observable
	imageName = "";

	@observable
	gender = "";

	@action
	changeUsername(event) {
		this.username = event.target.value;
	}

	@action
	changePassword(event) {
		this.password = event.target.value;
	}

	@action
	changeUsernameValidation(val) {
		this.usernameValidation = val;
	}

	@action
	changeUsernameError(val) {
		this.usernameError = val;
	}

	@action
	checkUsernameValidation(e) {
		let header = {
			username: e.target.value
		};


		if (this.username !== this.loginRegisterStore.username) {
			axiousFetch
				.get("checkUsername", "v1", header)
				.then(response => {
					if (response !== undefined && response !== null) {
						if (response.success) {
							this.changeUsernameValidation(true);
						} else {
							this.changeUsernameValidation(false);
							this.changeUsernameError(response.message);
						}
					}
				})
				.catch(err => {
					console.log(err);
				});
		} else {
			this.changeUsernameValidation(true);
		}
	}

	@action
	async saveData() {
		const header = {};
		const body = {
			userId: this.loginRegisterStore.userId,
			changePassword: this.activatedChangePassword,
			data: {
				username: this.username,
				avatar: this.imageName
			}
		};

		if (this.imageChanged) {
			axiousFetch
				.put("changeProfile", "v1", header, body)
				.then(response => {
					if (response !== undefined && response !== null) {
						if (response.success) {
							this.loginRegisterStore.username = response.user.username;
							this.loginRegisterStore.userAvatar = response.user.avatar;
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
					toast.error(err.message, {
						position: toast.POSITION.TOP_RIGHT
					});
				});
		}

		this.chatroomStore.changeIsProfile(false);
	}

	@action
	cancelData() {
		this.chatroomStore.changeIsProfile(false);
	}

	@action
	clearData() {
		this.username = "";
		this.password = "";
		this.passwordNew = "";
		this.imageName = "";
	}

	@action
	changeNewPassword(event) {
		this.passwordNew = event.target.value;
	}

	@action
	activateChangePassword(event) {
		this.activatedChangePassword = event.target.checked;
	}

	@action
	changeDefaultGender(val) {
		this.gender = val;
	}

	@action
	changeDefaultUsername(val) {
		this.username = val;
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
