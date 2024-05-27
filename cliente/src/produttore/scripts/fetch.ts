import axios from "axios";
import { sha256 } from "js-sha256";

const urlServer = process.env.REACT_APP_URL || "";

type datiReg = {
	nome: string;
	cognome: string;
	email: string;
	password: string;
	confirm_password: string;
	cliente: any;
	id_mensa: any;
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

export async function getProdotti(token: { token: string }) {
	let response;

	let config = {
		method: "post",
		maxBodyLength: Infinity,
		url: `${urlServer}/request/products`,
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

//make a function that takes categories
export async function getCategorie(token: { token: string }) {
	let response;

	let config = {
		method: "post",
		maxBodyLength: Infinity,
		url: `${urlServer}/request/categories`,
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

export async function getAllergeni() {
	let response;

	let config = {
		method: "post",
		maxBodyLength: Infinity,
		url: `${urlServer}/request/allergens`,
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

export async function addProdotto(token: string, dati: any) {
	let response;

	console.log("Token:" + token);

	let config = {
		method: "post",
		maxBodyLength: Infinity,
		url: `${urlServer}/producer/add/product`,
		headers: {
			Authorization: "Bearer " + token,
		},
		data: dati,
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

export async function getOrdini(token: { token: string }) {
	let response;

	let config = {
		method: "post",
		maxBodyLength: Infinity,
		url: `${urlServer}/producer/get/orders`,
		headers: {
			Authorization: "Bearer " + token.token,
		},
	};

	await axios
		.request(config)
		.then((res) => {
			if (res.data === "Non sono presenti ordini") {
				response = [];
			} else {
				response = res.data;
			}
		})
		.catch((err) => {
			console.log(err);
		});

	return response;
}

export async function getOrdine(token: { token: string }, id_ordine: number) {
	let response;

	let config = {
		method: "post",
		maxBodyLength: Infinity,
		url: `${urlServer}/producer/get/order`,
		headers: {
			Authorization: "Bearer " + token.token,
		},
		data: new URLSearchParams({
			id_ordine: id_ordine.toString(),
		}),
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

export async function updateOrdine(
	token: string,
	id_ordine: number,
	stato_ordine: string
) {
	let response;

	let config = {
		method: "post",
		maxBodyLength: Infinity,
		url: `${urlServer}/producer/change/order`,
		headers: {
			Authorization: "Bearer " + token,
		},
		data: new URLSearchParams({
			id_ordine: id_ordine.toString(),
			stato_ordine: stato_ordine,
		}),
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

export async function deleteOrdine(token: string, id_ordine: number) {
	let response;

	let config = {
		method: "post",
		maxBodyLength: Infinity,
		url: `${urlServer}/producer/delete/order`,
		headers: {
			Authorization: "Bearer " + token,
		},
		data: new URLSearchParams({
			id_ordine: id_ordine.toString(),
		}),
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

export async function getInformazioniMensa(token: string) {
	let response;

	let config = {
		method: "post",
		maxBodyLength: Infinity,
		url: `${urlServer}/request/mensa`,
		headers: {
			Authorization: "Bearer " + token,
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

export async function getTopProdotti(token: string, periodo: string) {
	let response;

	let config = {
		method: "post",
		maxBodyLength: Infinity,
		url: `${urlServer}/producer/get/top10Products`,
		headers: {
			Authorization: "Bearer " + token,
		},
		data: new URLSearchParams({
			periodo: periodo.toString(),
		}),
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

export async function getStatMensa(token: string, periodo: string) {
	let response;

	let config = {
		method: "post",
		maxBodyLength: Infinity,
		url: `${urlServer}/producer/get/stats`,
		headers: {
			Authorization: "Bearer " + token,
		},
		data: new URLSearchParams({
			periodo: periodo.toString(),
		}),
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

export async function getProdottiCompletati(token: string) {
	let response;

	let config = {
		method: "post",
		maxBodyLength: Infinity,
		url: `${urlServer}/producer/get/orders/completed`,
		headers: {
			Authorization: "Bearer " + token,
		},
	};

	await axios
		.request(config)
		.then((res) => {
			if (res.data === "Non sono presenti ordini completati") {
				response = [];
			} else {
				response = res.data;
			}
		})
		.catch((err) => {
			console.log(err);
		});

	return response;
}

export async function deleteMensa(
	token: string,
	password: string,
	confirm_password: string
) {
	let response;
	let data = JSON.stringify({
		password: sha256.create().update(password).hex(),
		confirm_password: sha256.create().update(confirm_password).hex(),
	});

	let config = {
		method: "post",
		maxBodyLength: Infinity,
		url: `${urlServer}/delete/mensa`,
		headers: {
			Authorization: "Bearer " + token,
			"Content-Type": "application/json",
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

export async function changePassword(
	token: string,
	old_psw: string,
	new_psw: string,
	confirm_new_psw: string
) {
	let response;

	let config = {
		method: "post",
		maxBodyLength: Infinity,
		url: `${urlServer}/change/password`,
		headers: {
			Authorization: "Bearer " + token,
		},
		data: new URLSearchParams({
			old_psw: sha256.create().update(old_psw).hex(),
			new_psw: sha256.create().update(new_psw).hex(),
			confirm_new_psw: sha256.create().update(confirm_new_psw).hex(),
		}),
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

export async function deleteProdotto(token: string, id_prodotto: number) {
	let response;

	let config = {
		method: "post",
		maxBodyLength: Infinity,
		url: `${urlServer}/producer/delete/product`,
		headers: {
			Authorization: "Bearer " + token,
		},
		data: new URLSearchParams({
			id: id_prodotto.toString(),
		}),
	};

	await axios
		.request(config)
		.then((res) => {
			response = res.data;
		})
		.catch((err) => {
			response = err.response.data;
		});

	return response;
}

export async function changeProdotto(
	token: string,
	id: string,
	nome: string,
	descrizione: string,
	allergeni: string,
	prezzo: number,
	categoria: string,
	disponibile: any
) {
	let response;

	let config = {
		method: "post",
		maxBodyLength: Infinity,
		url: `${urlServer}/producer/edit/product`,
		headers: {
			Authorization: "Bearer " + token,
		},
		data: new URLSearchParams({
			id: id,
			nome: nome,
			descrizione: descrizione,
			allergeni: allergeni,
			prezzo: prezzo.toString(),
			categoria: categoria,
			disponibile: disponibile.toString(),
		}),
	};

	await axios
		.request(config)
		.then((res) => {
			response = res.data;
		})
		.catch((err) => {
			response = err.response.data;
		});

	return response;
}

export async function changeProdottoImmagine(token: string, dati: any) {
	let response;

	let config = {
		method: "post",
		maxBodyLength: Infinity,
		url: `${urlServer}/producer/editWithImg/product`,
		headers: {
			Authorization: "Bearer " + token,
		},
		data: dati,
	};

	await axios
		.request(config)
		.then((res) => {
			response = res.data;
		})
		.catch((err) => {
			response = err.response.data;
		});

	return response;
}

export async function deleteAccount(
	token: string,
	password: string,
	confirm_password: string
) {
	let response;
	let data = JSON.stringify({
		password: sha256.create().update(password).hex(),
		confirm_password: sha256.create().update(confirm_password).hex(),
	});

	let config = {
		method: "post",
		maxBodyLength: Infinity,
		url: `${urlServer}/delete/user`,
		headers: {
			Authorization: "Bearer " + token,
			"Content-Type": "application/json",
		},
		data: data,
	};

	await axios
		.request(config)
		.then((res) => {
			response = res.data;
		})
		.catch((err) => {
			response = err.response.data;
		});

	return response;
}
