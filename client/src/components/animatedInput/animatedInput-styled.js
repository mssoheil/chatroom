import styled from "styled-components";

const Wrapper = styled.div`
	background: none;
	border: none;
	width: 100%;
	height: 100%;
	position: relative;
`;

const Label = styled.label`
	color: ${props => props.labelColor};
	color: ${props =>
		props.fieldState === "success"
			? props.labelColorSuccess
			: props.labelColor};
	color: ${props =>
		props.fieldState === "error" ? props.labelColorError : props.labelColor};
	position: absolute;
	top: 0;
	left: 5px;
	font-size: 20px;
	font-weight: 400;
	line-height: ${props => props.inputHeight};
	transition: all ${props => props.speed}s;
`;
const Bar = styled.div`
	width: 100%;
	height: 1px;
	background: ${props => props.barColor};
	background: ${props =>
		props.fieldState === "success" ? props.barColorSuccess : props.barColor};
	background: ${props =>
		props.fieldState === "error" ? props.barColorError : props.barColor};
	&:before {
		content: "";
		display: block;
		position: absolute;
		width: 0;
		height: 2px;
		background: ${props => props.barActiveColor};
		background: ${props =>
			props.fieldState === "success"
				? props.barActiveColorSuccess
				: props.barActiveColor};
		background: ${props =>
			props.fieldState === "error"
				? props.barActiveColorError
				: props.barActiveColor};
		bottom: 0;
		right: 50%;
		transition: all ${props => props.speed}s;
	}
	&:after {
		content: "";
		display: block;
		position: absolute;
		background: ${props => props.barActiveColor};
		background: ${props =>
			props.fieldState === "success"
				? props.barActiveColorSuccess
				: props.barActiveColor};
		background: ${props =>
			props.fieldState === "error"
				? props.barActiveColorError
				: props.barActiveColor};
		width: 0;
		height: 2px;
		bottom: 0;
		left: 50%;
		transition: all ${props => props.speed}s;
	}
`;

const Input = styled.input`
	color: ${props => props.color};
	color: ${props => props.barActiveColor};
		color: ${props =>
			props.fieldState === "success"
				? props.barActiveColorSuccess
				: props.barActiveColor};
		color: ${props =>
			props.fieldState === "error"
				? props.barActiveColorError
				: props.barActiveColor};
	padding-left: 5px;
	padding-right: 5px;
	border: none;
	background: none;
	outline: none;
	position: relative;
	transition: all ${props => props.speed}s;
	width: 100%;
	height: calc(100% - 4px);
	font-size: 20px;
	font-weight: 400;
	&:focus {
		border: none;
		outline: none;
		& ~ ${Label} {
			transform: translate(0%, -40%) scale(0.75);
			transition: all ${props => props.speed}s;
		}

		& ~ ${Bar}:before, & ~ ${Bar}:after {
			width: 50%;
			transition: all ${props => props.speed}s;
		}

		transition: all ${props => props.speed}s;
	}
	&.activeInput {
		& ~ ${Label} {
			transform: translate(0%, -40%) scale(0.75);
			transition: all ${props => props.speed}s;
		}
		& ~ ${Bar}:before, & ~ ${Bar}:after {
			width: 50%;
			transition: all ${props => props.speed}s;
		}
	}
`;

export { Wrapper, Input, Label, Bar };
