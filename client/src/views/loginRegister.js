import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { observable } from "mobx";
import Login from "./../components/login/login";
import Register from "./../components/register/register";
import { Wrapper, WrapperInner, WrapperFlip } from "./loginRegister-styled";

@inject("stores")
@observer
class LoginRegister extends Component {
	@observable
	store = this.props.stores.loginRegister;

	render() {
		return (
			<Wrapper>
				<WrapperFlip>
					<WrapperInner loginMode={this.store.loginMode}>
						<Login />
						<Register />
					</WrapperInner>
				</WrapperFlip>
			</Wrapper>
		);
	}
}

export default LoginRegister;
