import { observable, action } from "mobx";

//import api from "./../../config";
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
		axiousFetch.get("register", "v1");

	}
}
