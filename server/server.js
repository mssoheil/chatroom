require("dotenv").config();
const app = require("./app.js");

const port = process.env.PORT || 1004;

app.listen(port, () => {
	if (process.env.NODE_ENV !== "production") {
		console.log(`listening on port ${port}`);
	}
});
