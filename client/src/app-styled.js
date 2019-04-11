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
	height: 100%;

	display: flex;
	align-items: center;
`;
const WrapperImg = styled.img`
	min-height: 100%;
	min-width: 1024px;

	/* Set up proportionate scaling */
	width: 100%;
	height: auto;

	/* Set up positioning */
	position: fixed;
	top: 0;
	left: 0;
	z-index: -1;

	animation: ${fade} 0.3s forwards;
	
`;

export { Wrapper, WrapperImg };
