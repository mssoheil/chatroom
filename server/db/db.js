const mongoose = require("mongoose");



mongoose.connect(process.env.MONGO_ATLAS_CONN_URL, { useNewUrlParser: true });

const environment = process.env.NODE_ENV;
mongoose.connection
	.once("open", () => {
		if (environment !== "production") {
			console.log("connected");
		}
	})
	.on("error", err => {
		if (environment !== "production") {
			console.log('could not connect', err);
		}
    });
    

