import React, { Component, Fragment } from "react";

import { inject, observer } from "mobx-react";

import { observable } from "mobx";

import {
	Wrapper,
	MessagesSection,
	MessagesWrapper,
	MessagesContainer,
	MessagesSender,
	MessagesSenderText,
	Divider,
	MessageTime,
	MessageContent,
	MessageContentText,
	MessageControllsSection,
	MessageControllsInputGrid,
	InputBox,
	MessageGontrollsBtnGrid,
	SendBtn
} from "./messages-styled";

@inject("stores")
@observer
class Messages extends Component {
	constructor(props) {
		super(props);
		this.socket = this.props.socket;
	}
	@observable
	store = this.props.stores.messages;

	@observable
	roomsStore = this.props.stores.rooms;

	@observable
	chatRoomStore = this.props.stores.chatroom;

	@observable
	loginRegisterStore = this.props.stores.loginRegister;

	componentDidMount() {

		
		
		this.socket.on("chatMessage", packet => {
			this.store.changeMessages(packet);
		});
		this.socket.on("privateCame", packet => {
			this.store.receivedPrivateMessage(packet, this.socket);
		});
		this.socket.on("refusedPrivateChat", packet => {
			this.store.refusedPrivateChat(packet, this.socket);
		});
		this.socket.on("confirmedPrivateChat", packet => {
			this.store.confirmedPrivateChat(packet, this.socket);
		});
		this.socket.on("leftPrivateChat", packet => {
			this.store.leftPrivateChat(packet, this.socket);
		});
		this.socket.on("receivedPrivateMessage", packet => {
			this.store.receivedPrivateMessageContent(packet, this.socket);
		});
	}

	render() {
		const { username, customTheme } = this.props;
		return (
			<Wrapper>
				<MessagesSection>
					{this.store.messages.map((item, index) => {
						return (
							<MessagesWrapper key={`msg_${index}`}>
								{item.room["_id"] === this.roomsStore.visibleRoom["_id"] &&
								!this.chatRoomStore.isPrivate ? (
									<MessagesContainer>
										{!item.isInformative ? (
											<Fragment>
												<MessagesSender>
													<MessagesSenderText
														textColor={customTheme.color.textGray}
													>
														{item.username}
													</MessagesSenderText>{" "}
													<Divider textColor={customTheme.color.textGray}>
														{" "}
														|{" "}
													</Divider>{" "}
													<MessageTime textColor={customTheme.color.textGray}>
														{`${item.time}`}
													</MessageTime>
												</MessagesSender>
												<MessageContent
													backgroundColor={customTheme.color.textGray}
												>
													<MessageContentText>
														{item.message}
													</MessageContentText>
												</MessageContent>
											</Fragment>
										) : (
											<div style={{ color: customTheme.color.textGray }}>
												{item.username} {item.message}
											</div>
										)}
									</MessagesContainer>
								) : null}
							</MessagesWrapper>
						);
					})}
					{this.store.privateMessages.map((item, index) => {
						return (
							<MessagesWrapper key={`msg_${index}`}>

								{(item.from.username ===
									this.roomsStore.visiblePrivate.username ||
									item.to.username ===
										this.roomsStore.visiblePrivate.username) &&
								this.chatRoomStore.isPrivate ? (
									<MessagesContainer>
										{!item.isInformative ? (
											<Fragment>
												<MessagesSender>
													<MessagesSenderText
														textColor={customTheme.color.textGray}
													>
														{item.from.username}
													</MessagesSenderText>{" "}
													<Divider textColor={customTheme.color.textGray}>
														{" "}
														|{" "}
													</Divider>{" "}
													<MessageTime textColor={customTheme.color.textGray}>
													{item.time}
													</MessageTime>
												</MessagesSender>
												<MessageContent
													backgroundColor={customTheme.color.textGray}
												>
													<MessageContentText>
														{item.message}
													</MessageContentText>
												</MessageContent>
											</Fragment>
										) : (
											<div style={{ color: customTheme.color.textGray }}>
												{item.username} {item.message}
											</div>
										)}
										{/* <MessagesSender>{item.from.user.username} | {item.from.time}</MessagesSender>
										<MessageContent>{item.message}</MessageContent> */}
									</MessagesContainer>

									
								) : null}
							</MessagesWrapper>
						);
					})}
				</MessagesSection>
				<MessageControllsSection container spacing={8}>
					<MessageControllsInputGrid
						item
						xl={10}
						lg={10}
						md={10}
						sm={10}
						xs={9}
					>
						<InputBox
							maxLength="60"
							value={this.store.message}
							onChange={e => this.store.changeMessage(e, this.socket, username)}
							onKeyPress={e =>
								this.store.changeMessage(e, this.socket, username)
							}
							type="text"
						/>
					</MessageControllsInputGrid>
					<MessageGontrollsBtnGrid item xl={2} lg={2} md={2} sm={2} xs={3}>
						{this.chatRoomStore.isPrivate ? (
							<SendBtn
								variant="contained"
								onClick={() => {
									this.store.sendMessagePrivateMessage(
										this.socket,
										username,
										this.roomsStore.visiblePrivate
									);
								}}
								color="primary"
								size="large"
							>
								Send
							</SendBtn>
						) : (
							<SendBtn
								variant="contained"
								onClick={() => {
									this.store.sendMessage(
										this.socket,
										username,
										this.roomsStore.visibleRoom
									);
								}}
								color="primary"
								size="large"
							>
								Send
							</SendBtn>
						)}
					</MessageGontrollsBtnGrid>
				</MessageControllsSection>
			</Wrapper>
		);
	}
}

export default Messages;
