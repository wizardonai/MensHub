import axios from "axios";
const qs = require("qs");

const urlServer =
	(process.env.REACT_APP_HOSTNAME || "") +
	(process.env.REACT_APP_FETCH_PORT || "");

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

export async function sendOrder(carrello: Array<object>) {
	let response;
	let data = JSON.stringify({ carrello: carrello });

	let config = {
		method: "post",
		maxBodyLength: Infinity,
		url: `${urlServer}/send/cart`,
		headers: {
			"Content-Type": "application/json",
			//DA PRENDERE IL TOKEN  DA LOCAL STORAGE
			'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibm9tZSI6IlNpbW9uZSIsImNvZ25vbWUiOiJMYXBvbWFyZGEiLCJlbWFpbCI6InNpbW9sYXBvbWFyZGFAZ21haWwuY29tIiwiaWF0IjoxNzA2MjA1MjM0LCJleHAiOjE3MDYyMDg4MzR9.ZCv36S33_ndqMCVLkdF3Lkw0Ag4mEBEjiVLTlGclOuw'
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
