import Login from "./login/login-store";
import LoginRegister from "./loginRegister/loginRegister-store";
import Register from "./register/register-store";
import Chatroom from "./chatroom/chatroom-store";

const login = new Login();
const loginRegister = new LoginRegister();
const register = new Register();
const chatroom = new Chatroom();

export default {
	login,
	loginRegister,
	register,
	chatroom
};
