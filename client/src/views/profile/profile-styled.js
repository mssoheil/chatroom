import styled from "styled-components";

import Grid from "@material-ui/core/Grid";

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const ProfileSection = styled.div`
	width: 70%;
	height: 70%;
	background: rgba(51, 51, 51, 0.8);
	padding: 20px;
	box-sizing: border-box;
`;

const AvatarSection = styled.div`
	text-align: center;
`;

const AvatarImageSection = styled.div`
	width: 200px;
	height: 200px;
	position: relative;
	text-align: center;
	margin: 0 auto;
`;

const Avatar = styled.img`
	width: 200px;
	height: 200px;
	border: 2px solid gray;
	border-radius: 100%;
`;

const EditAvatar = styled.div`
	position: absolute;
	width: 50px;
	height: 50px;
	right: 0;
	bottom: 0;
	border-radius: 100%;
	border: 3px solid gray;
	background: #eee;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	i {
		color: #0b8da5;
		font-size: 27px;
	}
`;

const EditAvatarInput = styled.input`
	display: none;
`;

const EditAvatarLabel = styled.label`cursor: pointer;`;

export {
	Wrapper,
	ProfileSection,
	AvatarSection,
	Avatar,
	AvatarImageSection,
	EditAvatar,
	EditAvatarInput,
	EditAvatarLabel
};
