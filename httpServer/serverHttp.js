const cors = require("cors");
const bodyParser = require("body-parser");
const { json, urlencoded } = bodyParser;
const express = require("express");

const server = express();

server.use(cors());
server.use(json());
server.use(urlencoded({ extended: false }));

server.use("/image", express.static("../client/src/cliente/pages/image"));

server.listen(1234, () => {
	console.log("avviato");
});
