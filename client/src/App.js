import React, { Component } from "react";
import "./App.css";
import { inject, observer } from "mobx-react";
import { observable } from "mobx";
import LoginRegister from "./views/loginRegister";
import Start from "./components/start/start";

import { CSSTransition } from "react-transition-group";

import { Wrapper } from "./app-styled";

@inject("stores")
@observer
class App extends Component {
	@observable
	store = this.props.stores.loginRegister;

	@observable
	loginStore = this.props.stores.login;

	render() {
		const transitionOptions = {
			timeout: 500,
			classNames: "fade"
		};

		return (
			<Wrapper
				backgroundImage={
					this.store.isSignedIn
						? require("./assets/img/openDoor.jpg")
						: require("./assets/img/closeDoor.jpg")
				}
			>
				{this.store.started ? <LoginRegister /> : <Start />}
			</Wrapper>
		);
	}
}

export default App;
