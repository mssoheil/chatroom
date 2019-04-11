const routes = require("./routes/index.js");

const chat = require("./chat/chat.js");

const express = require("express");

const authController = require("./auth/authController.js");
const roomsApiController = require("./controllers/roomsController/roomsApiController.js");
const profileApiController = require("./profile/profileApiController.js");

const db = require("./db/db.js");

const helmet = require("helmet");

//const logger = require("morgan");

const bodyParser = require("body-parser");

const urlEncoded = bodyParser.urlencoded({ extended: true });
const jsonParser = bodyParser.json();

const router = express.Router();
const User = require("./models/users.js");
const Rooms = require("./models/rooms.js");

const socket = require("socket.io");

module.exports = function(app, server) {
	app.use(helmet());

	app.use(urlEncoded);
	app.use(jsonParser);

	app.use(function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Methods", "*");
		res.header("Access-Control-Allow-Headers", "*");
		next();
	});

	const environment = process.env.NODE_ENV;

	// if (environment !== "production") {
	// 	app.use(logger("dev"));
	// }

	//app.use("/chatroom/v1", routes(router));

	const io = socket(server);

	chat(io);

	app.use("/chatroom/v1/auth", authController(io));
	app.use("/chatroom/v1/profile", profileApiController());
	app.use("/chatroom/v1/rooms", roomsApiController(io));
	app.use("/chatroom/v1/img", express.static(__dirname + "/img"));
};
