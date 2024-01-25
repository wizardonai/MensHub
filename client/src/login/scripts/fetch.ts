import axios from "axios";
import { sha256 } from "js-sha256";

const urlServer =
	(process.env.REACT_APP_HOSTNAME || "") +
	(process.env.REACT_APP_FETCH_PORT || "");

type datiReg = {
	nome: string;
	cognome: string;
	email: string;
	password: string;
	confirm_password: string;
};
type datiLog = {
	email: string;
	password: string;
};

export async function registerUser(dati: datiReg) {
	let data = JSON.stringify({
		...dati,
		password: sha256.create().update(dati.password).hex(),
		confirm_password: sha256.create().update(dati.confirm_password).hex(),
	});

	let config = {
		method: "post",
		maxBodyLength: Infinity,
		url: `${urlServer}/register/user`,
		headers: {
			"Content-Type": "application/json",
		},
		data: data,
	};

	let response;

	await axios
		.request(config)
		.then((res) => {
			response = res.data;
			console.log("Risposta " + response);
		})
		.catch((err) => {
			console.log(err);
		});

	return response;
}

export async function loginUser(dati: datiLog) {
	let data = JSON.stringify({
		...dati,
		password: sha256.create().update(dati.password).hex(),
	});

	let config = {
		method: "post",
		maxBodyLength: Infinity,
		url: `${urlServer}/login/user`,
		headers: {
			"Content-Type": "application/json",
		},
		data: data,
	};

	let response;

	await axios
		.request(config)
		.then((res) => {
			response = res.data;
		})
		.catch((err) => {
			console.log(err);
		});

	return response;
}