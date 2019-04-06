import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { observable } from "mobx";
import Login from "../../components/login/login";
import Register from "../../components/register/register";
import { Wrapper, WrapperInner, WrapperFlip } from "./loginRegister-styled";

import customTheme from "../../config/theme";

@inject("stores")
@observer
class LoginRegister extends Component {
	
	@observable
	store = this.props.stores.loginRegister;

	componentDidMount() {
		this.store.checkAuth();
	}

	componentDidUpdate() {
		this.store.checkAuth();
	}

	render() {
		return (
			<Wrapper>
				<WrapperFlip>
					<WrapperInner loginMode={this.store.loginMode}>
						<Login customTheme={customTheme} />
						<Register customTheme={customTheme} />
					</WrapperInner>
				</WrapperFlip>
			</Wrapper>
		);
	}
}

export default LoginRegister;
