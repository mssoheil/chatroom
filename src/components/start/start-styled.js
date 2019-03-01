import styled from "styled-components";

const Wrapper = styled.div`
	width: 100px;
	height: 100px;
	margin: 0 auto;
	background: rgba(255, 255, 255, 0.2);
	border-radius: 100%;
	color: white;
	display: flex;
	cursor: pointer;
	transition: all 0.5s;
	/* &:hover {
		background: rgba(255, 255, 255, 0.1);
		transition: all 0.5s;
		i {
			transition: all 0.5s;
			color: rgba(255, 255, 255, 0.2);
		}
	}
	&.activated {
		opacity: 0;
	} */
	justify-content: center;
	align-items: center;
	i {
		transition: all 0.5s;
		font-size: 60px;
		color: rgba(255, 255, 255, 0.6);
	}
`;

export { Wrapper };
