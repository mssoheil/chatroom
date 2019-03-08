import styled from "styled-components";

import Button from "@material-ui/core/Button";

const Wrapper = styled.div`
	background: rgba(255, 255, 255, 0.2);
	position: absolute;
	left: 35%;
	top: 20%;
	border-radius: 10px;
	opacity: 0;
	padding: 20px;
	width: 30%;
	font-family: cursive !important;
`;

const ChangeModeRow = styled.div`
	display: flex;
	justify-content: space-between;
`;
const ChangeModeText = styled.h3`
	color: #fff;
	font-weight: 300;
`;
const ChangeMode = styled.h3`
	font-weight: 500;
	text-transform: uppercase;
	color: #fff;
	cursor: pointer;
	position: relative;
	&:before,
	&:after {
		content: "";
		width: 0;
		height: 2px;
		background: #fff;
		position: absolute;
		bottom: -4px;
		transition: all 0.5s;
	}
	&:before {
		right: 50%;

	}
	&:after {
		left: 50%;
	}
	&:hover {
		&:before,&:after {
			width: 50%;
			transition: all 0.5s;
		}
	}

`;

const CheckboxRow = styled.div`
	display: flex;
	align-items: center;
`;
const CheckboxText = styled.h3`
	color: #fff;
	font-weight: 400;
	cursor: pointer;
`;
const ButtonHolder = styled.div`
	display: flex;
	justify-content: center;
`;

const Btn = styled(Button)`
	padding: 15px 35px !important;
	font-family: cursive !important;
`;

export {
	Wrapper,
	CheckboxRow,
	CheckboxText,
	ButtonHolder,
	Btn,
	ChangeMode,
	ChangeModeRow,
	ChangeModeText
};
