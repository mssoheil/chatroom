require("dotenv").config();

const express = require("express");
const app = express();

const appController = require("./app.js");

const port = process.env.PORT || 1004;

if (process.env.NODE_ENV === "production") {
	app.use(express.static("./../client/build"));
}

const server = app.listen(port, () => {
	if (process.env.NODE_ENV !== "production") {
		console.log(`listening on port ${port}`);
	}
});

appController(app, server);
