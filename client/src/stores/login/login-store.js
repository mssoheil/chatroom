import { observable, action } from "mobx";

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

	@observable
	rememberMe = false;

	@action
	toggleRememberMe(val) {
		
		this.rememberMe = !this.rememberMe;
		
	}
	changeRememberMe(val) {
		
		this.rememberMe = val;
		
	}
}
