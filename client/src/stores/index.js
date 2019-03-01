import Login from "./login/login-store";
import LoginRegister from "./loginRegister/loginRegister-store";
import Register from "./register/register-store";

const login = new Login();
const loginRegister = new LoginRegister();
const register = new Register();

export default {
	login,
	loginRegister,
	register
};
