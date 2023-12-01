import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Homepage";
import Menu from "./pages/Menu";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import { useEffect, useState } from "react";

import { getProdotti } from "./scripts/fetch";

function App() {
	const [lista, setLista] = useState(true);
	const [prodotto, setProdotto] = useState({});
	const [daDoveArrivo, setDaDoveArrivo] = useState("");

	const [antipasti, setAntipasti] = useState(false);
	const [primi, setPrimi] = useState(false);
	const [secondi, setSecondi] = useState(false);
	const [contorni, setContorni] = useState(false);
	const [panini, setPanini] = useState(false);
	const [dolci, setDolci] = useState(false);

	// const hostname = "http://192.168.1.147:80/";
	const hostname = "http://172.20.10.7:80/";

	let tmpOggettone = {
		prodotti: [
			{
				id: 1,
				nome: "paninazzo",
				descrizione: "panino con la mortadella casareccia",
				prezzo: 69.69,
				categoria: "panino",
				indirizzoImg: `${hostname}products/paninoMortazza.png`,
				disponibilita: true,
				idm: "",
				nacq: 1,
				allergeni: "uova, molluschi",
			},
			{
				id: 2,
				nome: "carbonara",
				descrizione: "panino con la mortadella casareccia",
				prezzo: 69.69,
				categoria: "primo",
				indirizzoImg: `${hostname}products/carbonara.png`,
				disponibilita: true,
				idm: "",
				nacq: 2,
				allergeni: "uova, molluschi, pipi di scapi",
			},
			{
				id: 3,
				nome: "spaghetti all'arrabbiata",
				descrizione: "panino con la mortadella casareccia",
				prezzo: 69.69,
				categoria: "primo",
				indirizzoImg: `${hostname}products/spaghettiArrabbiata.png`,
				disponibilita: true,
				idm: "",
				nacq: 3,
				allergeni: "uova, molluschi, pipi di scapi",
			},
			{
				id: 4,
				nome: "cotoletta con le patatins",
				descrizione: "panino con la mortadella casareccia",
				prezzo: 69.69,
				categoria: "secondo",
				indirizzoImg: `${hostname}products/cotoletta.png`,
				disponibilita: true,
				idm: "",
				nacq: 4,
				allergeni: "uova, molluschi, pipi di scapi",
			},
			{
				id: 5,
				nome: "panna cotta",
				descrizione: "panino con la mortadella casareccia",
				prezzo: 69.69,
				categoria: "dolce",
				indirizzoImg: `${hostname}products/pannacotta.png`,
				disponibilita: true,
				idm: "",
				nacq: 5,
				allergeni: "uova, molluschi, pipi di scapi",
			},
			{
				id: 6,
				nome: "insalata",
				descrizione: "panino con la mortadella casareccia",
				prezzo: 69.69,
				categoria: "contorno",
				indirizzoImg: `${hostname}products/insalata.png`,
				disponibilita: true,
				idm: "",
				nacq: 6,
				allergeni: "uova, molluschi, pipi di scapi",
			},
			{
				id: 7,
				nome: "uasard",
				descrizione: "panino con la mortadella casareccia",
				prezzo: 69.69,
				categoria: "contorno",
				indirizzoImg: `${hostname}products/insalata.png`,
				disponibilita: true,
				idm: "",
				nacq: 6,
				allergeni: "uova, molluschi, pipi di scapi",
			},
		],
	};
	const [oggettone, setOggettone] = useState(tmpOggettone);

	const [stringaSearch, setStringaSearch] = useState("");

	const [prodottiDaStampare, setProdottiDaStampare] = useState(
		oggettone.prodotti
	);

	useEffect(() => {
		let response;
		getProdotti().then((res) => {
			let tmp = {
				prodotti: res,
			};
			setOggettone(tmp);
			console.log("nuovo oggetto:");
			console.log(tmp);
		});
	}, []);

	return (
		<Routes>
			<Route
				path='/'
				element={
					<HomePage
						setLista={setLista}
						setProdotto={setProdotto}
						elencoProdotti={JSON.stringify(oggettone)}
						setDaDoveArrivo={setDaDoveArrivo}
					/>
				}
			/>
			<Route
				path='/menu'
				element={
					<Menu
						lista={lista}
						setLista={setLista}
						prodotto={prodotto}
						setProdotto={setProdotto}
						antipasti={antipasti}
						primi={primi}
						secondi={secondi}
						contorni={contorni}
						panini={panini}
						dolci={dolci}
						setAntipasti={setAntipasti}
						setPrimi={setPrimi}
						setSecondi={setSecondi}
						setContorni={setContorni}
						setPanini={setPanini}
						setDolci={setDolci}
						daDoveArrivo={daDoveArrivo}
						setDaDoveArrivo={setDaDoveArrivo}
						elencoProdotti={JSON.stringify(oggettone)}
						stringaSearch={stringaSearch}
						setStringaSearch={setStringaSearch}
						hostname={hostname}
						prodottiDaStampare={prodottiDaStampare}
						setProdottiDaStampare={setProdottiDaStampare}
					/>
				}
			/>
			<Route path='/orders' Component={Orders} />
			<Route path='/profile' Component={Profile} />
		</Routes>
	);
}

export default App;
