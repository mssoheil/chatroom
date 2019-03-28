import styled from "styled-components";

const Wrapper = styled.div`
	display: block;
	width: 100%;
	height: 100%;
	border-radius: 10px;
	background: #333;
	text-align: center;
	box-sizing: border-box;
	padding: 20px;
`;

const HeaderTxt = styled.h3`
	color: #aaa;
	text-align: center;
	margin: 0 auto;
	width: 100%;
`;

const RoomsContainer = styled.div`
	outline: 1px solid green;
    height: 80%;
	width: 100%;
`;
const NewRoomContainer = styled.div`
	outline: 1px solid blue;
    height: 10%;
	width: 100%;
`;

export { Wrapper, HeaderTxt, RoomsContainer,NewRoomContainer };
