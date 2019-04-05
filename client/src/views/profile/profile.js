import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { observable } from "mobx";

import "react-confirm-alert/src/react-confirm-alert.css";

import {
	Wrapper,
	ProfileSection,
	AvatarSection,
	Avatar,
	AvatarImageSection,
	EditAvatar,
	EditAvatarInput,
	EditAvatarLabel
} from "./profile-styled";

@inject("stores")
@observer
class Profile extends Component {
	@observable
	store = this.props.stores.chatroom;

	@observable
	loginRegisterStore = this.props.stores.loginRegister;

	render() {
		return (
			<Wrapper>
				<ProfileSection>
					<AvatarSection>
						<AvatarImageSection>
							<Avatar
								src={`http://localhost:6464/chatroom/v1/img/${
									this.loginRegisterStore.userAvatar
								}`}
							/>

							<EditAvatar>
								<EditAvatarLabel for="editAvatar">
									<i class="demo-icon icon-pencil" />
								</EditAvatarLabel>
								<EditAvatarInput id="editAvatar" type="file" onChange={e => this.store.changeFile(e)} />
							</EditAvatar>
						</AvatarImageSection>
					</AvatarSection>
				</ProfileSection>
			</Wrapper>
		);
	}
}

export default Profile;
