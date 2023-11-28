const DBMS = require('./database.js');
const express = require("express");
const server = express();

//creation of the database
DBMS.start();

//deploy react
server.use(express.static("../client/build")); //questa stringa va sostituita con "../client/build" una volta buildato il progetto  

//all methods that return a response to the client
server.get("/", (req, res) => {
	res.sendFile(path.resolve("../client/build/index.html")); //"../client/build/index.html"
});



const port = 3000;
server.listen(port, () => {
	console.log("http://localhost:" + port);
});
