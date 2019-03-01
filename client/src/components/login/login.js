import React, { Component, Fragment } from "react";

import { inject, observer } from "mobx-react";
import { observable, action } from "mobx";
import TextField from "@material-ui/core/TextField";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";

// const styles = theme => ({
// 	textField: {
// 		borderColor: "red"
// 	}
// });

@inject("stores")
@observer
class Login extends Component {
	@observable
	store = this.props.stores.login;

	@observable
	loginRegisterStore = this.props.stores.loginRegister;
	render() {
		const { classes } = this.props;

		return (
			<Fragment>
				<a
					onClick={() => {
						this.loginRegisterStore.changeLoginMode();
					}}
				>
					sign up
				</a>
			</Fragment>
		);
	}
}

export default Login;
