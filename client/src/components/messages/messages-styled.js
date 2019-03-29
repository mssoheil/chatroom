import styled from "styled-components";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const Wrapper = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	border-radius: 10px;
	background: #333;
`;
const MessagesSection = styled.div``;
const MessageControlls = styled(Grid)``;
const MessageControllsInputGrid = styled(Grid)``;
const MessageGontrollsBtnGrid = styled(Grid)``;
const InputBox = styled.input``;
const SendBtn = styled(Button)``;

export {
	Wrapper,
	MessagesSection,
	MessageControlls,
	MessageControllsInputGrid,
	InputBox,
	MessageGontrollsBtnGrid,
	SendBtn
};
