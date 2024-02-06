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

let connection = "";

import { createConnection } from "mysql";
import express from "express";
import multer from "multer";
import jwt from "jsonwebtoken";
import { validate } from "deep-email-validator";
import cors from "cors";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";

const { json, urlencoded } = bodyParser;
const server = express();
const secretKey = "CaccaPoopShitMierda";

// Configura multer per salvare i file caricati nella cartella 'images'
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "../client/src/cliente/pages/image");
	},
	filename: function (req, file, cb) {
		const nome = req.body.nome;
		const prezzo = req.body.prezzo;
		cb(
			null,
			"products/" + nome + "_" + prezzo + path.extname(file.originalname)
		);
	},
});

const storage2 = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "../client/src/cliente/pages/image");
	},
	filename: function (req, file, cb) {
		const id = req.body.id;
		cb(null, "products/" + id + path.extname(file.originalname));
	},
});

const upload = multer({ storage: storage });

const upload2 = multer({ storage: storage2 });

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
server.use("/image", express.static("./image"));
server.use(express.static("../client/build"));

//all methods that return a response to the client
server.get("/", (req, res) => {
	//hosto la pagina sullo stesso sito
	res.sendFile(path.resolve("../client/build/index.html")); //"../client/build/index.html"
});

server.post("/request/products", (req, res) => {
	let token = req.headers.authorization;
	let idm_utente = "";

	jwt.verify(token.replace("Bearer ", ""), secretKey, (err, decoded) => {
		if (err) {
			console.log(err);
			res.send(err);
			res.end();
		} else {
			idm_utente = decoded.id_mensa;
		}
	});

	connection.query(
		"SELECT * FROM prodotti where id_mensa=" + idm_utente,
		(err, result) => {
			if (err) throw new Error(err);
			res.header("Access-Control-Allow-Origin", "*");
			res.send(result);
			res.end();
		}
	);
});

server.post("/send/cart", (req, res) => {
	let token = req.headers.authorization;
	let id_utente = "";

	jwt.verify(token.replace("Bearer ", ""), secretKey, (err, decoded) => {
		if (err) {
			console.log(err);
			res.send(err);
			res.end();
		} else {
			id_utente = decoded.id;
		}
	});

	let data = req.body.carrello;

	let query = `INSERT INTO ordini (id_mensa,id_utente, str_prod, quantita, stato_ordine, data) VALUES(${data[0].id_mensa},${id_utente},"`;
	data.forEach((item, index) => {
		query += `${item.id}`;
		if (index !== data.length - 1) query += ",";
	});
	query += `","`;
	data.forEach((item, index) => {
		query += `${item.quantita}`;
		if (index !== data.length - 1) query += ",";
	});

	let now = new Date();
	let nowFormatted = now.toISOString().replace("T", " ").slice(0, -1);

	query += `","attivo","` + nowFormatted + `");`;

	connection.query(query, (err, result) => {
		if (err) throw new Error(err);
		res.header("Access-Control-Allow-Origin", "*");
		res.send("Ordine aggiunto");
		res.end();
	});
});

server.post("/register/user", async function (req, res) {
	const {
		nome,
		cognome,
		email,
		password,
		confirm_password,
		is_produttore,
		id_mensa,
	} = req.body;
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
			res.end;
		}
	});

	const { valid, reason, validators } = await validate(email);

	if (valid) {
		if (is_produttore) {
			let query = `INSERT INTO utenti (nome,cognome,email,password,id_mensa,cliente) VALUES('${nome}','${cognome}','${email}','${password}','${id_mensa}','${is_produttore}');`;
		} else {
			let query = `INSERT INTO utenti (nome,cognome,email,password) VALUES('${nome}','${cognome}','${email}','${password}');`;
		}

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
				const token = jwt.sign(
					{
						id: result[0].id,
						nome: result[0].nome,
						cognome: result[0].cognome,
						email: result[0].email,
						id_mensa: result[0].id_mensa,
					},
					secretKey,
					{ expiresIn: "1h" }
				);

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
		jwt.verify(token.replace("Bearer ", ""), secretKey, (err, decoded) => {
			if (err) {
				console.log(err);
				res.send(err);
			} else {
				res.send(decoded);
			}
			res.end();
		});
	}
});

server.post("/request/orders", (req, res) => {
	let id_utente = req.body.id_ut;
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

	jwt.verify(token.replace("Bearer ", ""), secretKey, (err, decoded) => {
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

	jwt.verify(token.replace("Bearer ", ""), secretKey, (err, decoded) => {
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

server.post("/producer/edit/product", (req, res) => {
	const { id, nome, descrizione, allergeni, prezzo, categoria, disponibile } =
		req.body;

	let query = `
				UPDATE prodotti
				SET nome = '${nome}',
					descrizione = '${descrizione}',
					allergeni = '${allergeni}',
					prezzo = '${prezzo}',
					categoria = '${categoria}',
					disponibile = '${disponibile}'
				WHERE id = '${id}';`;

	console.log("\nQUERY EDIT" + query);
	connection.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.send(err);
			res.end();
		} else {
			res.send("Prodotto modificato");
			res.end();
		}
	});
});

//serve id del prodotto nella req per caricare immagine
//richiesta da fare con form-data
server.post(
	"/producer/editWithImg/product",
	upload2.single("image"),
	(req, res) => {
		const { id, nome, descrizione, allergeni, prezzo, categoria, disponibile } =
			req.body;

		let cartella = "../client/src/cliente/pages/image/products";
		let fileDaEliminare = "";
		const estensioneFile = req.file.filename.split(".").pop();

		const queryPromise = new Promise((resolve, reject) => {
			fs.readdir(cartella, (err, files) => {
				if (err) {
					console.error("Errore durante la lettura della cartella:", err);
					return;
				}

				fileDaEliminare = files.find((file) => file.startsWith(id + "."));

				if (fileDaEliminare) {
					console.log("File da rinominare:" + fileDaEliminare);
					resolve(fileDaEliminare);
				} else {
					reject("File non trovato.");
					console.log("File non trovato.");
				}
			});
		});

		queryPromise
			.then((fileDaEliminare) => {
				console.log("\n\nFile nuovo: " + req.file.filename);

				const estensioneFileVecchio = fileDaEliminare.split(".").pop();

				if (estensioneFileVecchio != estensioneFile) {
					const pathImg = cartella + "/" + fileDaEliminare;

					fs.unlink(pathImg, (err) => {
						if (err) {
							console.error(
								`Errore durante l'eliminazione del file ${fileDaEliminare}: ${err}`
							);
							// Gestisci l'errore come preferisci
						} else {
							console.log(
								`Il file ${fileDaEliminare} è stato eliminato con successo`
							);
						}
					});

					let query = `
				UPDATE prodotti
				SET nome = '${nome}',
					descrizione = '${descrizione}',
					allergeni = '${allergeni}',
					prezzo = '${prezzo}',
					categoria = '${categoria}',
					disponibile = '${disponibile}',
					indirizzo_img= 'products/${id}.${estensioneFile}'
				WHERE id = '${id}';`;

					console.log("\nQUERY EDIT" + query);
					connection.query(query, (err, result) => {
						if (err) {
							console.log(err);
							res.send(err);
							res.end();
						} else {
							res.send("Prodotto modificato");
							res.end();
						}
					});
				} else {
					res.send("Prodotto modificato");
					res.end();
				}
			})
			.catch((error) => {
				console.log(error);
				res.send("Errore modifica");
				res.end();
			});
	}
);

//richiesta da fare con form-data
server.post("/producer/add/products", upload.single("image"), (req, res) => {
	const { nome, descrizione, allergeni, prezzo, categoria, disponibile } =
		req.body;

	let token = req.headers.authorization;
	let id_utente = "";

	jwt.verify(token.replace("Bearer ", ""), secretKey, (err, decoded) => {
		if (err) {
			console.log(err);
			res.send(err);
			res.end();
		} else {
			id_utente = decoded.id;
		}
	});

	const estensioneFile = req.file.filename.split(".").pop();
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
				console.log("\nQUERY INSERT" + query);
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
					console.log("\nQUERY MODIFICA:" + query);
					connection.query(query, (err, result) => {
						if (err) throw new Error(err);

						console.log("Prodotto modificato");

						renameImage(nome + "_" + prezzo, id_prodotto); //rinominare immagine con id_prodotto
					});
				})
				.catch((error) => {
					console.log(error);
				});
		})
		.catch((error) => {
			console.log(error);
		});

	res.header("Access-Control-Allow-Origin", "*");
	res.send("Prodotto aggiunto al DB");
	res.end();
});

function renameImage(nome_file, id_prodotto) {
	console.log(`RENAME: ${nome_file} ${id_prodotto} `);

	const cartella = "../client/src/cliente/pages/image/products";
	const nomeFileSenzaEstensione = nome_file;
	console.log("\nNome_file = " + nome_file);

	// Leggi tutti i file nella cartella
	fs.readdir(cartella, (err, files) => {
		if (err) {
			console.error("Errore durante la lettura della cartella:", err);
			return;
		}

		// Cerca il file senza estensione nella lista dei file
		const fileDaRinominare = files.find((file) =>
			file.startsWith(nomeFileSenzaEstensione)
		);

		if (fileDaRinominare) {
			const estensioneFile = path.extname(fileDaRinominare);
			const percorsoCompletoAttuale = path.join(cartella, fileDaRinominare);
			const nuovoNomeFileConEstensione = id_prodotto + estensioneFile; // Sostituisci con il nuovo nome e l'estensione desiderati
			const percorsoCompletoNuovo = path.join(
				cartella,
				nuovoNomeFileConEstensione
			);

			// Rinomina il file
			fs.rename(percorsoCompletoAttuale, percorsoCompletoNuovo, (err) => {
				if (err) {
					console.error("Errore durante il cambio nome del file:", err);
				} else {
					console.log("File rinominato con successo.");
				}
			});
		} else {
			console.log("File non trovato.");
		}
	});
}

const port = 6969;
server.listen(port, () => {
	console.log("http://localhost:" + port);
});
