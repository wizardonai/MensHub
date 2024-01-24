//processi da far partire
import { execFile } from "child_process";
const fileMysql = execFile("mysql.bat", [], (err, data) => {
	if (err) {
		console.log(err);
	}
});



// setTimeout(() => {
// 	connetti();
// }, 500);

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

let connection = "";
//altro

import { createConnection } from "mysql";
import express from "express";
import multer from "multer";
import jwt from 'jsonwebtoken';
import { validate } from "deep-email-validator";
import cors from "cors";
import bodyParser from "body-parser";
import fs from "fs";


const { json, urlencoded } = bodyParser;
const server = express();
import path from 'path';
import { Console } from "console";

// Configura multer per salvare i file caricati nella cartella 'images'
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, '../client/src/cliente/pages/image')
	},
	filename: function (req, file, cb) {
		const nome = req.body.nome; // Assicurati che la tua richiesta contenga un campo 'id'
		const id_utente = req.body.id_utente;
		cb(null, 'products/' + nome + '_' + id_utente + path.extname(file.originalname));
	}
})

const upload = multer({ storage: storage })
const secretKey = 'CaccaPoopShitMierda';

connetti();

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
server.use(express.json());
server.use(urlencoded({ extended: false }));

//deploy react
server.use("/image", express.static("../client/src/cliente/pages/image"));
server.use(express.static("../client/build"));

//all methods that return a response to the client
server.get("/", (req, res) => { //hosto la pagina sullo stesso sito
	res.sendFile(path.resolve("../client/build/index.html")); //"../client/build/index.html"
});

//RI\CEZIONE DATI CON MULLER (form-data) ESEMPIO

/*server.post('/upload', upload.fields([]), (req, res) => {
	// req.body conterrà i dati del form
	console.log(req.body);

	res.send('Dati di testo ricevuti con successo!');
});*/

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

	let query = `INSERT INTO ordini (id_mensa, str_prod, quantita, stato_ordine) VALUES(${data[0].id_mensa},"`;
	data.forEach((item, index) => {
		query += `${item.id}`;
		if (index !== data.length - 1) query += ",";
	});
	query += `","`;
	data.forEach((item, index) => {
		query += `${item.quantita}`;
		if (index !== data.length - 1) query += ",";
	});

	query += `","attivo");`; //da aggiungere id_utente
	console.log(query);
	connection.query(query, (err, result) => {
		if (err) throw new Error(err);
		res.header("Access-Control-Allow-Origin", "*");
		res.send("Ordine aggiunto");
		res.end();
	});

});

server.post("/register/user", async function (req, res) {
	console.log("-----------------");
	console.log("registrazione utente");

	const { nome, cognome, email, password, confirm_password, is_produttore, id_mensa } = req.body;
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
	//controllo che la mail non sia già presente NON FUNZIONA NON CONCATENA EMAIL
	let query = `SELECT * FROM utenti WHERE email="${email}";`;
	connection.query(query, (err, result) => {
		if (err) throw new Error(err);
		console.log(result);
		if (result.length > 0) {
			res.send("email già presente");
			res.end
		}
	});

	const { valid, reason, validators } = await validate(email);

	if (valid) {
		if (is_produttore) {
			let query = `INSERT INTO utenti (nome,cognome,email,password,id_mensa,cliente) VALUES('${nome}','${cognome}','${email}','${password}','${id_mensa}','${is_produttore}');`;
		} else {
			let query = `INSERT INTO utenti (nome,cognome,email,password) VALUES('${nome}','${cognome}','${email}','${password}');`;
		}
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
			//res.header("Access-Control-Allow-Origin", "*");
			if (result.length === 1) {
				//bisogna creare tutti i dati di sessione per aprire la sessione con l'utente appunto
				console.log("Login effettuato");
				console.log("Id=" + result[0].id);
				const token = jwt.sign({
					id: result[0].id,
					nome: result[0].nome,
					cognome: result[0].cognome,
					email: result[0].email,
				}, secretKey, { expiresIn: '1h' });

				res.json({ token: token })

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


server.post("/request/profile", upload.fields([]), (req, res) => {
	//controllo che il token di sessione sia valido
	let token = req.headers.authorization;
	if (!token)
		res.send("Token non trovato");
	else {
		console.log(token);
		jwt.verify(token.replace('Bearer ', ''), secretKey, (err, decoded) => {
			if (err) {
				console.log(err);
				res.send(err);
			} else {
				console.log(decoded);
				res.send(decoded);
			}
			res.end();
		});
	}
});

server.post("/request/orders", (req, res) => {
	let id_utente = req.body.id_ut;
	console.log("richiesta ordini per utente ->" + id_utente);
	console.log("================")
	let query = `SELECT * FROM utenti WHERE id_utente="${id_utente}" AND stato_ordine="attivo"`;
	connection.query(query, (err, result) => {
		if (err) throw new Error(err);
		console.log(result);
		if (result.length > 0) {
			res.send(result);
			res.end();
		} else {
			res.send("l'utente non ha ordini attivi");
			res.end();
		}
	});
});

//da aggiungere token negli header da uasard
server.post("/producer/get/products", (req, res) => {
	let token = req.headers.authorization;
	let id_utente = "";

	jwt.verify(token.replace('Bearer ', ''), secretKey, (err, decoded) => {
		if (err) {
			console.log(err);
			res.send(err);
			res.end();
		} else {
			id_utente = decoded.id;
		}
	});

	let query = `SELECT id_mensa FROM utenti WHERE id="${id_utente};"`;

	connection.query(query, (err, result) => {
		if (err) throw new Error(err);

		const id_mensa = result[0].id_mensa;

		connection.query(
			"SELECT * FROM prodotti where id_mensa=" + id_mensa,
			(err, result) => {
				if (err) throw new Error(err);
				res.header("Access-Control-Allow-Origin", "*");
				res.send(result);
				res.end();
			}
		);
	});

});

//da aggiungere token negli header da uasard
server.post("/producer/get/orders", (req, res) => {
	let token = req.headers.authorization;
	let id_utente = "";

	jwt.verify(token.replace('Bearer ', ''), secretKey, (err, decoded) => {
		if (err) {
			console.log(err);
			res.send(err);
			res.end();
		} else {
			id_utente = decoded.id;
		}
	});

	let query = `SELECT id_mensa FROM utenti WHERE id="${id_utente};"`;

	connection.query(query, (err, result) => {
		if (err) throw new Error(err);

		const id_mensa = result[0].id_mensa;

		connection.query(
			"SELECT * FROM ordini where id_mensa=" + id_mensa,
			(err, result) => {
				if (err) throw new Error(err);
				res.header("Access-Control-Allow-Origin", "*");
				res.send(result);
				res.end();
			}
		);
	});

});

server.post("/producer/add/products", upload.single('image'), (req, res) => {
	const { id_utente, nome, descrizione, allergeni, prezzo, categoria, disponibile } = req.body;
	let id_mensa = "";


	const estensioneFile = req.file.filename.split('.').pop();
	console.log("\n\nFile: " + estensioneFile + "\n\n");

	const queryPromise = new Promise((resolve, reject) => {
		let query = `SELECT id_mensa FROM utenti WHERE id="${id_utente};"`;

		connection.query(query, (err, results) => {
			if (err) {
				console.error(err);
				reject(err);
			} else {
				resolve(results);
			}
		});
	});

	queryPromise
		.then((results) => {
			let id_prodotto = "";
			const id_mensa = results[0].id_mensa;
			console.log("ID Mensa:", id_mensa);


			const queryPromise2 = new Promise((resolve, reject) => {
				let query = `insert into prodotti (nome,descrizione,allergeni,prezzo,categoria,indirizzo_img,disponibile,nacq,id_mensa) VALUES('${nome}','${descrizione}','${allergeni}','${prezzo}','${categoria}','','${disponibile}','0','${id_mensa}');`;
				console.log('\nQUERY INSERT' + query);
				connection.query(query, (err, result) => {
					if (err) {
						console.error(err);
						reject(err);
					} else {
						id_prodotto = result.insertId;
						resolve(results);
					}
				});
			});

			queryPromise2
				.then((results) => {
					let query = `update prodotti SET indirizzo_img= 'products/${id_prodotto}.${estensioneFile}' WHERE nome='${nome}' AND descrizione='${descrizione}' AND prezzo='${prezzo}';`;
					console.log('\nQUERY MODIFICA:' + query);
					connection.query(query, (err, result) => {
						if (err) throw new Error(err);

						console.log("Prodotto modificato");

						renameImage(nome + '_' + id_utente, id_prodotto); //rinominare immagine con id_prodotto
					});

				})
				.catch((error) => {
					console.log(error);
				});
		})
		.catch((error) => {
			console.log(error);
		});



	res.send("Prodotto aggiunto al DB");
});


function renameImage(nome_file, id_prodotto) {


	const cartella = '../client/src/cliente/pages/image/products';
	const nomeFileSenzaEstensione = nome_file;
	console.log("\nNome_file = " + nome_file);

	// Leggi tutti i file nella cartella
	fs.readdir(cartella, (err, files) => {
		if (err) {
			console.error('Errore durante la lettura della cartella:', err);
			return;
		}

		// Cerca il file senza estensione nella lista dei file
		const fileDaRinominare = files.find(file => file.startsWith(nomeFileSenzaEstensione));
		const estensioneFile = path.extname(fileDaRinominare);

		if (fileDaRinominare) {
			const percorsoCompletoAttuale = path.join(cartella, fileDaRinominare);
			const nuovoNomeFileConEstensione = id_prodotto + estensioneFile; // Sostituisci con il nuovo nome e l'estensione desiderati
			const percorsoCompletoNuovo = path.join(cartella, nuovoNomeFileConEstensione);

			// Rinomina il file
			fs.rename(percorsoCompletoAttuale, percorsoCompletoNuovo, (err) => {
				if (err) {
					console.error('Errore durante il cambio nome del file:', err);
				} else {
					console.log('File rinominato con successo.');
				}
			});
		} else {
			console.log('File non trovato.');
		}
	});
}

const port = 6969;
server.listen(port, () => {
	console.log("http://localhost:" + port);
});
