import axios from "axios";
const qs = require("qs");

const urlServer =
	process.env.REACT_APP_HOSTNAME + process.env.REACT_APP_FETCH_PORT;

export async function getProdotti() {
	let response;

	let data = qs.stringify({
		idm: 1,
	});

	let config = {
		method: "post",
		maxBodyLength: Infinity,
		url: `${urlServer}/request/products`,
		headers: {},
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

export async function sendOrder(carrello) {
	let response;
	let data = JSON.stringify({ carrello: carrello });

	let config = {
		method: "post",
		maxBodyLength: Infinity,
		url: `${urlServer}/send/cart`,
		headers: {
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
