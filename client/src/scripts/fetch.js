import axios from "axios";

export async function getProdotti() {
	let response;

	const hostname = "http://localhost:6969/";

	let config = {
		method: "post",
		maxBodyLength: Infinity,
		url: `${hostname}request/products`,
		headers: {},
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
