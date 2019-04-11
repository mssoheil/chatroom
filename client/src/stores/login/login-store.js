import { observable, action } from "mobx";

import axiousFetch from "./../../config/database/fetch";

import { toast } from "react-toastify";

import store from "./../index";

export default class Login {
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

	@action
	clearFields() {
		this.changeEmail("");
		this.changePassword("");
	}

	@observable
	rememberMe = false;

	@action
	toggleRememberMe() {
		this.rememberMe = !this.rememberMe;
	}
	@action
	changeRememberMe(val) {
		this.rememberMe = val;
	}

	@action
	async loginUser() {
		const header = {
			"Content-Type": "application/json"
		};
		const body = {
			email: this.email,
			password: this.password
		};

		if (this.email !== "" && this.password !== "") {
			await axiousFetch
				.post("login", "v1", header, body, 3000)
				.then(response => {
					if (response.auth) {
						toast.success(response.message, {
							position: toast.POSITION.TOP_RIGHT
						});
						if (this.rememberMe) {
							localStorage.setItem("token", response.token);
							sessionStorage.removeItem("token");
						} else {
							sessionStorage.setItem("token", response.token);
							localStorage.removeItem("token");
						}
						store.loginRegister.changeAuthenticated(true);
						store.loginRegister.changeToken(response.token);
						this.clearFields();
					} else {
						toast.error("The user does not exist", {
							position: toast.POSITION.TOP_RIGHT
						});
						localStorage.removeItem("token");
						sessionStorage.removeItem("token");
					}
				})
				.catch(err => {
					toast.error("The user does not exist", {
						position: toast.POSITION.TOP_RIGHT
					});
					localStorage.removeItem("token");
					sessionStorage.removeItem("token");
				});
		} else {
			toast.error("email and password can't be empty", {
				position: toast.POSITION.TOP_RIGHT
			});
		}
	}
}
