import styled from "styled-components";

const Wrapper = styled.div`
	height: ${props => props.inputHeight};
	width: ${props => props.inputWidth};
	display: flex;
`;
const PrefixWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
    padding: 0 2px;
`;
const InputWrapper = styled.div`
	width: 100%;
	height: 100%;
`;
const SuffixWrapper = styled.div`
    display: flex;
	justify-content: center;
	align-items: center;
    padding: 0 2px;
`;

export { Wrapper, PrefixWrapper, InputWrapper, SuffixWrapper };
