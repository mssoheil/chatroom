import { observable, action } from "mobx";

import axiousFetch from "./../../config/database/fetch";

import { toast } from "react-toastify";

import store from "./../index";

export default class Chatroom {
	@observable
	loginRegisterStore = store.loginRegister;

	@observable
	imageChanged = false;

	@observable
	connectedUsers = [];

	@observable
	imageName;

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
	async changeFile(event) {
		this.loginRegisterStore.checkAuth();

		let data = new FormData();
		if (
			(event.target.files !== undefined && event.target.files !== null,
			event.target.files !== "")
		) {
			console.log("FILE", event.target.files[0]);
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

	// 	@action
	//   async changeFile(info) {
	//     this.changeLoadingState(true);
	//     const apiUrl = new ApiUrl();
	//     var xm = info.target.files[0].name;
	//     var datax = new FormData();
	//     datax.append("imageFile", info.target.files[0]);
	//     datax.append("imageType", "PROVIDER_DOCS");

	//     fetch(apiUrl.getURL("login", "image", "v1", []), {
	//       method: "POST",
	//       headers: {
	//         userId: parseInt(this.hasCookieLoginId("lo4Jtkh"))
	//       },
	//       body: datax
	//     })
	//       .then(response => response.json())
	//       .then(data => {
	//         this.uploadFilesChange(data.id);
	//       })
	//       .then(() => {
	//         toast.success(`فایل با موفقیت آپلود شد : ${xm}`, {
	//           position: toast.POSITION.TOP_CENTER
	//         });
	//       })
	//       .then(() => this.changeLoadingState(false))
	//       .catch(() => {
	//         toast.success("آپلود ناموفق", {
	//           position: toast.POSITION.TOP_CENTER
	//         });
	//         this.changeLoadingState(false);
	//       });
	//   }

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
