import axios from "axios";
const FormData = require("form-data");

const urlServer =
	process.env.REACT_APP_HOSTNAME + process.env.REACT_APP_FETCH_PORT;

export async function getProdotti() {
	let response;

	let data = new FormData();
	data.append("idm", "69\n");

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
	let data = new FormData();
	data.append("carrello", JSON.stringify(carrello));

	let config = {
		method: "post",
		maxBodyLength: Infinity,
		url: `${urlServer}/send/cart`,
		headers: {},
		data: data,
	};

	await axios.request(config).catch((err) => {
		console.log(err);
	});
}
