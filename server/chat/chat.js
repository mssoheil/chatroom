module.exports = function(io) {
	io.on("connection", socket => {
		console.log(socket.id);
		socket.join(process.env.DEFAULT_ROOM);
		socket.on("chatMessage", packet => {
			io.emit("chatMessage", { ...packet, id: socket.id });
		});
	});
};
