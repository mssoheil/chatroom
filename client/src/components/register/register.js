import React, { Component, Fragment } from "react";

import { inject, observer } from "mobx-react";
import { observable, action } from "mobx";
import TextField from "@material-ui/core/TextField";
import purple from "@material-ui/core/colors/purple";
import grey from "@material-ui/core/colors/grey";
import {
	withStyles,
	MuiThemeProvider,
	createMuiTheme
} from "@material-ui/core/styles";

// const styles = theme => ({
// 	textField: {
// 		borderColor: "green !important"
// 	},
// 	margin: {
// 		margin: theme.spacing.unit,
// 		borderColor: "red"
// 	}
// });

// const theme = createMuiTheme({
// 	palette: {
// 		primary: {main: "#fff"}
// 	},
// 	typography: { useNextVariants: true }
// });

@inject("stores")
@observer
class Register extends Component {
	@observable
	store = this.props.stores.register;

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
					sign in
				</a>
			</Fragment>
		);
	}
}

export default Register;
