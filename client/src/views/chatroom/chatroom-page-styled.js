import styled from "styled-components";

import Grid from "@material-ui/core/Grid";

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	overflow: hidden;
`;



const AccountRow = styled.div`
	width: 100%;
	height: 70px;
	display: flex;
	align-items: center;
	flex-direction: row-reverse;
	box-sizing: border-box;
	padding: 0 20px;
`;



const UserAvatar = styled.img`
	width: 50px;
	height: 50px;
	border: 2.5px solid #888;
	border-radius: 100%;
	box-sizing: border-box;
`;

const Username = styled.span`
	margin-right: 10px;
	color: ${props => props.textColor};
	font-weight: bold;
	font-size: 20px;
	cursor: pointer;
`;

const ChatSectionWrapper = styled.div`
	margin: 0 auto;
	height: 80%;
	margin-top: 50px;
	width: 80%;
	max-height: 80%;
	@media screen and (max-width: 959px) {
		overflow-y: auto;
		&::-webkit-scrollbar {
			width: 5px;
		}
		&::-webkit-scrollbar-track-piece {
			background: #bbb;
		}
		&::-webkit-scrollbar-thumb {
			background: gray;
			height: 10px;
			padding: 10px;
			width: 5px;
		}
		align-items: flex-start;
	}
`;
const ChatGrid = styled(Grid)`
	height: 100%;
	max-height: 100%;
	width: calc(100% + 24px);
`;
const UsersGrid = styled(Grid)`
	padding: 0 20px;
	box-sizing: border-box;
	max-height: 100%;
	@media screen and (max-width: 959px) {
		order: 1;
		height: 100%;
		margin-bottom: 5vh !important;
	}
`;
const MessagesGrid = styled(Grid)`
	padding: 0 20px;
	box-sizing: border-box;
	max-height: 100%;
	@media screen and (max-width: 959px) {
		order: 3;
		height: 100%;
	}
`;
const RoomsGrid = styled(Grid)`
	@media screen and (max-width: 959px) {
		order: 2;
		height: 100%;
		margin-bottom: 5vh !important;
	}

	box-sizing: border-box;
	padding: 0 20px;
`;

export {
	Wrapper,
	AccountRow,
	UserAvatar,
	ChatGrid,
	UsersGrid,
	MessagesGrid,
	RoomsGrid,
	ChatSectionWrapper,
	Username,

};
