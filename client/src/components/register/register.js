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

import { TweenLite } from "gsap/all";

import {
	Wrapper,
	ButtonHolder,
	Btn,
	ChangeModeRow,
	ChangeModeText,
	ChangeMode
} from "./register-styled";

@inject("stores")
@observer
class Register extends Component {
	constructor(props) {
		super(props);
		this.myElement = null;
		this.myTween = null;
		this.state = {
			password: true,
			passwordConfirm: true,
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
	toggleShowConfirm() {
		this.setState((state, props) => {
			return {
				passwordConfirm: !state.passwordConfirm
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
	store = this.props.stores.register;

	@observable
	loginRegisterStore = this.props.stores.loginRegister;

	componentDidMount() {
		// this.myTween = TweenLite.to(this.myElement, 1, { y: "100px", opacity: 1 });
		this.myTween = TweenLite.to(this.myElement, 1, { opacity: 1 });
	}

	componentWillUnmount() {
		this.setState({
			password: "",
			passwordConfirm: ""
		});
	}

	render() {
		const { customTheme } = this.props;

		return (
			<Wrapper
				ref={div => (this.myElement = div)}
				loginMode={this.loginRegisterStore.loginMode}
			>
				<ChangeModeRow>
					<ChangeModeText>Already registered?</ChangeModeText>
					<ChangeMode
						onClick={() => {
							this.loginRegisterStore.changeLoginMode();
							this.store.clearFields();
							this.setState({
								password: true,
								passwordConfirm: true
							});
						}}
					>
						Sign In
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
					barColor={customTheme.color.secondary}
					labelColor={customTheme.color.secondary}
					barActiveColor={customTheme.color.primary}
					color={customTheme.color.secondary}
					speed={0.3}
					inputWidth="100%"
					inputHeight="60px"
					id="registerEmail"
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
					barActiveColor={customTheme.color.primary}
					color={customTheme.color.secondary}
					speed={0.3}
					inputWidth="100%"
					inputHeight="60px"
					id="registerPassword"
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

				<InputField
					type={this.state.passwordConfirm ? "password" : "text"}
					label="Confirm password"
					barColor={customTheme.color.secondary}
					labelColor={customTheme.color.secondary}
					barActiveColor={customTheme.color.primary}
					color={customTheme.color.secondary}
					speed={0.3}
					inputWidth="100%"
					inputHeight="60px"
					id="registerPasswordConfirm"
					suffix={
						<div
							style={{ cursor: "pointer" }}
							onClick={this.toggleShowConfirm.bind(this)}
						>
							<MorphReplace
								width={40}
								height={40}
								viewBox="0 0 20 20"
								duration={400}
							>
								{this.state.passwordConfirm ? (
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
								{this.state.passwordConfirm ? (
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
					val={this.store.passwordConfirm}
					changeVal={val => {
						this.store.changePasswordConfirm(val);
					}}
				/>
				<br />
				<ButtonHolder>
					<Btn
						onClick={() => {
							this.store.registerUser();
						}}
						variant="contained"
					>
						Sign Up
					</Btn>
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

export default withTheme()(Register);
