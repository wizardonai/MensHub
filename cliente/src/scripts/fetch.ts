import axios from "axios";
import { sha256 } from "js-sha256";
import { dataLog, dataReg, typeProfilo } from "../utils";

const url =
	(process.env.REACT_APP_HOSTNAME || "") + (process.env.REACT_APP_PORT || "");

//ok
export async function loginUser(dati: dataLog) {
	let data = JSON.stringify({
		...dati,
		password: sha256.create().update(dati.password).hex(),
	});

	let config = {
		method: "post",
		maxBodyLength: Infinity,
		url: `${url}/login/user`,
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
//ok
export async function registerUser(dati: dataReg) {
	let data = JSON.stringify({
		...dati,
		password: sha256.create().update(dati.password).hex(),
		confirm_password: sha256.create().update(dati.confirm_password).hex(),
	});

	let config = {
		method: "post",
		maxBodyLength: Infinity,
		url: `${url}/register/user`,
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
//ok
export async function getProfilo(token: string) {
	let config = {
		method: "post",
		maxBodyLength: Infinity,
		url: `${url}/request/profile`,
		headers: {
			Authorization: "Bearer " + token,
		},
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

export async function getProdotti(token: { token: string }) {
	let response;

	let config = {
		method: "post",
		maxBodyLength: Infinity,
		url: `${url}/request/products`,
		headers: {
			Authorization: "Bearer " + token.token,
		},
	};

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

export async function sendOrder(
	carrello: Array<object>,
	token: { token: string }
) {
	let response;
	let data = JSON.stringify({ carrello: carrello });

	let config = {
		method: "post",
		maxBodyLength: Infinity,
		url: `${url}/send/cart`,
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + token.token,
		},
		data: data,
	};

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
