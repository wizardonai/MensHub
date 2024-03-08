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
import { getFilter, hostnameImg } from "./cliente/utils";

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

const loadProdotti = async () => {
	function aggiungiHostname(prodotti: ArrayProdotti) {
		let tmp: ArrayProdotti = prodotti;

		tmp.prodotti.forEach((item) => {
			item.indirizzo_img = hostnameImg + item.indirizzo_img;
			item.nome = item.nome.toLowerCase();
		});

		return tmp;
	}

	// @ts-ignore
	let res: ArrayProdotti = {
		//@ts-ignore
		prodotti: await getProdotti(
			JSON.parse(localStorage.getItem("token") || '{"token": "abc"}')
		),
	};

	let elencoProdotti: ArrayProdotti = aggiungiHostname(res);
	return elencoProdotti;
};

const App = () => {
	//loggato o no
	const [utente, setUtente] = useState("no");


	const refreshStorage = () => {
		setUtente(localStorage.getItem("login") || "");
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
		window.addEventListener("storage", () => {
			setUtente(localStorage.getItem("login") || "");
			// console.log(localStorage.getItem("login"));
		});
	}, []);

	let router;

	

	if (utente === "cliente") {
		router = createBrowserRouter([
			{
				path: "/",
				loader: () => redirect("/home"),
			},
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
				path: "/",
				loader: () => redirect("/login"),
			},
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

- implementare il pulsante aggiungi al carrello con la dark mode
*/
