import styled from "styled-components";

import Button from "@material-ui/core/Button";

const Wrapper = styled.div`
	background: #333;
	pointer-events: ${props => (props.loginMode ? "none" : "auto")};
	border-radius: 10px;
	opacity: 0;
	padding: 20px;
	font-family: cursive !important;
	position: absolute;
	width: 100%;
	height: 100%;
	backface-visibility: hidden;
	transform: rotateY(180deg);
	@media screen and (max-width: 900px) {
		transform: unset;
		opacity: ${props => (props.loginMode ? 0 : 1)} !important;
		transition: opacity 1s;
	}
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
		&:before,
		&:after {
			width: 50%;
			transition: all 0.5s;
		}
	}
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
	ButtonHolder,
	Btn,
	ChangeMode,
	ChangeModeRow,
	ChangeModeText
};
