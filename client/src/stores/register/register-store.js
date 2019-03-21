import { observable, action } from "mobx";

import { toast } from "react-toastify";

import store from "./../index";

import axiousFetch from "./../../config/database/fetch";
import api from "./../../config/database/api";
import Reactotron from "reactotron-react-js";

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
	async registerUser() {
		const header = {
			"Content-Type": "application/json"
		};
		const body = {
			email: this.email,
			password: this.password
		};

		if (this.email !== "" && this.password !== "") {
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
						}
					});
			}
		} else {
			toast.error("email and password can't be empty", {
				position: toast.POSITION.TOP_RIGHT
			});
		}
	}
}
