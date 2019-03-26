import React, { Component } from "react";
import "./App.css";
import { inject, observer } from "mobx-react";
import { observable } from "mobx";
import LoginRegister from "./views/loginRegister";
import Start from "./components/start/start";

import Chatroom from "./views/chatroom";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import purple from "@material-ui/core/colors/purple";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

// import { CSSTransition } from "react-transition-group";
import Transition from "react-transition-group/Transition";

// import { Transition } from "react-transition-group";

import { Wrapper, WrapperImg } from "./app-styled";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: purple[500]
		}
		// secondary: "#612345"
	},
	typography: {
		useNextVariants: true
	},

	status: {
		danger: "orange"
	}
});

@inject("stores")
@observer
class App extends Component {
	@observable
	store = this.props.stores.loginRegister;

	@observable
	loginStore = this.props.stores.login;

	componentDidMount() {
		this.store.checkAuth();
	}
	componentDidUpdate() {
		this.store.checkAuth();
	}

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
			<Wrapper>
				<WrapperImg
					src={
						this.store.authenticated
							? require("./assets/img/openDoor.jpg")
							: require("./assets/img/closeDoor.jpg")
					}
				/>
				<MuiThemeProvider theme={theme}>
					{this.store.authenticated ? (
						<Chatroom />
					) : (
						<div>
							<Transition
								timeout={1000}
								mountOnEnter
								unmountOnExit
								in={!this.store.started}
							>
								<Start />
							</Transition>
							<Transition
								timeout={1000}
								mountOnEnter
								unmountOnExit
								in={this.store.started}
							>
								<LoginRegister />
							</Transition>
						</div>
					)}
				</MuiThemeProvider>
				<ToastContainer />
			</Wrapper>
		);
	}
}

export default App;
