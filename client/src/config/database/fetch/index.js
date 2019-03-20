import axios from "axios";

import api from "../api";

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
		try {
			let res = await axios.request(
				this.configrator(
					api.appAPI(url, method, version),
					method,
					header,
					body,
					timeout
				)
			);
			return res.data;
		} catch (e) {
			this.handeError(e);
			return null;
		}
	}

	configrator(url, method, header, body, timeout) {
		let config = {};

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
		if (__DEV__) {
			console.tron.error(error);
		}
	}
}();
