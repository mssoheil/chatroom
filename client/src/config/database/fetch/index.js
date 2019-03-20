import axios from "axios";

import api from "../api";

const axiosFetch = () => {
	function get(resource, version, header, body, timeout) {
		return requestMaker(resource, version, "get", header, body, timeout);
	}

	function post(resource, version, header, body, timeout) {
		return requestMaker(resource, version, "post", header, body, timeout);
	}

	function put(resource, version, header, body, timeout) {
		return requestMaker(resource, version, "put", header, body, timeout);
	}

	function del(resource, version, header, body, timeout) {
		return requestMaker(
			resource,
			version,
			"delete",
			header,
			body,
			timeout
		);
	}

	async function requestMaker(url, version, method, header, body, timeout) {
		try {
			let res = await axios.request(
				configrator(
					api.appAPI(url, method, version),
					method,
					header,
					body,
					timeout
				)
			);
			return res.data;
		} catch (e) {
			handeError(e);
			return null;
		}
	}

	function configrator(url, method, header, body, timeout) {
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

	function handeError(error) {
		if (error.response) {
			logger(error.data);
			logger(error.status);
			logger(error.headers);
			logger(error.response);
		} else if (error.request) {
			logger(error.request);
		} else {
			logger(error.message);
		}
		logger(error.config);
	}

	function logger(error) {
		console.log(error);
		// if (__DEV__) {
		 	console.tron.error(error);
		// }
	}
};

export default axiosFetch
