import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { observable } from "mobx";
import Login from "./../components/login/login";
import Register from "./../components/register/register";
import { Wrapper } from "./loginRegister-styled";

@inject("stores")
@observer
class LoginRegister extends Component {
	@observable
	store = this.props.stores.loginRegister;

	render() {
		return <Wrapper>{this.store.loginMode ? <Login /> : <Register />}</Wrapper>;
	}
}

export default LoginRegister;
