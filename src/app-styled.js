import styled, { keyframes } from "styled-components";

const fade = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`;

const Wrapper = styled.div`
	width: 100%;
	height: 100vh;
	background: url(${props => props.backgroundImage}) no-repeat center center;
	background-size: cover;
	animation: ${fade} 0.3s forwards;
	display: flex;
	align-items: center;
`;

export { Wrapper };
