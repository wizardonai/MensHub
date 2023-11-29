const mysql = require("mysql");
const express = require("express");
const server = express();
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
});
connection.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
	connection.changeUser({ database: "mensapp" }, () => {
		if (err) throw new Error(err);
	});
  });

//deploy react
server.use(express.static("../client/build")); //questa stringa va sostituita con "../client/build" una volta buildato il progetto  

//all methods that return a response to the client
server.get("/", (req, res) => {
	res.sendFile(path.resolve("../client/build/index.html")); //"../client/build/index.html"
});

server.post("/request/products", (req,res) => {
	console.log("sono dentro");
	connection.query("SELECT * FROM prodotti", function (err, result, fields) {
		if (err) throw err;
		res.header("Access-Control-Allow-Origin", "*");
		res.send(result);
		res.end();
	});
});

const port = 6969;
server.listen(port, () => {
	console.log("http://localhost:" + port);
});