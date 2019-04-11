import { observable, action } from "mobx";

import axiousFetch from "./../../config/database/fetch";

export default class LoginRegister {
	@observable
	loginMode = true;
	@observable
	token = "";

	@observable
	username;

	@observable
	userId;

	@observable
	userAvatar;

	@observable
	userGender;

	@observable
	authenticated = false;

	@observable
	started = false;

	/** actions */
	@action
	changeLoginMode() {
		this.loginMode = !this.loginMode;
	}


	@action
	changeAuthenticated(val) {
		this.authenticated = val;
	}

	@action
	changeToken(val) {
		this.token = val;
	}
	getSocketUsername
	@action
	changeStarted(state) {
		this.started = state;
	}

	@action
	logOut() {
		
		this.changeAuthenticated(false);
		localStorage.removeItem("token");
		sessionStorage.removeItem("token");
	}

	@action
	checkAuth() {
		
		var session = sessionStorage.token;
		var local = localStorage.token;

		if (
			(session === "" || session === null || session === undefined) &&
			(local === "" || local === null || local === undefined)
		) {
			this.changeAuthenticated(false);
		} else {
			const header = {
				"Content-Type": "application/json",
				"x-access-token": session || local || ""
			};

			axiousFetch
				.get("authentication", "v1", header)
				.then(response => {
					if (response !== null || response !== undefined) {
						if (response.auth !== null || response.auth !== undefined) {
							this.changeAuthenticated(response.auth);
							this.username = response.user.username;
							this.userId = response.user["_id"];
							this.userAvatar = response.user.avatar;
							this.userGender = response.user.gender;
							

						}
					}
				})
				.catch(err => {
					console.log(err);
					this.changeAuthenticated(false);
				});
		}
	}
}
