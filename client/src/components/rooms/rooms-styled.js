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
	color: ${props => props.textColor};
	text-align: center;
	margin: 0 auto;
	width: 100%;
	cursor: pointer;
`;

const RoomsHeaders = styled.h5`
	color: #aaa;
	text-align: center;
	margin: 0 auto;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
	margin-top: 10px;
`;

const RoomsItemsWrapper = styled.div`
	max-height: 30%;
	overflow-y: auto;
	&::-webkit-scrollbar {
		width: 5px;
	}
	&::-webkit-scrollbar-track-piece {
		background: #bbb;
	}
	&::-webkit-scrollbar-thumb {
		background: gray;
		height: 10px;
		padding: 10px;
		width: 5px;
	}
`;

const RoomItems = styled.div`
	color: ${props => props.textColor};
	font-weight: ${props => props.fontWeight};
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 10px;
	margin-bottom: 10px;
`;

const RoomItemText = styled.div`
	cursor: pointer;
`;

const LeaveRoomButton = styled.button`
	border-radius: 100%;
	border: 1.5px solid ${props => props.textColor};
	width: 20px;
	height: 20px;
	text-align: center;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	color: ${props => props.textColor};
	background: none;
	margin-left: 5px;
	cursor: pointer;
	box-sizing: border-box;
	i {
		font-size: 10px;
	}
`;

const Divider = styled.div`
	width: 70%;
	margin: 0 auto;
	background: #666;
	height: 1px;
	margin-top: 10px;
`;

const RoomsContainer = styled.div`
	height: 80%;
	overflow-y: auto;
	overflow-x: auto;
	width: 100%;
`;
const NewRoomContainer = styled.div`
	outline: 1px solid blue;
	height: 10%;
	width: 100%;
`;

const NewRoom = styled.input`
	box-sizing: border-box;
	padding: 0 20px;
`;

export {
	Wrapper,
	HeaderTxt,
	RoomsContainer,
	NewRoomContainer,
	NewRoom,
	RoomsHeaders,
	Divider,
	RoomItems,
	LeaveRoomButton,
	RoomItemText,
	RoomsItemsWrapper
};
