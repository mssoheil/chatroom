const express = require("express");

const router = express.Router();

const Rooms = require("./../../models/rooms.js");

module.exports = function(io) {
	router.get("/room", (req, res) => {
		let defaultRooms = [];
		let promise = new Promise((resolve, reject) => {
			Rooms.find({ name: process.env.DEFAULT_ROOM })
				.then(room => {
					if (!room) {
						defaultRoom = false;
						resolve("done!");
					}
					defaultRooms = room;
					resolve("done!");
				})
				.catch(err => {
					defaultRoom = false;
					resolve("done!");
				});
		});

		promise.then(result => {
			Rooms.find({})
				.then(rooms => {
					res.status(200).send({
						roomExist: true,
						rooms: rooms,
						defaultRooms: defaultRooms
					});
				})
				.catch(err => {
					console.log("allRoomsErr", err);
					res.status(404).send({
						roomExist: false,
						message: "room not found",
						defaultRooms: false
					});
				});
		});
	});

	router.put("/room", (req, res) => {
		Rooms.findOne({ name: req.body.previousName }).then(room => {
			room.name = req.body.newName;
			room
				.save()
				.then(room => {
					res.status(200).send({
						room: room,
						message: `room name ${req.body.previousName} changed to ${
							room.name
						}`
					});
				})
				.catch(err => {
					console.log("putRoomErr", err);
					res.status(404).send({ room: false, message: "room not found" });
				});
		});
	});

	router.post("/room", (req, res, next) => {
		const newRoom = new Rooms({
			name: req.body.name
		});

		newRoom
			.save()
			.then(room => {
				res.status(200).send({
					room: room,
					roomExist: false,
					message: `${room.name} created successfull`
				});
			})
			.catch(err => {
				res.status(500).send({
					room: false,
					roomExist: true,
					message: `Room already exists`
				});
				console.log("createRoomErr", err);
			});
	});

	router.delete("/room", (req, res) => {
		Rooms.findOne({ name: req.body.name })
			.then(room => {
				room.remove().then(roomRemoved => {
					res.status(200).send({
						room: roomRemoved,
						message: `Room ${room.name} removed successfully`
					});
				});
			})
			.catch(err => {
				console.log("removeRoomErr", err);
				res.status(400).send({
					room: false,
					message: `Room not found`
				});
			});
	});
	return router;
};
