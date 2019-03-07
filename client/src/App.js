import React, { Component } from "react";
import "./App.css";
import { inject, observer } from "mobx-react";
import { observable } from "mobx";
import LoginRegister from "./views/loginRegister";
import Start from "./components/start/start";

// import { CSSTransition } from "react-transition-group";
import Transition from "react-transition-group/Transition";

// import { Transition } from "react-transition-group";

import { Wrapper } from "./app-styled";

@inject("stores")
@observer
class App extends Component {
	@observable
	store = this.props.stores.loginRegister;

	@observable
	loginStore = this.props.stores.login;

	render() {
		// const transitionOptions = {
		// 	timeout: 500,
		// 	classNames: "fade"
		// };

		// const defaultStyle = {
		// 	transition: `all 1s ease-in-out`,
		// 	opacity: 0
		// };

		// const transitionStyles = {
		// 	entering: { opacity: 0 },
		// 	entered: { opacity: 1 }
		// };

		return (
			<Wrapper
				backgroundImage={
					this.store.isSignedIn
						? require("./assets/img/openDoor.jpg")
						: require("./assets/img/closeDoor.jpg")
				}
			>
				<Transition
					timeout={1000}
					mountOnEnter
					unmountOnExit
					in={!this.store.started}
				>
					<Start
						
					/>
					
				</Transition>
				<Transition
					timeout={1000}
					mountOnEnter
					unmountOnExit
					in={this.store.started}
				>
					<LoginRegister
						
					/>
					
				</Transition>
			</Wrapper>
		);
	}
}

export default App;