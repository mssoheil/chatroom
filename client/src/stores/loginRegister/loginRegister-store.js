import { observable, action } from "mobx";

import axiousFetch from "./../../config/database/fetch";

export default class LoginRegister {
	@observable
	loginMode = true;

	@observable
	token = "";

	@observable
	userId;

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

			axiousFetch.get("authentication", "v1", header).then(response => {
				this.changeAuthenticated(response.auth);
				if (response.auth) {
					this.userId = response.user["_id"];
				}
			});
		}
	}
}
