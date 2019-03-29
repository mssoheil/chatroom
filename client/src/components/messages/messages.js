import React, { Component } from "react";
import {
	Wrapper,
	MessagesSection,
	MessageControlls,
	MessageControllsInputGrid,
	InputBox,
	MessageGontrollsBtnGrid,
	SendBtn
} from "./messages-styled";

export class Messages extends Component {
	render() {
		return (
			<Wrapper>
				<MessagesSection>a</MessagesSection>
				<MessageControlls>
					<MessageControllsInputGrid>
						<InputBox type="text" />
					</MessageControllsInputGrid>
					<MessageGontrollsBtnGrid>
						<SendBtn />
					</MessageGontrollsBtnGrid>
				</MessageControlls>
			</Wrapper>
		);
	}
}

export default Messages;
