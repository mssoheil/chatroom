import styled from "styled-components";

import Grid from "@material-ui/core/Grid";

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
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
	background: #fff;
	padding: 10px;
	box-sizing: border-box;
`;

const ChatSectionWrapper = styled.div`
	margin: 0 auto;
	height: 75%;
	margin-top: 50px;
	width: 80%;
`;
const ChatGrid = styled(Grid)`
	height: 100%;
	width: calc(100% + 24px);
`;
const UsersGrid = styled(Grid)`
	
	padding: 0 20px;
	box-sizing: border-box;
`;
const MessagesGrid = styled(Grid)`
	
	padding: 0 20px;
	box-sizing: border-box;
`;
const RoomsGrid = styled(Grid)`
	
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
	ChatSectionWrapper
};
