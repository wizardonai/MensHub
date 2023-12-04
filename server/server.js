const mysql = require("mysql");
const express = require("express");
const server = express();
const cors = require('cors');
const bodyParser = require('body-parser')


server.use(cors());
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: false }))

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
});
connection.connect(function (err) {
	if (err) throw new Error(err);
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

server.post("/request/products", (req, res) => {
	let data = req.body;

	connection.query("SELECT * FROM prodotti where id_mensa=" + data.idm, (err, result) => {
		if (err) throw new Error(err);
		res.header("Access-Control-Allow-Origin", "*");
		res.send(result);
		res.end();
	});
});

server.post("/send/cart", (req, res) => {
	console.log("-----------------");
	console.log("carrello");

	let data = req.body.carrello;
	console.log(data);
	let query = `INSERT INTO ordini (id_mensa, str_prod) VALUES(${data[0].id_mensa},"`;
	data.forEach((item, index) => {
		query += `${item.id}`;
		if (index !== data.length - 1)
			query += ",";
	});
	query += `");`;
	connection.query(query, (err, result) => {
		if (err) throw new Error(err);
		res.header("Access-Control-Allow-Origin", "*");
		res.send("Ordine aggiunto");
		res.end();
	});



	// connection.query("SELECT * FROM prodotti where id_mensa="+data.idm, (err, result) => {
	// 	if (err) throw new Error(err);
	// 	console.log(result);
	// 	res.header("Access-Control-Allow-Origin", "*");
	// 	res.send(result);
	// 	res.end();
	// });
});


const port = 6969;
server.listen(port, () => {
	console.log("http://localhost:" + port);
});
