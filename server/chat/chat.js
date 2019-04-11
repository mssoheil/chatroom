const Rooms = require("./../models/rooms.js");
const Users = require("./../models/users.js");
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
							isInformative: true,
							username: "new user",
							message: "joined the room",
							time: `${new Date().getHours()}:${new Date().getMinutes()}`
						});
						let sockets =
							io.sockets.adapter.rooms[process.env.DEFAULT_ROOM].sockets;
						let socketsInRoom = Object.keys(sockets);
						setTimeout(() => {
							socketsInRoom.map(item => {
								let itemSocketId = item;
								io.to(`${itemSocketId}`).emit("getSocketUsername", item);
								socket.on("receiveUsername", packet => {
									sockets[packet.socketId] = {
										username: packet.username,
										avatar: packet.avatar,
										socketId: packet.socketId,
										time: `${new Date().getHours()}:${new Date().getMinutes()}`
									};
									io.to(`${itemSocketId}`).emit("socketsInRoom", {
										room: room,
										sockets: sockets,
										time: `${new Date().getHours()}:${new Date().getMinutes()}`
									});
								});
							});
						}, 1000);
					}
				})
				.catch(err => {
					console.log("room not found", err);
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
			io.to(packet.room.name).emit("chatMessage", {
				...packet,
				id: socket.id,
				isInformative: false,
				time: `${new Date().getHours()}:${new Date().getMinutes()}`
			});
		});

		socket.on("joinRoom", packet => {
			Rooms.findOne({ _id: packet.room["_id"] })
				.then(room => {
					if (room) {
						socket.join(packet.room.name);
						let sockets = io.sockets.adapter.rooms[room.name].sockets;
						let socketsInRoom = Object.keys(sockets);

						socket.broadcast.to(packet.room.name).emit("chatMessage", {
							room: room,
							username: packet.username,
							isInformative: true,
							message: "joined the room",
							time: `${new Date().getHours()}:${new Date().getMinutes()}`
						});

						socketsInRoom.map(item => {
							let itemSocketId = item;
							io.to(`${itemSocketId}`).emit("getSocketUsername", item);
							socket.on("receiveUsername", packetInner => {
								sockets[packetInner.socketId] = packetInner.username;
							});
							var tempSockets;
							setTimeout(() => {
								let promise = new Promise((resolve, reject) => {
									socketsInRoom.map((item, index) => {
										Users.findOne({
											username: sockets[item].username || sockets[item]
										})
											.then(user => {
												if (user) {
													sockets[item] = {
														username: user.username,
														avatar: user.avatar,
														socketId: item,
														time: `${new Date().getHours()}:${new Date().getMinutes()}`
													};
													tempSockets = sockets;
													if (index === socketsInRoom.length - 1) {
														resolve(tempSockets);
													}
												}
											})
											.catch(err => {
												console.log("user not found");
											});
									});
								});

								promise.then(result => {
									socketsInRoom.map((item, index) => {
										io.to(`${item}`).emit("socketsInRoom", {
											room: room,
											sockets: result,
											time: `${new Date().getHours()}:${new Date().getMinutes()}`
										});
									});
								});
							}, 1000);
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
						var tempSockets;
						setTimeout(() => {
							let promise = new Promise((resolve, reject) => {
								socketsInRoom.map((item, index) => {
									Users.findOne({
										username: sockets[item].username || sockets[item]
									})
										.then(user => {
											if (user) {
												sockets[item] = {
													username: user.username,
													avatar: user.avatar,
													socketId: item,
													time: `${new Date().getHours()}:${new Date().getMinutes()}`
												};
												tempSockets = sockets;
												if (index === socketsInRoom.length - 1) {
													resolve(tempSockets);
												}
											}
										})
										.catch(err => {
											console.log("user not found");
										});
								});
							});

							promise.then(result => {
								socketsInRoom.map((item, index) => {
									io.to(`${item}`).emit("socketsInRoom", {
										room: room,
										sockets: result,
										time: `${new Date().getHours()}:${new Date().getMinutes()}`
									});
								});
							});
						}, 1000);
					}
				})
				.catch(err => {
					console.log("room not found");
				});
		});

		socket.on("privateMessage", packet => {
			io.to(`${packet.to.socketId}`).emit("privateCame", {
				message: `${packet.from.username} wants to send private message to you`,
				to: packet.to,
				from: packet.from,
				time: `${new Date().getHours()}:${new Date().getMinutes()}`,
				isInformative: true
			});
		});
		socket.on("confirmedPrivate", packet => {
			io.to(`${packet.from.socketId}`).emit("confirmedPrivateChat", {
				message: `${packet.to.username} accepted your request`,
				to: packet.to,
				from: packet.from,
				time: `${new Date().getHours()}:${new Date().getMinutes()}`,
				isInformative: true
			});
		});
		socket.on("refusedPrivate", packet => {
			io.to(`${packet.from.socketId}`).emit("refusedPrivateChat", {
				message: `${packet.to.username} refused your request`,
				to: packet.to,
				from: packet.from,
				time: `${new Date().getHours()}:${new Date().getMinutes()}`,
				isInformative: true
			});
		});

		socket.on("leftPrivate", packet => {
			io.to(`${packet.otherUser.socketId}`).emit("leftPrivateChat", {
				message: `${packet.currentUser.username} left the private chat`,
				currentUser: packet.currentUser,
				otherUser: packet.otherUser,
				time: `${new Date().getHours()}:${new Date().getMinutes()}`,
				isInformative: true
			});
		});

		socket.on("sendPrivateMessage", packet => {
			io.to(`${packet.to.socketId}`)
				.to(`${packet.from.socketId}`)
				.emit("receivedPrivateMessage", {
					message: `${packet.message}`,
					from: packet.from,
					to: packet.to,
					time: `${new Date().getHours()}:${new Date().getMinutes()}`,
					isInformative: false
				});
		});

		socket.on("leaveRoom", packet => {
			Rooms.findOne({ _id: packet.room["_id"] })
				.then(room => {
					if (room) {
						socket.leave(packet.room.name);
						socket.broadcast.to(packet.room.name).emit("chatMessage", {
							room: room,
							isInformative: true,
							username: packet.username,
							message: "left the room",
							time: `${new Date().getHours()}:${new Date().getMinutes()}`
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
									sockets: sockets,
									time: `${new Date().getHours()}:${new Date().getMinutes()}`
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

		socket.on("disconnected", packet => {
			console.log("disconnected", packet);
			let joinedRooms = Object.keys(socket.rooms).filter(
				item => item != socket.id
			);

			joinedRooms.map(item => {
				Rooms.findOne({ name: item })
					.then(room => {
						if (room) {
							socket.leave(item);
							socket.broadcast.to(item).emit("chatMessage", {
								room: room,
								isInformative: true,
								username: packet.username,
								message: "left the room",
								time: `${new Date().getHours()}:${new Date().getMinutes()}`
							});
							let sockets = io.sockets.adapter.rooms[room.name].sockets;
							let socketsInRoom = Object.keys(sockets);

							socketsInRoom.map(itemInner => {
								let itemSocketId = itemInner;
								io.to(`${itemSocketId}`).emit("getSocketUsername", itemInner);
								socket.on("receiveUsername", packet => {
									sockets[packet.socketId] = packet.username;
									io.to(`${itemSocketId}`).emit("socketsInRoom", {
										room: room,
										sockets: sockets,
										time: `${new Date().getHours()}:${new Date().getMinutes()}`
									});
								});
							});
						}
					})
					.catch(err => {
						console.log("room not found", err);
					});

				packet.connectedUsers.map(item => {
					io.to(`${item.socketId}`).emit("leftPrivateChat", {
						message: `${packet.username} left the private chat`,
						currentUser: {
							username: packet.username,
							socketId: socket.id
						},
						otherUser: item,
						time: `${new Date().getHours()}:${new Date().getMinutes()}`,
						isInformative: true
					});
				});
			});
		});
	});
};
