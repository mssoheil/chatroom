const express = require("express");

const router = express.Router();

const Rooms = require("./../../models/rooms.js");

module.exports = function(io) {
	router.get("/allRooms", (req, res) => {
		Rooms.find({})
			.then(rooms => {
				res.status(200).send({ roomExist: true, rooms: rooms });
			})
			.catch(err => {
				console.log(err);
				res.status(404).send({ roomExist: false, message: "room not found" });
			});
	});

	router.put("/room", (req, res) => {
		console.log("RRR", req.body.previousName, req.body.newName);
		Rooms.findOne({ name: req.body.previousName }).then(room => {
			console.log("NNNNAME", room);
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
					console.log(err);
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
					message: `Room ${room.name} created successfull`
				});
			})
			.catch(err => {
				res.status(500).send({
					room: false,
					message: `Room already exists`
				});
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
