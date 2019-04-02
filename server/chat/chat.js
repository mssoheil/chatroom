const Rooms = require("./../models/rooms.js");
/** @todo on connect get username from client to broadcast in default room */
module.exports = function(io) {
	io.on("connection", socket => {
		console.log(socket.id);
		var socketId = socket.id;

		const promise = new Promise((resolve, reject) => {
			socket.join(process.env.DEFAULT_ROOM);
			Rooms.findOne({ name: process.env.DEFAULT_ROOM })
				.then(room => {
					if (room) {
						socket.broadcast.to(process.env.DEFAULT_ROOM).emit("chatMessage", {
							room: room,
							username: "new user",
							message: "joined the room"
						});
						let sockets =
							io.sockets.adapter.rooms[process.env.DEFAULT_ROOM].sockets;
						let socketsInRoom = Object.keys(sockets);
						setTimeout(() => {
							socketsInRoom.map(item => {
								let itemSocketId = item;
								io.to(`${itemSocketId}`).emit("getSocketUsername", item);
								socket.on("receiveUsername", packet => {
									sockets[packet.socketId] = packet.username;
									io.to(`${itemSocketId}`).emit("socketsInRoom", {
										room: room,
										sockets: sockets
									});
								});
							});
						}, 1000);

						// Object.keys(io.sockets.adapter.sids[socket.id]);
						// // returns [socket.id, room-x'] || [socket.id, 'room-1', 'room-2', ...]
					}
				})
				.catch(err => {
					console.log("room not found", err);
				});
			// socket.broadcast.to(process.env.DEFAULT_ROOM).emit("chatMessage", {
			// 	username: "new user",
			// 	message: "joined the room"
			// });
			// setTimeout(() => {
			// 	io.to(`${socketId}`).emit("requestUsername", socketId);
			// 	socket.on("responeUsername", packet => {
			// 		socket.broadcast.to(process.env.DEFAULT_ROOM).emit("chatMessage", {
			// 			username: packet.username,
			// 			message: "joined the room"
			// 		});
			// 	});
			// 	resolve("done");
			// }, 1000);
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
			io.to(packet.room.name).emit("chatMessage", { ...packet, id: socket.id });
		});

		socket.on("joinRoom", packet => {
			Rooms.findOne({ _id: packet.room["_id"] })
				.then(room => {
					if (room) {
						socket.join(packet.room.name);

						socket.broadcast.to(packet.room.name).emit("chatMessage", {
							room: room,
							username: packet.username,
							message: "joined the room"
						});
						let sockets = io.sockets.adapter.rooms[room.name].sockets;
						let socketsInRoom = Object.keys(sockets);

						socketsInRoom.map(item => {
							let itemSocketId = item;
							io.to(`${itemSocketId}`).emit("getSocketUsername", item);
							socket.on("receiveUsername", packet => {
								sockets[packet.socketId] = packet.username;
								// io.to(`${itemSocketId}`).emit("socketsInRoom", {
								// 	room: room,
								// 	sockets: sockets
								// });
							});
						});
					}
				})
				.catch(err => {
					console.log("room not found", err);
				});
		});

		socket.on("receiveUsernameRoomSwitch", packet => {
			Rooms.findOne({ _id: packet.room["_id"] })
				.then(room => {
					if (room) {
						let sockets = io.sockets.adapter.rooms[room.name].sockets;
						let socketsInRoom = Object.keys(sockets);
						setTimeout(() => {
							socketsInRoom.map(item => {
								let itemSocketId = item;
								io.to(`${itemSocketId}`).emit("getSocketUsername", item);
								socket.on("receiveUsername", packet => {
									sockets[packet.socketId] = packet.username;
									io.to(`${itemSocketId}`).emit("socketsInRoom", {
										room: room,
										sockets: sockets
									});
								});
							});
						}, 1000);

						// Object.keys(io.sockets.adapter.sids[socket.id]);
						// // returns [socket.id, room-x'] || [socket.id, 'room-1', 'room-2', ...]
					}
				})
				.catch(err => {
					console.log("room not found", err);
				});
		});

		socket.on("privateMessage", packet => {
			io.to(`${packet.to.socketId}`).emit("privateCame", {
				message: `${packet.from.username} wants to send private message to you`,
				to: packet.to,
				from: packet.from
			});
		});
		socket.on("confirmedPrivate", packet => {
			console.log("confirmed", packet);
			io.to(`${packet.from.socketId}`).emit("confirmedPrivateChat", {
				message: `${packet.to.username} accepted your request`,
				to: packet.to,
				from: packet.from
			});
		});
		socket.on("refusedPrivate", packet => {
			console.log("refused", packet);
			io.to(`${packet.from.socketId}`).emit("refusedPrivateChat", {
				message: `${packet.to.username} refused your request`,
				to: packet.to,
				from: packet.from
			});
		});

		socket.on("leaveRoom", packet => {
			Rooms.findOne({ _id: packet.room["_id"] })
				.then(room => {
					if (room) {
						socket.leave(packet.room.name);
						socket.broadcast.to(packet.room.name).emit("chatMessage", {
							room: room,
							username: packet.username,
							message: "left the room"
						});
						let sockets = io.sockets.adapter.rooms[room.name].sockets;
						let socketsInRoom = Object.keys(sockets);

						socketsInRoom.map(item => {
							let itemSocketId = item;
							io.to(`${itemSocketId}`).emit("getSocketUsername", item);
							socket.on("receiveUsername", packet => {
								sockets[packet.socketId] = packet.username;
								io.to(`${itemSocketId}`).emit("socketsInRoom", {
									room: room,
									sockets: sockets
								});
							});
						});
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
