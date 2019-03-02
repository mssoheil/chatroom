import React, { Component, Fragment } from "react";

import { inject, observer } from "mobx-react";
import { observable, action } from "mobx";

import {
	TweenMax,
	CSSPlugin,
	ScrollToPlugin,
	Draggable,
	Elastic,
	TweenLite,
	TimelineLite
} from "gsap/all";

import { Wrapper } from "./login-styled";

@inject("stores")
@observer
class Login extends Component {
	constructor(props) {
		super(props);
		this.myElement = null;
		this.myTween = null;
	}
	@observable
	store = this.props.stores.login;

	@observable
	loginRegisterStore = this.props.stores.loginRegister;

	

	componentDidMount() {
		this.myTween = TweenLite.to(this.myElement, 1, {y: "100px", opacity: 1})
	}
	render() {
		return (
			<Wrapper ref={div => this.myElement = div}>
				<a
					
					onClick={() => {
						this.loginRegisterStore.changeLoginMode();
					}}
				>
					sign up
				</a>
				{/* <a
					ref={div => this.myElement = div}
					onClick={() => {
						this.loginRegisterStore.changeLoginMode();
					}}
				>
					sign up
				</a> */}
			</Wrapper>
		);
	}
}

export default Login;
