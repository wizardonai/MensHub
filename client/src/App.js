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
	const hostname =
		process.env.REACT_APP_HOSTNAME + process.env.REACT_APP_IMG_PORT + "/";

	//tutti i dati
	const [oggettone, setOggettone] = useState({ prodotti: [] });

	//menu
	const [stringaSearch, setStringaSearch] = useState("");

	const [filtri, setFiltri] = useState({
		antipasti: false,
		primi: false,
		secondi: false,
		contorni: false,
		panini: false,
		dolci: false,
	});

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
			setOggettone({ prodotti: aggiungiHostname(res) });

			setPagDaStamp(true);
		});
		if (
			localStorage.getItem("cart") === null ||
			localStorage.getItem("cart") === ""
		) {
			localStorage.setItem("cart", JSON.stringify([]));
		}
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
								elencoProdotti={JSON.stringify(oggettone)}
								stringaSearch={stringaSearch}
								setStringaSearch={setStringaSearch}
								hostname={hostname}
								filtri={filtri}
								setFiltri={setFiltri}
							/>
						}
					/>
					<Route
						path='/menu/product'
						element={
							<ProductPage
								elencoProdotti={JSON.stringify(oggettone)}
								hostname={hostname}
							/>
						}
					/>
					<Route path='/orders' element={<Orders hostname={hostname} />} />
					<Route path='/profile' Component={Profile} />
				</Routes>
			) : (
				<div
					style={{
						height: "100svh",
						width: "100%",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<p>Caricamento...</p>
				</div>
			)}
		</>
	);
};

export default App;
