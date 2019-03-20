import servers from "./config";
import urls from "./urls";

let config = servers["localServer"];

const Api = () => {
	const appApi = (category, method, version) => {
		let uri = `${config.protocol}://${config.host}:${config.port}/${
			config.app
		}/${config.version}/${urls[category][method][version]}`;
		return uri;
	};
};

export default Api;
