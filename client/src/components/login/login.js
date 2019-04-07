import React, { Component } from "react";

import { inject, observer } from "mobx-react";
import { observable } from "mobx";

import { withTheme } from "@material-ui/core/styles";

import { MorphReplace } from "react-svg-morph";

import InputField from "./../../components/inputField/inputField";

import PasswordShow from "./../passwordShow/passwordShow";
import PasswordHide from "./../passwordHide/passwordHide";

import PasswordLock from "./../passwordLock/passwordLock";
import PasswordUnlock from "./../passwordUnlock/passwordUnlock";

import MailIcon from "./../mailIcon/mailIcon";

import CheckboxIndicator from "./../checkboxIndicator/checkboxIndicator";
import CheckboxContainer from "./../checkboxContainer/checkboxContainer";

import { TweenLite } from "gsap/all";


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
		this.myTween = TweenLite.to(this.myElement, 1, { opacity: 1 });
	}

	render() {
		const { customTheme } = this.props;
		return (
			<Wrapper
				ref={div => (this.myElement = div)}
				loginMode={this.loginRegisterStore.loginMode}
			>
				<ChangeModeRow>
					<ChangeModeText>Not registered yet?</ChangeModeText>
					<ChangeMode
						onClick={() => {
							this.loginRegisterStore.changeLoginMode();
							this.store.changeEmail("");
							this.store.changePassword("");
							this.store.changeRememberMe(false);
							this.setState({
								password: true
							});
						}}
					>
						Sign up
					</ChangeMode>
				</ChangeModeRow>

				<InputField
					type="email"
					label="Email"
					barColor={customTheme.color.secondary}
					labelColor={customTheme.color.secondary}
					barActiveColor={customTheme.color.primary}
					color={customTheme.color.secondary}
					speed={0.3}
					inputWidth="100%"
					inputHeight="60px"
					id="loginEmail"
					suffix={<div style={{ width: 40 }} />}
					prefix={
						<div style={{ width: 30 }}>
							<MailIcon viewBox="0 0 50 50" fill={customTheme.color.gray} />
						</div>
					}
					val={this.store.email}
					changeVal={val => {
						this.store.changeEmail(val);
					}}
				/>
				<br />
				<InputField
					type={this.state.password ? "password" : "text"}
					label="Password"
					barColor={customTheme.color.secondary}
					labelColor={customTheme.color.secondary}
					barActiveColor="#9c379c"
					color={customTheme.color.secondary}
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
										fill={customTheme.color.gray}
									/>
								) : (
									<PasswordHide
										viewBox="0 0 550 550"
										key="checkbox"
										fill={customTheme.color.gray}
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
										fill={customTheme.color.gray}
									/>
								) : (
									<PasswordUnlock
										viewBox="0 0 512 512"
										key="checkbox"
										fill={customTheme.color.gray}
									/>
								)}
							</MorphReplace>
						</div>
					}
					val={this.store.password}
					changeVal={val => {
						this.store.changePassword(val);
					}}
				/>
				<br />

				<CheckboxRow>
					<div
						onClick={() => {
							this.store.toggleRememberMe();
						}}
						style={{ cursor: "pointer" }}
					>
						<MorphReplace
							width={40}
							height={40}
							viewBox="0 0 20 20"
							duration={400}
						>
							{this.store.rememberMe ? (
								<CheckboxIndicator
									viewBox="0 0 24 24"
									key="checked"
									fill="green"
								/>
							) : (
								<CheckboxContainer
									viewBox="0 0 24 24"
									key="checkbox"
									fill={customTheme.color.gray}
								/>
							)}
						</MorphReplace>
					</div>
					<CheckboxText
						onClick={() => {
							this.store.toggleRememberMe();
						}}
					>
						Remember Me
					</CheckboxText>
				</CheckboxRow>
				<br />
				<ButtonHolder>
					<Btn
						onClick={() => {
							this.store.loginUser();
						}}
						variant="contained"
					>
						Sign In
					</Btn>
				</ButtonHolder>
			</Wrapper>
		);
	}
}

export default withTheme()(Login);
