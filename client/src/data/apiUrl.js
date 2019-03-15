//Config to set apis url

export default class ApiUrl {
	url = null;
	constructor() {
		this.url = {
			protocol: "http",
			host: "localhost",
			port: "6464",
			app: "api",
			res: {
				authentication: {
					login: { v1: "login", v2: "login" },
					register: { v1: "register", v2: "register" },
					authentication: { v1: "authentication", v2: "authentication" }
				}
			}
		};
	}

	getURL(resource, method, version) {
		for (var i = 0; i < querry.length; i++) {
			q += `${querry[i]}&`;
		}
		var res = this.url.res[resource][method][version];
		var uri = `${this.url.protocol}://${this.url.host}:${this.url.port}/${
			this.url.app
		}/${version}/${res}`;
		return uri;
	}
}
