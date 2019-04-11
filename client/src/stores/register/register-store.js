import { observable, action } from "mobx";

import { toast } from "react-toastify";

import store from "./../index";

import axiousFetch from "./../../config/database/fetch";

export default class Register {
	@observable
	email = "";

	@action
	changeEmail(val) {
		this.email = val;
	}

	@observable
	password = "";

	@action
	changePassword(val) {
		this.password = val;
	}

	@observable
	passwordConfirm = "";

	@action
	changePasswordConfirm(val) {
		this.passwordConfirm = val;
	}

	@action
	clearFields() {
		this.changeEmail("");
		this.changePassword("");
		this.changePasswordConfirm("");
	}

	@action
	async registerUser() {
		const header = {
			"Content-Type": "application/json"
		};
		const body = {
			email: this.email,
			password: this.password
		};

		if (this.email !== "" && this.password !== "") {
			var emailPatt = new RegExp(
				/^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.)|(([a-zA-Z0-9-]+.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
			);
			var validation = emailPatt.test(this.email);
			if (validation) {
				if (
					this.password !== this.passwordConfirm ||
					this.passwordConfirm === ""
				) {
					toast.error("Password and Password confirm fields does not match", {
						position: toast.POSITION.TOP_RIGHT
					});
				} else if (this.password === this.passwordConfirm) {
					await axiousFetch
						.post("register", "v1", header, body, 3000)
						.then(response => {
							if (response.register) {
								toast.success(response.message, {
									position: toast.POSITION.TOP_RIGHT
								});
								store.loginRegister.changeLoginMode();
								this.clearFields();
							} else {
								toast.error(response.message, {
									position: toast.POSITION.TOP_RIGHT
								});
							}
						})
						.catch(err => {
							console.log(err);
						});
				}
			} else {
				toast.error("Enter valid email address", {
					position: toast.POSITION.TOP_RIGHT
				});
			}
		} else {
			toast.error("email and password can't be empty", {
				position: toast.POSITION.TOP_RIGHT
			});
		}
	}
}
