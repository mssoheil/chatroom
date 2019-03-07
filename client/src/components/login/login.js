import React, { Component } from "react";

import { inject, observer } from "mobx-react";
import { observable } from "mobx";

import InputField from "./../../components/inputField/inputField";

import { TweenLite } from "gsap/all";
/* import {
	TweenMax,
	CSSPlugin,
	ScrollToPlugin,
	Draggable,
	Elastic,
	TweenLite,
	TimelineLite
} from "gsap/all"; */

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
		this.myTween = TweenLite.to(this.myElement, 1, { y: "100px", opacity: 1 });
	}
	render() {
		return (
			<Wrapper ref={div => (this.myElement = div)}>
				{/* <h3
					onClick={() => {
						this.loginRegisterStore.changeLoginMode();
					}}
				>
					sign up
				</h3> */}

				<InputField
					type="email"
					label="Email"
					barColor="#fff"
					labelColor="#fff"
					barActiveColor="#9c379c"
					color="#fff"
					speed={0.3}
					inputWidth="100%"
					inputHeight="60px"
					id="loginEmail"
					prefix="mo"
					suffix="bo"
				/>
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
