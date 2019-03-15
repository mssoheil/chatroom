const express = require("express");

const routes = require("./routes/index.js");

const authController = require("./auth/authController.js");


const db = require("./db/db.js");

const helmet = require("helmet");

//const logger = require("morgan");

const bodyParser = require("body-parser");

const urlEncoded = bodyParser.urlencoded({ extended: true });
const jsonParser = bodyParser.json();

const app = express();

const router = express.Router();
const User = require("./models/users.js");

app.use(helmet());

app.use(urlEncoded);
app.use(jsonParser);

const environment = process.env.NODE_ENV;

// if (environment !== "production") {
// 	app.use(logger("dev"));
// }

app.use("/api/v1", routes(router));

app.use("/api/v1/auth", authController);



module.exports = app;
