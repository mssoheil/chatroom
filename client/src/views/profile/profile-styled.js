import styled from "styled-components";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	padding: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const ProfileSection = styled.div`
	width: 70%;
	overflow: auto;
	min-height: 70%;
	max-height: 95%;
	@media screen and (max-width: 599px) {
		min-height: 85%;
		max-height: 95%;
	}
	border-radius: 5px;
	background: rgba(51, 51, 51, 0.8);
	padding: 10px;
	box-sizing: border-box;
	position: relative;
`;

const AvatarSection = styled.div`
	text-align: center;
	width: 100%;
	height: 30%;
	@media screen and (max-width: 599px) {
		height: 30%;
	}
`;

const AvatarImageSection = styled.div`
	width: 150px;
	height: 150px;
	@media screen and (max-width: 599px) {
		width: 100px;
		height: 100px;
	}
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
		@media screen and (max-width: 599px) {
			font-size: 20px;
		}
	}
	@media screen and (max-width: 599px) {
		width: 30px;
		height: 30px;
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
	padding: 10px;
	box-sizing: border-box;
`;

const UsernameErrorGrid = styled(Grid)`
	padding: 10px;
	box-sizing: border-box;
	@media screen and (max-width: 599px) {
		padding: 0 10px;
		height: auto;
	}
`;

const UsernameError = styled.h4`
	color: red;
	font-weight: normal;
	height: 100%;
	display: flex;
	align-items: center;

	@media screen and (max-width: 599px) {
		margin: 0;
		padding: 0 10px;
		height: auto;
	}
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
	@media screen and (max-width: 599px) {
		height: 30px;
		font-size: 18px;
	}
`;

const Label = styled.label`
	display: block;
	font-size: 22px;
	@media screen and (max-width: 600px) {
		font-size: 20px;
	}
	@media screen and (max-width: 420px) {
		font-size: 18px;
	}
	margin-bottom: 10px;
	color: ${props => props.textColor};
`;

const PasswordSection = styled.div`
	color: ${props => props.textColor};

	font-size: 22px;
	@media screen and (max-width: 600px) {
		font-size: 20px;
	}
	@media screen and (max-width: 420px) {
		font-size: 19px;
	}
`;

const ActivateChangePasswordSection = styled.div`
	padding: 10px;
	box-sizing: border-box;
	@media screen and (max-width: 599px) {
		font-size: 16px;
	}
`;

const PasswordGridContainer = styled(Grid)``;
const PasswordGrid = styled(Grid)`
	padding: 10px;
	box-sizing: border-box;
`;
const PasswordConfirmGrid = styled(Grid)`
	padding: 10px;
	box-sizing: border-box;
`;

const ButtonsSection = styled.div`
	display: flex;
	margin: 0 auto;
	width: 20%;
	text-align: center;
	justify-content: space-between;
	position: absolute;
	bottom: 10px;
	padding: 10px;
	box-sizing: border-box;
	@media screen and (max-width: 1400px) {
		width: 30%;
	}
	@media screen and (max-width: 910px) {
		width: 40%;
	}
	@media screen and (max-width: 690px) {
		width: 50%;
	}
	@media screen and (max-width: 540px) {
		width: 65%;
	}
	@media screen and (max-width: 420px) {
		width: 90%;
	}
`;

const SaveBtn = styled(Button)``;
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
};
