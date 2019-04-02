import styled, { keyframes } from "styled-components";

const fade = keyframes`
	from {
		opacity: 1;
	}
	to {
		opacity: 0;
	}
`;
const fadeIn = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`;
const Wrapper = styled.div`
	width: 100px;
	height: 100px;
	margin: 0 auto;
	background: rgba(255, 255, 255, 0.2);
	border-radius: 100%;
	color: white;
	display: flex;
	cursor: pointer;
	transition: all 0.3s;
	position: absolute;
	left: calc((98% / 2) - 50px);
	top: 41%;
	&:hover {
		background: rgba(255, 255, 255, 0.1);
		transition: all 0.3s;
		i {
			transition: all 0.3s;
			color: rgba(255, 255, 255, 0.2);
		}
	}
	animation: ${fadeIn} 0.3s forwards;
	&.activated {
		animation: ${fade} 0.3s forwards;
	}
	justify-content: center;
	align-items: center;
	i {
		transition: all 0.5s;
		font-size: 60px;
		color: rgba(255, 255, 255, 0.6);
	}
`;

export { Wrapper };
