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
`;
const MessageControllsSection = styled(Grid)`
	height: 15%;
	padding: 20px;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	padding-bottom: 0;
`;
const MessageControllsInputGrid = styled(Grid)`
	height: 100%;
`;
const MessageGontrollsBtnGrid = styled(Grid)`
height: 100%;`;
const InputBox = styled.input`
	border-radius: 8px 0 0 8px;
	border: none;
	outline: none;
	height: 100%;
	width: 100%;
	padding: 10px;
	box-sizing: border-box;
`;
const SendBtn = styled(Button)`
	height: 100% ;
	width: 100%;
`;

export {
	Wrapper,
	MessagesSection,
	MessageControllsSection,
	MessageControllsInputGrid,
	InputBox,
	MessageGontrollsBtnGrid,
	SendBtn
};
