import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./cliente/pages/Homepage";
import Menu from "./cliente/pages/Menu";
import Orders from "./cliente/pages/Orders";
import Profile from "./cliente/pages/Profile";
import ProductPage from "./cliente/pages/ProductPage";
import { useEffect, useState } from "react";

import { getProdotti } from "./cliente/scripts/fetch";
import LoginPage from "./login/pages/LoginPage";

const ReinderizzaHome = () => {
	const navigate = useNavigate();

	useEffect(() => {
		navigate("/home");
		//eslint-disable-next-line
	}, []);
};

const Cliente = ({
	elencoProdotti,
	stringaSearch,
	setStringaSearch,
	hostname,
	filtri,
	setFiltri,
}) => {
	console.log(window.location.href);

	return (
		<Routes>
			<Route
				path='/home'
				element={<HomePage elencoProdotti={JSON.stringify(elencoProdotti)} />}
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
			<Route path='/profile' Component={Profile} />
			<Route path='*' element={<ReinderizzaHome />} />
		</Routes>
	);
};

const NavigateLogin = () => {
	const navigate = useNavigate();
	useEffect(() => {
		navigate("/login");
	});
};
const Login = () => {
	return (
		<Routes>
			<Route path='/login' element={<LoginPage />} />
			<Route path='*' element={<NavigateLogin />} />
		</Routes>
	);
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
	const [utente, setUtente] = useState("no");

	function aggiungiHostname(prodotti) {
		let tmp = prodotti;

		tmp.forEach((item) => {
			item.indirizzoImg = hostname + item.indirizzo_img;
		});

		return tmp;
	}

	useEffect(() => {
		if (
			localStorage.getItem("login") === null ||
			localStorage.getItem("login") === ""
		) {
			localStorage.setItem("login", "no");
		}

		if (localStorage.getItem("login") === "cliente") {
			getProdotti().then((res) => {
				setOggettone({ prodotti: aggiungiHostname(res) });

				if (
					localStorage.getItem("cart") === null ||
					localStorage.getItem("cart") === ""
				) {
					localStorage.setItem("cart", JSON.stringify([]));
				}

				setUtente("cliente");
			});
		} else if (localStorage.getItem("login") === "produttore") {
			setUtente("produttore");
		} else {
			setUtente("no");
		}
		//eslint-disable-next-line
	}, []);

	return (
		<>
			{
				utente === "cliente" ? (
					<Cliente
						elencoProdotti={oggettone}
						stringaSearch={stringaSearch}
						setStringaSearch={setStringaSearch}
						hostname={hostname}
						filtri={filtri}
						setFiltri={setFiltri}
					/>
				) : utente === "produttore" ? (
					<p>Produttore</p>
				) : (
					<Login />
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
