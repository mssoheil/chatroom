var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const environment = process.env.NODE_ENV;

const secretCode = process.env.JWT_SECRET;

module.exports = (router, User) => {
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
			});
		});

		newUser
			.save()
			.then(user => {
				var token = jwt.sign({ id: user._id }, secretCode, {
					expiresIn: "10m"
				});
				res.status(200).send({ auth: true, token: token });
			})
			.catch(err => {
				res.status(500).send("could not register user");
				if (environment !== "production") {
					console.log("could not register user", err);
				}
			});
	});
};
