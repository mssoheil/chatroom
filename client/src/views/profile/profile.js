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
	Input,
	Label,
	PasswordSection,
	ActivateChangePasswordSection,
	PasswordGridContainer,
	PasswordGrid,
	PasswordConfirmGrid
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
							<UsernameGrid item xl={6} lg={6}>
								<Label
									textColor={customTheme.color.textGray}
									htmlFor="usernameInput"
								>
									Change Username
								</Label>
								<Input
									id="usernameInput"
									textColor={customTheme.color.textGray}
									type="text"
								/>
							</UsernameGrid>
						</UsernameGridContainer>
						<PasswordSection textColor={customTheme.color.textGray}>
							<ActivateChangePasswordSection>
								Change password{" "}
								
								<Switch
									checked={this.store.activatedChangePassword}
									onChange={e => this.store.activateChangePassword(e)}
									value={this.store.activatedChangePassword}
									color={`${customTheme.color.textGray}[500]`}
								/>
							</ActivateChangePasswordSection>

							{this.store.activatedChangePassword ? (
								<PasswordGridContainer container>
									<PasswordGrid item xl={6} lg={6}>
										<Label
											textColor={customTheme.color.textGray}
											htmlFor="passwordInput"
										>
											Password
										</Label>
										<Input
											id="passwordInput"
											textColor={customTheme.color.textGray}
											type="text"
										/>
									</PasswordGrid>
									<PasswordConfirmGrid item xl={6} lg={6}>
										<Label
											textColor={customTheme.color.textGray}
											htmlFor="confirmPasswordInput"
										>
											Confirm Password
										</Label>
										<Input
											id="confirmPasswordInput"
											textColor={customTheme.color.textGray}
											type="text"
										/>
									</PasswordConfirmGrid>
								</PasswordGridContainer>
							) : null}
						</PasswordSection>
					</InfoSection>
				</ProfileSection>
			</Wrapper>
		);
	}
}

export default Profile;
