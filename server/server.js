const express = require("express");
const server = express();

//deploy react
server.use(express.static("../client/build"));
server.get("/", (req, res) => {
	res.sendFile(path.resolve("../client/build/index.html"));
});

const port = 3000;
server.listen(port, () => {
	console.log("http://localhost:" + port);
});
