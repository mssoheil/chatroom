import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
    from {opacity: 0}
    to {opacity: 1}
`;

const Wrapper = styled.div`
    animation: ${fadeIn} 4s;
    z-index: 1;
`;

const WrapperFlip = styled.div`
	perspective: 1000px;
	width: 33%;
	height: 400px;
	position: absolute;
	left: 35%;
	top: 20%;
	padding: 20px;
`;
const WrapperInner = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	text-align: center;
	transition: all 0.8s;
	transform-style: preserve-3d;
`;

export { Wrapper, WrapperInner, WrapperFlip };
