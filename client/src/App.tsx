import { redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import HomePage from "./cliente/pages/Homepage";
import Menu from "./cliente/pages/Menu";
import Orders from "./cliente/pages/Orders";
import Profile from "./cliente/pages/Profile";
import ProductPage from "./cliente/pages/ProductPage";
import LoginPage from "./login/pages/LoginPage";
import RegisterPage from "./login/pages/RegisterPage";

import { getProdotti } from "./cliente/scripts/fetch";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";

export type ArrayProdotti = {
	prodotti: Array<{
		allergeni: string;
		categoria: string;
		descrizione: string;
		disponibile: number;
		fd: number;
		id: number;
		id_mensa: number;
		indirizzo_img: string;
		nacq: number;
		nome: string;
		prezzo: number;
	}>;
};
interface styleThing {
	[thingName: string]: string;
}
export interface styleMap {
	[thingName: string]: styleThing;
}
export interface filtroMap {
	[thingName: string]: boolean;
}

export const hostname =
	(process.env.REACT_APP_HOSTNAME || "") +
	(process.env.REACT_APP_IMG_PORT || "") +
	"/image/";
export var Colori = {
	primario: "#3897F1",
	imgPrimario:
		"invert(49%) sepia(82%) saturate(1958%) hue-rotate(187deg) brightness(99%) contrast(91%)",
};

const loadProdotti = async () => {
	function aggiungiHostname(prodotti: ArrayProdotti) {
		let tmp: ArrayProdotti = prodotti;

		tmp.prodotti.forEach((item) => {
			item.indirizzo_img = hostname + item.indirizzo_img;
			item.nome = item.nome.toLowerCase();
		});

		return tmp;
	}

	// @ts-ignore
	let res: ArrayProdotti = { prodotti: await getProdotti() };

	let elencoProdotti: ArrayProdotti = aggiungiHostname(res);
	return elencoProdotti;
};

const App = () => {
	//loggato o no
	const [utente, setUtente] = useState("no");
	const refreshStorage = () => {
		setUtente(localStorage.getItem("login") || "no");
		return localStorage.getItem("login");
	};

	//cliente
	const [stringaSearch, setStringaSearch] = useState("");
	const [filtri, setFiltri] = useState({
		antipasti: false,
		primi: false,
		secondi: false,
		contorni: false,
		panini: false,
		dolci: false,
	});

	useEffect(() => {
		refreshStorage();
	}, []);

	let router;

	if (utente === "cliente") {
		router = createBrowserRouter([
			{
				path: "/home",
				element: <HomePage />,
				loader: async () => {
					return { prodotti: await loadProdotti() };
				},
			},
			{
				path: "/menu",
				element: <Menu />,
				loader: async () => {
					return {
						prodotti: await loadProdotti(),
						stringaSearch: stringaSearch,
						setStringaSearch: setStringaSearch,
						filtri: filtri,
						setFiltri: setFiltri,
					};
				},
			},
			{
				path: "/product/:productId",
				element: <ProductPage />,
				loader: async ({ params }) => {
					return {
						prodotti: await loadProdotti(),
						id: params.productId,
					};
				},
			},
			{
				path: "/orders",
				element: <Orders />,
			},
			{
				path: "/profile",
				element: <Profile />,
				loader: () => ({
					refreshStorage: refreshStorage,
				}),
			},
			{
				path: "*",
				loader: () => redirect("/home"),
			},
		]);
	} else {
		router = createBrowserRouter([
			{
				path: "/login",
				element: <LoginPage />,
				loader: () => ({
					refreshStorage: refreshStorage,
				}),
			},
			{
				path: "/register",
				element: <RegisterPage />,
			},
			{
				path: "*",
				loader: () => redirect("/login"),
			},
		]);
	}

	return <RouterProvider router={router} />;
};

export default App;

/*cose da implementare

- mettere nel carrello la trasparenza dei lati del bottone ordina come nella pagina del prodotto

*/
