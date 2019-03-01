import React, { Component } from "react";

import { observable, action, computed } from "mobx";

export default class LoginRegister {
	@observable
	loginMode = true;

	/** actions */
	@action
	changeLoginMode() {
		this.loginMode = !this.loginMode;
	}

	@observable
	isSignedIn = false;

	@observable
	started = false;

	@action
	changeStarted(state) {
		this.started = state;
	}
}