import React, { Component, Fragment } from "react";

import { inject, observer } from "mobx-react";

import { observable } from "mobx";

import {
	Wrapper,
	MessagesSection,
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
		const { username } = this.props;
		return (
			<Wrapper>
				<MessagesSection>
					{this.store.messages.map((item, index) => {
						return (
							<div key={`msg_${index}`}>
								{item.room["_id"] === this.roomsStore.visibleRoom["_id"] &&
								!this.chatRoomStore.isPrivate ? (
									<Fragment>
										<span>{item.username}: </span>
										<span>{item.message}</span>
									</Fragment>
								) : null}
							</div>
						);
					})}
					{this.store.privateMessages.map((item, index) => {
						return (
							<div key={`msg_${index}`}>
								{(item.from.username ===
									this.roomsStore.visiblePrivate.username ||
									item.to.username ===
										this.roomsStore.visiblePrivate.username) &&
								this.chatRoomStore.isPrivate ? (
									<Fragment>
										<span>{item.from.username}: </span>
										<span>{item.message}</span>
									</Fragment>
								) : null}
							</div>
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
						xs={10}
					>
						<InputBox
							value={this.store.message}
							onChange={e => this.store.changeMessage(e)}
							type="text"
						/>
					</MessageControllsInputGrid>
					<MessageGontrollsBtnGrid item xl={2} lg={2} md={2} sm={2} xs={2}>
						{this.chatRoomStore.isPrivate ? (
							<SendBtn
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
