import { observable, action } from "mobx";

export default class UsersInRoom {
	@observable
    username = "";
    
    @observable
    usersPerRoom = [];

	@action
	changeUsername(val, socket) {
		this.username = val;
		socket.on("getSocketUsername", packet => {
			socket.emit("receiveUsername", {
				socketId: packet,
				username: this.username
			});
		});
		socket.on("socketsInRoom", packet => {
			 let entitiesArr = [];
			 let entities = Object.entries(packet.sockets);
			 entities.map(item => {
				entitiesArr.push({
                    room: packet.room,
					socketId: item[0],
					username: item[1]
				});
             });

             this.usersPerRoom = entitiesArr;
             
		});
	}
}
