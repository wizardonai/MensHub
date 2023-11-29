import axios from "axios";

export async function getProdotti() {
	let response;

	const hostname = "http://172.20.10.2:6969/";

	await axios
		.post(`${hostname}request/products`, {
			headers: {
				"x-apikey": "API_KEY",
			},
		})
		.then((res) => {
			response = res;
			console.log(res);
		});

	return response;
}
