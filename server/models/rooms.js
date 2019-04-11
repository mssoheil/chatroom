const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RoomSchema = Schema({
	name: {
		type: String,
		unique: true
	}
});

module.exports = mongoose.model("rooms", RoomSchema);
