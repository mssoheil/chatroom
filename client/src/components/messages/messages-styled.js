import styled from "styled-components";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const Wrapper = styled.div`
	display: block;
	width: 100%;
	height: 100%;
	border-radius: 10px;
	background: rgba(51, 51, 51, 0.7);
	padding: 20px;
	box-sizing: border-box;
`;
const MessagesSection = styled.div`
	height: 85%;
	border-bottom: 1px solid rgba(51, 51, 51, 0.8);
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
`;

const MessagesWrapper = styled.div`
	margin-bottom: 20px;
	padding: 5px;
	box-sizing: border-box;
`;
const MessagesContainer = styled.div``;
const MessagesSender = styled.div`
	display: flex;
	margin-bottom: 5px;
`;
const MessagesSenderText = styled.div`
	color: ${props => props.textColor};
	margin-right: 5px;
`;
const Divider = styled.div`
	color: ${props => props.textColor};
	margin-right: 5px;
`;

const MessageTime = styled.div`
	color: ${props => props.textColor};
`;
const MessageContent = styled.div`
	background: ${props => props.backgroundColor};
	border-radius: 8px;
	padding: 10px;
	box-sizing: border-box;
	word-wrap: break-word;
`;
const MessageContentText = styled.div``;

const MessageControllsSection = styled(Grid)`
	height: 15%;
	padding: 20px;
	@media screen and (max-width: 600px){
		padding-left: 0;
	}
	box-sizing: border-box;
	display: flex;
	align-items: center;
	padding-bottom: 0;
`;
const MessageControllsInputGrid = styled(Grid)`
	height: 100%;
`;
const MessageGontrollsBtnGrid = styled(Grid)`
	height: 100%;
`;
const InputBox = styled.input`
	border-radius: 8px;
	border: none;
	outline: none;
	height: 100%;
	width: 100%;
	padding: 10px;
	box-sizing: border-box;
`;
const SendBtn = styled(Button)`
	height: 100%;
	width: 100%;
	@media screen and (max-width: 550px) {
		width: 80%;
	}
`;

export {
	Wrapper,
	MessagesSection,
	MessagesWrapper,
	MessagesContainer,
	MessagesSender,
	MessagesSenderText,
	Divider,
	MessageTime,
	MessageContent,
	MessageContentText,
	MessageControllsSection,
	MessageControllsInputGrid,
	InputBox,
	MessageGontrollsBtnGrid,
	SendBtn
};
