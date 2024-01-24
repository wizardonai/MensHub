//processi da far partire
import { execFile } from "child_process";

const fileMysql = execFile("mysql.bat", [], (err, data) => {
	if (err) {
		console.log(err);
	}
});
setTimeout(() => {
	connetti();
}, 2500);

let fileApache;
let fileShell;
process.argv.forEach((item) => {
	if (item === "apache") {
		fileApache = execFile("apache.bat", [], (err, data) => {
			if (err) {
				console.log(err);
			}
		});
	} else if (item === "shell") {
		fileShell = execFile("shell.bat", [], (err, data) => {
			if (err) {
				console.log(err);
			}
		});
	}
});

//altro

import { createConnection } from "mysql";
import express from "express";
//probabilmente da cambiare con express.Router();
import { validate } from "deep-email-validator";
import cors from "cors";
// import open from "open";
import bodyParser from "body-parser";
const { json, urlencoded } = bodyParser;
import jwt from "jsonwebtoken";
const secretKey = "CaccaPoopShitMierda";

const server = express();

let connection;
function connetti() {
	connection = createConnection({
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
}

server.use(cors());
server.use(json());
server.use(urlencoded({ extended: false }));

//deploy react
server.use(express.static("../client/build")); //questa stringa va sostituita con "../client/build" una volta buildato il progetto

//all methods that return a response to the client
server.get("/", (req, res) => {
	res.sendFile(path.resolve("../client/build/index.html")); //"../client/build/index.html"
});

server.use("/image", express.static("../client/src/cliente/pages/image"));

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

				// res.send({
				// 	id: result[0].id,
				// 	nome: result[0].nome,
				// 	cognome: result[0].cognome,
				// 	email: result[0].email,
				// });

				const token = jwt.sign(
					{
						id: result[0].id,
						nome: result[0].nome,
						cognome: result[0].cognome,
						email: result[0].email,
					},
					secretKey,
					{ expiresIn: "1h" }
				);

				// Invia il token al client
				res.json({ token: token });

				res.send();
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

server.post("/request/profile", (req, res) => {
	//controllo che il token di sessione sia valido
	let token = req.headers.authorization;
	if (!token) res.send("Token non trovato");
	else {
		// console.log(token);
		jwt.verify(token.replace("Bearer ", ""), secretKey, (err, decoded) => {
			if (err) {
				console.log(err);
				res.send(err);
			} else {
				// console.log(decoded);
				res.send(decoded);
			}
			res.end();
		});
	}
});

const port = 6969;
server.listen(port, () => {
	// console.log("http://localhost:" + port);
});
