var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const express = require("express");

const router = express.Router();
const User = require("./../models/users.js");

const VerifyToken = require("./VerifyToken");

const environment = process.env.NODE_ENV;

const secretCode = process.env.JWT_SECRET;

router.post("/register", (req, res) => {
	const username = req.body.email.split("@")[0];
	const newUser = new User({
		username: username,
		email: req.body.email,
		password: req.body.password
	});
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
			if (err) {
				if (environment !== "production") {
					console.log("courld not create hash", err);
				}
			}
			newUser.password = hashedPassword;

			newUser
				.save()
				.then(user => {
					var token = jwt.sign({ id: user._id }, secretCode, {
						expiresIn: "1d"
					});
					res.status(200).send({ auth: true, token: token });
				})
				.catch(err => {
					res.status(500).send("could not register user" + err);
					if (environment !== "production") {
						console.log("could not register user", err);
					}
				});
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
				return res.status(404).send("No user found");
			}
			bcrypt.compare(req.body.password, user.password, (err, matched) => {
				if (err) {
					return console.log(err);
				}
				if (matched) {
					const token = jwt.sign({ id: user._id }, secretCode, {
						expiresIn: 86400
					});
					res.status(200).send({ auth: true, token: token });
				} else {
					return res.status(401).send({ auth: false, token: null });
				}
			});
		})
		.catch(err => {
			if (environment !== "production") {
				console.log("Could not login", err);
			}
			res.status(500).send("Could not login");
		});
});

router.get("/authentication", VerifyToken, (req, res, next) => {
	User.findById(req.userId, { password: 0 })
		.then(user => {
			if (!user) {
				return res.status(404).send("No user found");
			}
			res.status(200).send(user);
		})
		.catch(err => {
			return res.status(500).send("There was a problem finding the user");
		});
});

module.exports = router;
