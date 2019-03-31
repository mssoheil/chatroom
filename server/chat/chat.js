const Rooms = require("./../models/rooms.js");

module.exports = function(io) {
	io.on("connection", socket => {
		console.log(socket.id);
		socket.join(process.env.DEFAULT_ROOM);
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
							message: "left the room"
						});
					}
				})
				.catch(err => {
					console.log("room not found", err);
				});
		});

		socket.on("disconnect", function() {
			io.emit("user disconnected");
		});
	});
};
