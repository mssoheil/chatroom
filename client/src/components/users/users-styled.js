import styled from "styled-components";

const Wrapper = styled.div`
	display: block;
	width: 100%;
	height: 100%;
	border-radius: 10px;
	background: rgba(51, 51, 51, 0.7);
	padding: 20px;
	box-sizing: border-box;
`;

const UsersContainer = styled.div`
	height: 100%;
	overflow: auto;
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

const UsersAvatar = styled.img`
	width: 30px;
	height: 30px;
	border: 1.5px solid ${props => props.textColor};
	border-radius: 100%;
	padding: 5px;
	margin-right: 10px;
`;

const UsersItem = styled.div`
	margin-top: 0;
	margin-bottom: 20px;
	display: flex;
	align-items: center;
`;

const UsersItemInnerWrapper = styled.div`
	cursor: pointer;
	display: flex;
	align-items: center;
`;

const UsersItemText = styled.span`
	color: ${props => props.textColor};
`;

export {
	Wrapper,
	UsersContainer,
	UsersAvatar,
	UsersItem,
	UsersItemInnerWrapper,
	UsersItemText
};
