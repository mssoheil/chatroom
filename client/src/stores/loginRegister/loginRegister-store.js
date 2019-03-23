import { observable, action } from "mobx";

export default class LoginRegister {
	@observable
	loginMode = true;

	

	@observable
	token;

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
}
