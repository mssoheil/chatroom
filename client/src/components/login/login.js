import React, { Component } from "react";

import { inject, observer } from "mobx-react";
import { observable } from "mobx";

import InputField from "./../../components/inputField/inputField";

import { withTheme } from "@material-ui/core/styles";


import { MorphReplace } from "react-svg-morph";

import PasswordShow from "./../passwordShow/passwordShow";
import PasswordHide from "./../passwordHide/passwordHide";

import PasswordLock from "./../passwordLock/passwordLock";
import PasswordUnlock from "./../passwordUnlock/passwordUnlock";

import MailIcon from "./../mailIcon/mailIcon";

import CheckboxIndicator from "./../checkboxIndicator/checkboxIndicator";
import CheckboxContainer from "./../checkboxContainer/checkboxContainer";

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

import {
	Wrapper,
	CheckboxRow,
	CheckboxText,
	ButtonHolder,
	Btn,
	ChangeModeRow,
	ChangeModeText,
	ChangeMode
} from "./login-styled";

@inject("stores")
@observer
class Login extends Component {
	constructor(props) {
		super(props);
		this.myElement = null;
		this.myTween = null;
		this.state = {
			password: true,
			stayLogin: false
		};
	}

	toggleShow() {
		this.setState((state, props) => {
			return {
				password: !state.password
			};
		});
	}
	toggleStayLogin() {
		this.setState((state, props) => {
			return {
				stayLogin: !state.stayLogin
			};
		});
	}
	@observable
	store = this.props.stores.login;

	@observable
	loginRegisterStore = this.props.stores.loginRegister;

	componentDidMount() {
		this.myTween = TweenLite.to(this.myElement, 1, { y: "100px", opacity: 1 });
	}
	render() {
		// const { palette } = this.props.theme;
		return (
			<Wrapper ref={div => (this.myElement = div)}>
				<ChangeModeRow>
					<ChangeModeText>
						Not registered yet? 
					</ChangeModeText>
					<ChangeMode>
						Sign up
					</ChangeMode>
				</ChangeModeRow>
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
					suffix={<div style={{ width: 40 }} />}
					prefix={
						<div style={{ width: 30 }}>
							<MailIcon viewBox="0 0 50 50" fill="#bbb" />
						</div>
					}
				/>
				<br />
				<InputField
					type={this.state.password ? "password" : "text"}
					label="Password"
					barColor="#fff"
					labelColor="#fff"
					barActiveColor="#9c379c"
					color="#fff"
					speed={0.3}
					inputWidth="100%"
					inputHeight="60px"
					id="loginPassword"
					suffix={
						<div
							style={{ cursor: "pointer" }}
							onClick={this.toggleShow.bind(this)}
						>
							<MorphReplace
								width={40}
								height={40}
								viewBox="0 0 20 20"
								duration={400}
							>
								{this.state.password ? (
									<PasswordShow
										viewBox="0 0 700 700"
										key="checked"
										fill="#bbb"
									/>
								) : (
									<PasswordHide
										viewBox="0 0 550 550"
										key="checkbox"
										fill="#bbb"
									/>
								)}
							</MorphReplace>
						</div>
					}
					prefix={
						<div style={{ cursor: "pointer" }}>
							<MorphReplace
								width={30}
								height={30}
								viewBox="0 0 20 20"
								duration={400}
							>
								{this.state.password ? (
									<PasswordLock
										viewBox="0 0 512 512"
										key="checked"
										fill="#bbb"
									/>
								) : (
									<PasswordUnlock
										viewBox="0 0 512 512"
										key="checkbox"
										fill="#bbb"
									/>
								)}
							</MorphReplace>
						</div>
					}
				/>
				<br />

				<CheckboxRow>
					<div
						onClick={this.toggleStayLogin.bind(this)}
						style={{ cursor: "pointer" }}
					>
						<MorphReplace
							width={40}
							height={40}
							viewBox="0 0 20 20"
							duration={400}
						>
							{this.state.stayLogin ? (
								<CheckboxIndicator
									viewBox="0 0 24 24"
									key="checked"
									fill="green"
								/>
							) : (
								<CheckboxContainer
									viewBox="0 0 24 24"
									key="checkbox"
									fill="#bbb"
								/>
							)}
						</MorphReplace>
					</div>
					<CheckboxText onClick={this.toggleStayLogin.bind(this)}>Remember Me</CheckboxText>
				</CheckboxRow>
				<br />
				<ButtonHolder>
					<Btn variant="contained">Sign In</Btn>
				</ButtonHolder>

				{/* <div onClick={this.toggleChecked.bind(this)}>
					<MorphReplace
						width={20}
						height={20}
						viewBox="0 0 20 20"
						duration={400}
					>
						{this.state.checked ? (
							<Checked key="checked" />
						) : (
							<CheckBox key="checkbox" />
						)}
					</MorphReplace>
				</div> */}
				{/* <div>{console.log("object", palette.yoona)}</div> */}
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

export default withTheme()(Login);
