export default {
	register: {
		post: { v1: "auth/register" }
	},
	login: {
		post: { v1: "auth/login" }
	},
	authentication: {
		get: { v1: "auth/authentication" }
	},
	rooms: {
		get: { v1: "rooms/room" },
		post: { v1: "rooms/room" },
		put: { v1: "rooms/room" },
		delete: { v1: "rooms/room" }
	},
	uploadImage: {
		post: {v1: "profile/upload-image"}
	},
	changeProfile: {
		put: {v1: "profile/change-profile"}
	},
	checkUsername: {
		get: {v1: "profile/check-username"}
	}
};
