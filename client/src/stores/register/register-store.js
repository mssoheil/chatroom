import { observable, action } from "mobx";

import api from "./../../config/index";
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
	registerUser() {
		Reactotron.log(this.email, this.password, this.passwordConfirm);
	}
}
