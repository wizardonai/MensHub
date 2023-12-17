import { createConnection } from "mysql";
import express from "express";
//probabilmente da cambiare con express.Router();
import { validate } from "deep-email-validator";
import cors from "cors";
import bodyParser from "body-parser";
const { json, urlencoded } = bodyParser;

const server = express();

server.use(cors());
server.use(json());
server.use(urlencoded({ extended: false }));

//creo connessione con il database
const connection = createConnection({
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

	connection.query(
		"SELECT * FROM prodotti where id_mensa=" + data.idm,
		(err, result) => {
			if (err) throw new Error(err);
			res.header("Access-Control-Allow-Origin", "*");
			res.send(result);
			res.end();
		}
	);
});

server.post("/send/cart", (req, res) => {
	console.log("-----------------");
	console.log("carrello");

	let data = req.body.carrello;
	console.log(data);
	let query = `INSERT INTO ordini (id_mensa, str_prod, quantita) VALUES(${data[0].id_mensa},"`;
	data.forEach((item, index) => {
		query += `${item.id}`;
		if (index !== data.length - 1) query += ",";
	});
	query += `","`;
	data.forEach((item, index) => {
		query += `${item.quantita}`;
		if (index !== data.length - 1) query += ",";
	});
	query += `");`;
	console.log(query);
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

server.post("/register/user", async function (req, res) {
	console.log("-----------------");
	console.log("registrazione utente");
	//forse si può provare anche con questa sintassi : const {email, password} = req.body; e poi usare email e password come variabili
	// let nome = req.body.nome;
	// let cognome = req.body.cognome;
	// let email = req.body.email;
	// let password = req.body.password;
	// let confirm_password = req.body.confirm_password;

	const { nome, cognome, email, password, confirm_password } = req.body;

	if (!email || !password) {
		// return res.status(400).send({
		// 	message: "email o password mancante.",
		// });
		res.send("Email o password mancante!");
		res.end();
	}
	if (password !== confirm_password) {
		// return res.status(400).send({
		// 	message: "le password non combaciano.",
		// });
		res.send("Le password non combaciano!");
		res.end();
	}
	const { valid, reason, validators } = await validate(email);

	if (valid) {
		//inserisci dati nel database
		let query = `INSERT INTO utenti (nome,cognome,email,password) VALUES('${nome}','${cognome}','${email}','${password}');`;
		// console.log(query);
		connection.query(query, (err, result) => {
			if (err) throw new Error(err);
			res.header("Access-Control-Allow-Origin", "*");
			res.send("Registrazione avvenuta con successo");
			res.end();
		});
	} else {
		console.log("EMAIL NON VALIDA");
		// return res.status(400).send({
		// 	message: "Please provide a valid email address.",
		// 	reason: validators[reason].reason,
		// });
		res.send("Email non valida!");
		res.end();
	}
});

server.post("/login/user", async function (req, res) {
	console.log("-----------------");
	console.log("login");
	let email = req.body.email;
	let password = req.body.password;

	const { valid, reason, validators } = await validate(email);
	if (valid) {
		let query = `SELECT * FROM utenti WHERE email="${email}" AND password="${password}";`;
		connection.query(query, (err, result) => {
			if (err) throw new Error(err);
			res.header("Access-Control-Allow-Origin", "*");
			if (result.length === 1) {
				//bisogna creare tutti i dati di sessione per aprire la sessione con l'utente appunto
				console.log("Login effettuato");
				res.send("Login effettuato");
				res.end();
			} else {
				res.send("Utente non trovato");
				res.end();
			}
		});
	} else {
		console.log("Email non valida!");
		// return res.status(400).send({
		// 	message: "Please provide a valid email address.",
		// 	reason: validators[reason].reason,
		// });
		res.send("Email non valida!");
		res.end();
	}
});

const port = 6969;
server.listen(port, () => {
	console.log("http://localhost:" + port);
});
