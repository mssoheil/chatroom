var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const express = require("express");

const router = express.Router();
const User = require("./../models/users.js");
const Room = require("./../models/rooms.js");

const VerifyToken = require("./VerifyToken");

const environment = process.env.NODE_ENV;

const secretCode = process.env.JWT_SECRET;

module.exports = function(io) {
	router.post("/register", (req, res) => {
		let username = req.body.email.split("@")[0];
		let cnt = 0;
		let promise = new Promise((resolve, reject) => {
			User.countDocuments({}, (err, count) => {
				if (count > 0) {
					cnt = count;
					resolve("done!");
				} else {
					cnt = 0;
					resolve("done!");
				}
			});
		});
		promise.then(result => {
			User.findOne({ email: req.body.email }).then(userFound => {
				if (userFound) {
					res.status(200).send({
						register: false,
						message: "Email is already exist"
					});
				} else {
					const newUser = new User({
						username: `user${cnt}`,
						email: req.body.email,
						password: req.body.password,
						gender: "male",
						avatar: "default.png"
					});
					bcrypt.genSalt(10, (err, salt) => {
						bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
							if (err) {
								if (environment !== "production") {
									console.log("could not create hash", err);
								}
							}
							newUser.password = hashedPassword;

							newUser
								.save()
								.then(user => {
									res.status(200).send({
										register: true,
										message: `User ${user.username} created successfull`
									});
								})
								.catch(err => {
									res.status(500).send({
										register: false,
										message: "could not register user",
										error: err.errmsg
									});
									if (environment !== "production") {
										console.log("could not register user", err);
									}
								});
						});
					});
				}
			});
		});
	});

	router.post("/login", (req, res) => {
		User.findOne({
			email: req.body.email
		})
			.then(user => {
				if (!user) {
					if (environment !== "production") {
						console.log("No user found", err);
					}
					return res
						.status(404)
						.send({ auth: false, message: "No user found" });
				}
				bcrypt.compare(req.body.password, user.password, (err, matched) => {
					if (err) {
						if (environment !== "production") {
							console.log("Authentication faild", err);
						}
						return;
					}
					if (matched) {
						const token = jwt.sign({ id: user._id }, secretCode, {
							expiresIn: 86400
						});
						res.status(200).send({
							auth: true,
							token: token,
							message: `welcome ${user.username}`
						});
					} else {
						return res.status(401).send({ auth: false, token: null });
					}
				});
			})
			.catch(err => {
				if (environment !== "production") {
					console.log("Could not login", err);
				}
				res.status(500).send({ auth: false, message: "Could not login" });
			});
	});

	router.get("/authentication", VerifyToken, (req, res, next) => {
		User.findById(req.userId, { password: 0 })
			.then(user => {
				if (!user) {
					return res
						.status(404)
						.send({ auth: false, message: "No user found" });
				}
				return res
					.status(200)
					.send({ auth: true, user: user, message: "No user found" });
			})
			.catch(err => {
				return res.status(500).send({
					auth: false,
					message: "There was a problem finding the user"
				});
			});
	});
	return router;
};
