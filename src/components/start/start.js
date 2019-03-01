import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { observable } from "mobx";
import { Wrapper } from "./start-styled";

@inject("stores")
@observer
class Start extends Component {
	@observable
	store = this.props.stores.loginRegister;
	render() {
		return (
			<Wrapper onClick={() => {
				this.store.changeStarted(true)
			}} className={this.store.started ? "activated" : ""}>
				<i className=" icon-user-outline" />
			</Wrapper>
		);
	}
}

export default Start;
