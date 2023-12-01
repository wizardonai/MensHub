import axios from "axios";
const FormData = require("form-data");

export async function getProdotti() {
	let response;

	// const hostname = "http://172.20.10.7:6969/";
	const hostname = "http://192.168.1.147:6969/";

	let data = new FormData();
	data.append("idm", "69\n");

	let config = {
		method: "post",
		maxBodyLength: Infinity,
		url: `${hostname}request/products`,
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
