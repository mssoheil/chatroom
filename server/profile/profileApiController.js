var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const express = require("express");

const router = express.Router();
const User = require("./../models/users.js");
const Room = require("./../models/rooms.js");

const environment = process.env.NODE_ENV;

const formidable = require("formidable");

const shortid = require("shortid");

const fs = require("fs");

module.exports = function() {
	router.post("/upload-image", (req, res, next) => {
		let form = new formidable.IncomingForm();

		form.parse(req);

		form.on("fileBegin", function(name, file) {
			file.path = __dirname + "./../img/" + file.name;
			let fileType = file.type.split("/").pop();
			let fileNameArray = file.name.split(".");

			let fileExtension = fileNameArray[fileNameArray.length - 1];
			if (fileType === "jpg" || fileType === "png" || fileType === "jpeg") {
                const randomName = `${shortid.generate()}${shortid.generate()}.${fileExtension}`;

				file.path = `${__dirname}./../img/${randomName}`;

				res.status(200).send({
					fileName: randomName,
					success: true,
					message: "File was successfully savad"
				});
			} else {
				console.log("incorrect file type: " + fileType);
				res.status(500).send({
					fileName: false,
					success: false,
					message: `Incorrect file type`
				});
			}
		});

		form.on("file", function(name, file) {
			console.log("Uploaded " + file.name);
		});

		form.on("error", function(err) {
			res.status(500).send({
				fileName: false,
				success: false,
				message: `Could not save the file due to ${err}`
			});
		});

	});
	router.post("/change-profile", (req, res, next) => {
		 

	});
	return router;
};
