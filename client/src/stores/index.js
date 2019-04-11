import Login from "./login/login-store";
import LoginRegister from "./loginRegister/loginRegister-store";
import Register from "./register/register-store";
import Chatroom from "./chatroom/chatroom-store";
import Messages from "./chatroom/messages-store";
import Rooms from "./chatroom/rooms-store";
import UsersInRoom from "./chatroom/usersInRoom-store";
import Profile from "./profile/profile-store";

const login = new Login();
const loginRegister = new LoginRegister();
const register = new Register();
const chatroom = new Chatroom();
const messages = new Messages();
const rooms = new Rooms();
const usersInRoom = new UsersInRoom();
const profile = new Profile();

export default {
	login,
	loginRegister,
	register,
	chatroom,
	messages,
	rooms,
	usersInRoom,
	profile
};
