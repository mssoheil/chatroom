require('dotenv').config();
const app = require("./app.js");

const port = process.env.PORT || 1004;

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
