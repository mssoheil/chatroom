import styled from "styled-components";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

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
	height: 80%;
	background: rgba(51, 51, 51, 0.8);
	padding: 20px;
	box-sizing: border-box;
`;

const AvatarSection = styled.div`
	text-align: center;
	width: 100%;
	height: 30%;
`;

const AvatarImageSection = styled.div`
	width: 150px;
	height: 150px;
	position: relative;
	text-align: center;
	margin: 0 auto;
`;

const Avatar = styled.img`
	width: 100%;
	height: 100%;
	border: 2px solid gray;
	border-radius: 100%;
`;

const EditAvatar = styled.div`
	position: absolute;
	width: 40px;
	height: 40px;
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

const EditAvatarLabel = styled.label`
	cursor: pointer;
`;

const InfoSection = styled.div`
	width: 100%;
	height: 60%;
`;
const UsernameGridContainer = styled(Grid)``;
const UsernameGrid = styled(Grid)`
	padding: 10px 20px;
	box-sizing: border-box;
`;
const Input = styled.input`
	border: none;
	border-radius: 5px;
	width: 100%;
	height: 50px;
	background: rgba(70, 70, 70, 0.9);
	padding: 5px;
	box-sizing: border-box;
	font-size: 22px;
	color: ${props => props.textColor};
	&:focus {
		outline: none;
	}
`;

const Label = styled.label`
	display: block;
	font-size: 22px;
	margin-bottom: 10px;
	color: ${props => props.textColor};
`;

const PasswordSection = styled.div`
	color: ${props => props.textColor};

	font-size: 22px;
`;

const ActivateChangePasswordSection = styled.div`
	padding: 10px 20px;
	box-sizing: border-box;
`;

const PasswordGridContainer = styled(Grid)``;
const PasswordGrid = styled(Grid)`
	padding: 10px 20px;
	box-sizing: border-box;
`;
const PasswordConfirmGrid = styled(Grid)`
	padding: 10px 20px;
	box-sizing: border-box;
`;

const ButtonsSection = styled.div`
display: flex;
margin:0 auto;
width: 25%;
text-align: center;
justify-content: space-around;

`;

const SaveBtn = styled(Button)`
`;
const CancelBtn = styled(Button)``;

export {
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
	PasswordConfirmGrid,
	ButtonsSection,
	SaveBtn,
	CancelBtn
};
