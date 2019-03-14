import { observable, action } from "mobx";

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
}
