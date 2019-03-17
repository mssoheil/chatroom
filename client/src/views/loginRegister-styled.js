import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
    from {opacity: 0}
    to {opacity: 1}
`;

const Wrapper = styled.div`
	animation: ${fadeIn} 2s;
	z-index: 1;
`;

const WrapperFlip = styled.div`
	perspective: 1000px;
	width: 33%;
	height: 400px;
	position: absolute;
	left: 30%;
	top: 20%;
	padding: 20px;
	@media screen and (max-width: 1300px) {
		width : 50%;
		left: 20%;
	}
	@media screen and (max-width: 900px) {
		width : 75%;
		left: 9%;
	}
	@media screen and (max-width: 700px) {
		width : 78%;
		left: 5%;
	}
	@media screen and (max-width: 550px) {
		width : 78%;
		left: 3%;
	}
	@media screen and (max-width: 400px) {
		width : 78%;
		left: 0;
	}
`;
const WrapperInner = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	transform: ${props =>
		props.loginMode ? "rotateY(0deg)" : "rotateY(180deg)"};
	text-align: center;
	transition: all 0.8s;
	
	transform-style: preserve-3d;
	@media screen and (max-width: 900px) {
		transform: unset;
	}
`;

export { Wrapper, WrapperInner, WrapperFlip };
