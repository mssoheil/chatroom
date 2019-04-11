const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = Schema({
	username: {
		type: String,
		unique: true,
		trim: true
	},
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
		minlength: 2
	},
	gender: {
		type: String
	},
	avatar: {
		type: String
	}
});

module.exports = mongoose.model("users", UserSchema);
