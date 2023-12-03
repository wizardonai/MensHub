import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./pages/Homepage";
import Menu from "./pages/Menu";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import ProductPage from "./pages/ProductPage";
import { useEffect, useState } from "react";

import { getProdotti } from "./scripts/fetch";

const ReinderizzaHome = () => {
	const navigate = useNavigate();

	useEffect(() => {
		navigate("/home");
		//eslint-disable-next-line
	}, []);
};

const App = () => {
	const hostname = "http://192.168.1.147:80/";
	// const hostname = "http://172.20.10.7:80/";

	//tutti i dati
	const [oggettone, setOggettone] = useState({ prodotti: [] });

	//menu
	const [antipasti, setAntipasti] = useState(false);
	const [primi, setPrimi] = useState(false);
	const [secondi, setSecondi] = useState(false);
	const [contorni, setContorni] = useState(false);
	const [panini, setPanini] = useState(false);
	const [dolci, setDolci] = useState(false);
	const [stringaSearch, setStringaSearch] = useState("");

	//carrello
	const [carrello, setCarrello] = useState([]);

	//aspetto che arrivino dal server
	const [pagDaStamp, setPagDaStamp] = useState(false);

	function aggiungiHostname(prodotti) {
		let tmp = prodotti;

		tmp.forEach((item) => {
			item.indirizzoImg = hostname + item.indirizzo_img;
		});

		return tmp;
	}

	useEffect(() => {
		getProdotti().then((res) => {
			let tmp = {
				prodotti: aggiungiHostname(res),
			};
			setOggettone(tmp);
			console.log(tmp);
			setPagDaStamp(true);
		});
		//eslint-disable-next-line
	}, []);

	return (
		<>
			{pagDaStamp ? (
				<Routes>
					<Route path='/' element={<ReinderizzaHome />} />
					<Route
						path='/home'
						element={<HomePage elencoProdotti={JSON.stringify(oggettone)} />}
					/>
					<Route
						path='/menu'
						element={
							<Menu
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
								elencoProdotti={JSON.stringify(oggettone)}
								stringaSearch={stringaSearch}
								setStringaSearch={setStringaSearch}
								hostname={hostname}
							/>
						}
					/>
					<Route
						path='/menu/product'
						element={
							<ProductPage
								elencoProdotti={JSON.stringify(oggettone)}
								hostname={hostname}
								carrello={carrello}
								setCarrello={setCarrello}
							/>
						}
					/>
					<Route
						path='/orders'
						element={
							<Orders
								carrello={carrello}
								setCarrello={setCarrello}
								hostname={hostname}
							/>
						}
					/>
					<Route path='/profile' Component={Profile} />
				</Routes>
			) : (
				""
			)}
		</>
	);
};

export default App;
