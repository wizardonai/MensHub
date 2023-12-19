import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import HomePage from "./cliente/pages/Homepage";
import Menu from "./cliente/pages/Menu";
import Orders from "./cliente/pages/Orders";
import Profile from "./cliente/pages/Profile";
import ProductPage from "./cliente/pages/ProductPage";
import LoginPage from "./login/pages/LoginPage";
import RegisterPage from "./login/pages/RegisterPage";

import { getProdotti } from "./cliente/scripts/fetch";

import "./App.css";

const hostname =
	process.env.REACT_APP_HOSTNAME + process.env.REACT_APP_IMG_PORT + "/image/";

const ReinderizzaHome = () => {
	const navigate = useNavigate();

	useEffect(() => {
		navigate("/home");
		//eslint-disable-next-line
	}, []);
};

const Cliente = ({ refreshStorage }) => {
	const [prodottiPresi, setProdottiPresi] = useState(false);

	//stati
	const [elencoProdotti, setElencoProdotti] = useState({ prodotti: [] });
	const [stringaSearch, setStringaSearch] = useState("");
	const [filtri, setFiltri] = useState({
		antipasti: false,
		primi: false,
		secondi: false,
		contorni: false,
		panini: false,
		dolci: false,
	});

	function aggiungiHostname(prodotti) {
		let tmp = prodotti;

		tmp.forEach((item) => {
			item.indirizzoImg = hostname + item.indirizzo_img;
		});

		return tmp;
	}

	useEffect(() => {
		getProdotti().then((res) => {
			setElencoProdotti({ prodotti: aggiungiHostname(res) });

			if (
				localStorage.getItem("cart") === null ||
				localStorage.getItem("cart") === ""
			) {
				localStorage.setItem("cart", JSON.stringify([]));
			}

			setProdottiPresi(true);
		});
	}, []);

	return (
		<>
			{prodottiPresi ? (
				<Routes>
					<Route
						path='/home'
						element={
							<HomePage elencoProdotti={JSON.stringify(elencoProdotti)} />
						}
					/>
					<Route
						path='/menu'
						element={
							<Menu
								elencoProdotti={JSON.stringify(elencoProdotti)}
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
								elencoProdotti={JSON.stringify(elencoProdotti)}
								hostname={hostname}
							/>
						}
					/>
					<Route path='/orders' element={<Orders hostname={hostname} />} />
					<Route
						path='/profile'
						element={<Profile refreshStorage={refreshStorage} />}
					/>
					<Route path='*' element={<ReinderizzaHome />} />
				</Routes>
			) : (
				""
			)}
		</>
	);
};

const NavigateLogin = () => {
	const navigate = useNavigate();
	useEffect(() => {
		navigate("/login");
	});
};
const Login = ({ refreshStorage }) => {
	return (
		<Routes>
			<Route
				path='/login'
				element={<LoginPage refreshStorage={refreshStorage} />}
			/>
			<Route path='/register' element={<RegisterPage />} />
			<Route path='*' element={<NavigateLogin />} />
		</Routes>
	);
};

const App = () => {
	//aspetto che arrivino dal server
	const [utente, setUtente] = useState("no");

	const refreshStorage = () => {
		setUtente(localStorage.getItem("login"));
		return localStorage.getItem("login");
	};

	useEffect(() => {
		if (
			localStorage.getItem("login") === null ||
			localStorage.getItem("login") === ""
		) {
			localStorage.setItem("login", "no");
		}

		refreshStorage();
	}, []);

	useEffect(() => {
		const utenteTmp = localStorage.getItem("login");
		if (utenteTmp === "cliente") {
			//
		} else if (utenteTmp === "produttore") {
			//
		} else {
			setUtente("no");
		}
		//eslint-disable-next-line
	}, [utente]);

	return (
		<>
			{
				utente === "cliente" ? (
					<Cliente refreshStorage={refreshStorage} />
				) : utente === "produttore" ? (
					<p>Produttore</p>
				) : (
					<Login refreshStorage={refreshStorage} />
				)
				/*
			(
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
			)
			*/
			}
		</>
	);
};

export default App;

/*cose da implementare

- prezzo che superati i 100€ esce dallo schermo
- stile dei filtri


*/
