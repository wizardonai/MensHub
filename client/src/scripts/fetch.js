import axios from "axios";
const FormData = require("form-data");
const qs = require('qs');

export async function getProdotti() {
	let response;

	// const hostname = "http://localhost:6969/";
	const hostname = "http://localhost:6969/";

	let data = qs.stringify({
		'idm': '1' 
	  });
	  
	  let config = {
		method: 'post',
		maxBodyLength: Infinity,
		url: `${hostname}request/products`,
		headers: { 
		  'Content-Type': 'application/x-www-form-urlencoded'
		},
		data : data
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
