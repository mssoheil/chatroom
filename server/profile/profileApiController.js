var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const express = require("express");

const router = express.Router();
const User = require("./../models/users.js");
const Room = require("./../models/rooms.js");

const environment = process.env.NODE_ENV;

const formidable = require("formidable");

const shortid = require("shortid");

module.exports = function() {
	router.post("/upload-image", (req, res, next) => {
		let form = new formidable.IncomingForm();

		form.parse(req);

		form.on("fileBegin", function(name, file) {
			let fileType = file.type.split("/").pop();
			let fileNameArray = file.name.split(".");

			let fileExtension = fileNameArray[fileNameArray.length - 1];
			if (fileType === "jpg" || fileType === "png" || fileType === "jpeg") {
				file.path = __dirname + "./../img/" + file.name;
				const randomName = `${shortid.generate()}${shortid.generate()}.${fileExtension}`;

				file.path = `${__dirname}./../img/${randomName}`;

				res.status(200).send({
					fileName: randomName,
					success: true,
					message: "File was successfully savad"
				});
			} else {
				console.log("incorrect file type: " + fileType);
				res.status(200).send({
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
	router.put("/change-profile", (req, res, next) => {
		User.findById(req.body.userId).then(user => {
			if (req.body.changePassword) {
				bcrypt.compare(
					req.body.data.currentPassword,
					user.password,
					(err, matched) => {
						if (err) {
							if (environment !== "production") {
								console.log("Authentication faild", err);
							}
							return;
						}
						if (matched) {
							bcrypt.genSalt(10, (err, salt) => {
								bcrypt.hash(
									req.body.data.password,
									salt,
									(err, hashedPassword) => {
										if (err) {
											if (environment !== "production") {
												console.log("could not create hash", err);
											}
										}
										user.password = hashedPassword;
										user.username = req.body.data.username;
										user.avatar = req.body.data.avatar;
										user.save().then(userSaved => {
											res.status(200).send({
												success: true,
												message: "user profile changed",
												user: { username: user.username, avatar: user.avatar }
											});
										});
									}
								);
							});
						} else {
							return res
								.status(401)
								.send({ success: false, message: "password is not correct" });
						}
					}
				);
			} else {
				user.username = req.body.data.username;
				user.avatar = req.body.data.avatar;
				user.save().then(userSaved => {
					res.status(200).send({
						success: true,
						message: "user profile changed",
						user: { username: user.username, avatar: user.avatar }
					});
				});
			}
		});
	});
	router.get("/check-username", (req, res, next) => {
		User.findOne({ username: req.headers.username }).then(user => {
			if (user) {
				res.status(200).send({
					success: false,
					message: "The username is taken"
				});
				console.log("user exist", user);
			} else {
				res.status(200).send({
					success: true,
					message: "Valid usrname"
				});
				console.log("valid username");
			}
		});
	});
	return router;
};
