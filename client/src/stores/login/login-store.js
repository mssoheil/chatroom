import React, { Component } from "react";

import { observable, action, computed } from "mobx";

export default class Login {
	@observable
	firstVal = false;
}
