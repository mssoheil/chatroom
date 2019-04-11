import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { observable } from "mobx";

import Switch from "@material-ui/core/Switch";

import "react-confirm-alert/src/react-confirm-alert.css";

import {
	Wrapper,
	ProfileSection,
	AvatarSection,
	Avatar,
	AvatarImageSection,
	EditAvatar,
	EditAvatarInput,
	EditAvatarLabel,
	InfoSection,
	UsernameGridContainer,
	UsernameGrid,
	UsernameError,
	UsernameErrorGrid,
	Input,
	Label,
	PasswordSection,
	ActivateChangePasswordSection,
	PasswordGridContainer,
	PasswordGrid,
	PasswordConfirmGrid,
	ButtonsSection,
	SaveBtn,
	CancelBtn
} from "./profile-styled";

import customTheme from "../../config/theme";

@inject("stores")
@observer
class Profile extends Component {
	@observable
	store = this.props.stores.profile;

	@observable
	loginRegisterStore = this.props.stores.loginRegister;

	componentDidMount() {
		this.store.changeDefaultUsername(this.loginRegisterStore.username);
		this.store.changeDefaultGender(this.loginRegisterStore.userGender);
	}

	render() {
		return (
			<Wrapper>
				<ProfileSection>
					<AvatarSection>
						<AvatarImageSection>
							<Avatar
								src={
									!this.store.imageChanged
										? `http://localhost:6464/chatroom/v1/img/${
												this.loginRegisterStore.userAvatar
										  }`
										: `http://localhost:6464/chatroom/v1/img/${
												this.store.imageName
										  }`
								}
							/>

							<EditAvatar>
								<EditAvatarLabel htmlFor="editAvatar">
									<i className="demo-icon icon-pencil" />
								</EditAvatarLabel>
								<EditAvatarInput
									id="editAvatar"
									type="file"
									onChange={e => this.store.changeFile(e)}
								/>
							</EditAvatar>
						</AvatarImageSection>
					</AvatarSection>
					<InfoSection>
						<UsernameGridContainer container>
							<UsernameGrid item xl={6} lg={6} md={6} sm={6} xs={12}>
								<Label
									textColor={customTheme.color.textGray}
									htmlFor="usernameInput"
								>
									Change Username
								</Label>
								<Input
									value={this.store.username}
									onChange={e => this.store.changeUsername(e)}
									onBlur={e => this.store.checkUsernameValidation(e)}
									id="usernameInput"
									textColor={customTheme.color.textGray}
									type="text"
								/>
							</UsernameGrid>

							<UsernameErrorGrid  item xl={6} lg={6} md={6} sm={6} xs={12}>
								<UsernameError>
									{!this.store.usernameValidation
										? this.store.usernameError
										: null}
								</UsernameError>
							</UsernameErrorGrid>
						</UsernameGridContainer>
						<PasswordSection textColor={customTheme.color.textGray}>
							<ActivateChangePasswordSection>
								Change password{" "}
								<Switch
									checked={this.store.activatedChangePassword}
									onChange={e => this.store.activateChangePassword(e)}
									value={this.store.activatedChangePassword}
									color={`default`}
								/>
							</ActivateChangePasswordSection>

							{this.store.activatedChangePassword ? (
								<PasswordGridContainer container>
									<PasswordGrid item xl={6} lg={6} md={6} sm={6} xs={12}>
										<Label
											textColor={customTheme.color.textGray}
											htmlFor="passwordInput"
										>
											Old Password
										</Label>
										<Input
											value={this.store.password}
											onChange={e => this.store.changePassword(e)}
											id="passwordInput"
											textColor={customTheme.color.textGray}
											type="password"
										/>
									</PasswordGrid>
									<PasswordConfirmGrid item xl={6} lg={6} md={6} sm={6} xs={12}>
										<Label
											textColor={customTheme.color.textGray}
											htmlFor="confirmPasswordInput"
										>
											New Password
										</Label>
										<Input
											value={this.store.passwordNew}
											onChange={e => this.store.changeNewPassword(e)}
											id="confirmPasswordInput"
											textColor={customTheme.color.textGray}
											type="password"
										/>
									</PasswordConfirmGrid>
								</PasswordGridContainer>
							) : (
								""
							)}
						</PasswordSection>
					</InfoSection>
					<ButtonsSection>
						<SaveBtn
							onClick={() => this.store.saveData()}
							variant="contained"
							color="primary"
							disabled={!this.store.usernameValidation}
						>
							Save
						</SaveBtn>
						<CancelBtn
							onClick={() => this.store.cancelData()}
							variant="contained"
						>
							Cancel
						</CancelBtn>
					</ButtonsSection>
				</ProfileSection>
			</Wrapper>
		);
	}
}

export default Profile;
