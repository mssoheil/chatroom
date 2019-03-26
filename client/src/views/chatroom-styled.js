import styled from "styled-components";

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
`;

const AccountRow = styled.div`
	width: 100%;
	height: 70px;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    box-sizing: border-box;
    padding: 0 20px;
`;

const UserAvatar = styled.img`
    width: 50px;
    height: 50px;
    border: 2.5px solid #888;
    border-radius: 100%;
    background: #fff;
    padding: 10px;
    box-sizing: border-box;
`;

export { Wrapper, AccountRow, UserAvatar };
