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

function App() {
	const [antipasti, setAntipasti] = useState(false);
	const [primi, setPrimi] = useState(false);
	const [secondi, setSecondi] = useState(false);
	const [contorni, setContorni] = useState(false);
	const [panini, setPanini] = useState(false);
	const [dolci, setDolci] = useState(false);

	const hostname = "http://192.168.1.147:80/";
	// const hostname = "http://172.20.10.7:80/";

	const [oggettone, setOggettone] = useState({ prodotti: [] });
	const [stringaSearch, setStringaSearch] = useState("");

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
					<Route path='/orders' Component={Orders} />
					<Route path='/profile' Component={Profile} />
				</Routes>
			) : (
				""
			)}
		</>
	);
}

export default App;
