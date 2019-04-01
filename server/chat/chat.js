const Rooms = require("./../models/rooms.js");

module.exports = function(io) {
	io.on("connection", socket => {
		console.log(socket.id);
		var socketId = socket.id;

		const promise = new Promise((resolve, reject) => {
			socket.join(process.env.DEFAULT_ROOM);
			socket.broadcast.to(process.env.DEFAULT_ROOM).emit("chatMessage", {
				username: "new user",
				message: "joined the room"
			});
			resolve("done");
		});

		promise.then(result => {
			setTimeout(() => {
				let joinedRooms = Object.keys(socket.rooms).filter(
					item => item != socket.id
				);
				Rooms.find({ name: { $in: joinedRooms } }).then(room => {
					io.to(`${socketId}`).emit("defaultJoinedRooms", room);
				});
			}, 1000);
		});
		socket.on("chatMessage", packet => {
			io.emit("chatMessage", { ...packet, id: socket.id });
		});

		socket.on("joinRoom", packet => {
			Rooms.find({ _id: packet.room["_id"] })
				.then(room => {
					if (room) {
						socket.join(packet.room.name);
						socket.broadcast.to(packet.room.name).emit("chatMessage", {
							username: packet.username,
							message: "joined the room"
						});

						// Object.keys(io.sockets.adapter.sids[socket.id]);
						// // returns [socket.id, room-x'] || [socket.id, 'room-1', 'room-2', ...]
					}
				})
				.catch(err => {
					console.log("room not found", err);
				});
		});

		socket.on("leaveRoom", packet => {
			Rooms.find({ _id: packet.room["_id"] })
				.then(room => {
					if (room) {
						socket.leave(packet.room.name);
						socket.broadcast.to(packet.room.name).emit("chatMessage", {
							username: packet.username,
							message: "left"
						});

						// Object.keys(io.sockets.adapter.sids[socket.id]);
						// // returns [socket.id, room-x'] || [socket.id, 'room-1', 'room-2', ...]
					}
				})
				.catch(err => {
					console.log("room not found", err);
				});
		});

		socket.on("getJoinedRooms", packet => {
			let joinedRooms = Object.keys(socket.rooms).filter(
				item => item != socket.id
			);

			console.log("DF", joinedRooms);

			Rooms.find({ name: { $in: joinedRooms } }).then(room => {
				io.to(`${socketId}`).emit("joinedRooms", room);
			});
		});

		// Rooms.find({
		// 	name: Object.keys(socket.rooms).filter(item => item != socket.id)
		// })
		// 	.then(room => {
		// 		if (room) {
		// 			io.to(`${socketId}`).emit("joinedRooms", room);
		// 		}
		// 	})
		// 	.catch(err => {
		// 		console.log("room not found", err);
		// 	});

		// socket.on("leaveRoom", packet => {
		// 	Rooms.find({ _id: packet.room["_id"] })
		// 		.then(room => {
		// 			if (room) {
		// 				socket.leave(packet.room.name);
		// 				socket.broadcast.to(packet.room.name).emit("chatMessage", {
		// 					username: packet.username,
		// 					message: "left the room"
		// 				});
		// 			}
		// 		})
		// 		.catch(err => {
		// 			console.log("room not found", err);
		// 		});
		// });

		socket.on("disconnect", function() {
			io.emit("user disconnected");
		});
	});
};
