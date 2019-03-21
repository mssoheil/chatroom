import axios from "axios";

import api from "../api";

import Reactotron from "reactotron-react-js";

export default new class {
	get(resource, version, header, body, timeout) {
		return this.requestMaker(resource, version, "get", header, body, timeout);
	}

	post(resource, version, header, body, timeout) {
		return this.requestMaker(resource, version, "post", header, body, timeout);
	}

	put(resource, version, header, body, timeout) {
		return this.requestMaker(resource, version, "put", header, body, timeout);
	}

	del(resource, version, header, body, timeout) {
		return this.requestMaker(
			resource,
			version,
			"delete",
			header,
			body,
			timeout
		);
	}

	async requestMaker(url, version, method, header, body, timeout) {
		let res = await axios.request(
			this.configrator(
				api.appApi(url, method, version),
				method,
				header,
				body,
				timeout
			)
		);
		return res.data;
	}

	configrator(url, method, header, body, timeout) {
		let config = {};
		config.baseURL = api.baseUrl();
		config.url = url;

		config.method = method;

		if (header) {
			config.headers = header;
		}

		if (body) {
			config.data = body;
		} else {
			config.data = {};
		}

		if (timeout) {
			config.timeout = timeout;
		}

		config.responseEncoding = "utf8";
		return config;
	}

	handeError(error) {
		if (error.response) {
			this.logger(error.data);
			this.logger(error.status);
			this.logger(error.headers);
			this.logger(error.response);
		} else if (error.request) {
			this.logger(error.request);
		} else {
			this.logger(error.message);
		}
		this.logger(error.config);
	}

	logger(error) {
		console.log(error);
		// if (__DEV__) {
		Reactotron.error(error);
		// }
	}
}();
