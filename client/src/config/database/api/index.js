import servers from "./config";
import urls from "./urls";

let config = servers["localServer"];

export default new class {
	baseUrl = () => {
		let baseUri = `${config.protocol}://${config.host}:${config.port}/${
			config.app
		}/${config.version}`;
		return baseUri;
	};
	appApi = (category, method, version) => {
		let uri = `${urls[category][method][version]}`;
		return uri;
	};
}();
