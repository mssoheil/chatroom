const jwt = require("jsonwebtoken");

const secretCode = process.env.JWT_SECRET;

const environment = process.env.NODE_ENV;

function verifyToken(req, res, next) {
	var token = req.headers["x-access-token"];

	if (!token) {
		if (environment !== "production") {
		}
		return res.status(403).send({ auth: false, message: "No token provided" });
	}

	jwt.verify(token, secretCode, (err, decoded) => {
		if (err) {
			if (environment !== "production") {
				console.log("Failed to authenticate token", err);
			}
			return res
				.status(500)
				.send({ auth: false, message: "Failed to authenticate token" });
		}
		req.userId = decoded.id;
		next();
	});
}

module.exports = verifyToken;
