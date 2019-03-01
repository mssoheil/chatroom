import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
    from {opacity: 0}
    to {opacity: 1}
`;

const Wrapper = styled.div`
	animation: ${fadeIn} 4s;
`;

export { Wrapper };
