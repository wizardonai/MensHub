import {
	RouterProvider,
	createBrowserRouter,
	redirect,
} from "react-router-dom";
import Homepage from "./cliente/pages/Homepage";
import Cart from "./cliente/pages/Cart";
import { useLocalStorage } from "usehooks-ts";
import Profile from "./cliente/pages/Profile";
import { getProdotti, getProfilo } from "./cliente/scripts/fetch";
import ProfilePages from "./cliente/pages/ProfilePages";
import { prodotto, prodottoCarrello, typeProfilo } from "./utils";
import Product from "./cliente/pages/Product";
import { useEffect, useState } from "react";
import Auth from "./Auth";
import Pwdchange from "./cliente/pages/Pwdchange";
import ConfirmEmail from "./cliente/pages/ConfirmEmail";
import {
	getAllergeni,
	getCategorie,
	getInformazioniMensa,
	getProdottiCompletati,
} from "./produttore/scripts/fetch";
import HomePageProductor from "./produttore/pages/HomePageProductor";
import MenuPageProductor from "./produttore/pages/MenuPageProductor";
import CompletedOrders from "./produttore/pages/CompletedOrders";
import ProfileProductor from "./produttore/pages/ProfileProductor";

export const hostnameProductor = (process.env.REACT_APP_URL || "") + "/image/";

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

function App() {
	const [loggato, setLoggato] = useLocalStorage("loggato", "?");
	const [username, setUsername] = useState("");
	const [datiUtente, setDatiUtente] = useState({} as typeProfilo);
	const [products, setProducts] = useState([] as Array<prodotto>);
	const [carrello, setCarrello] = useLocalStorage(
		"cart",
		[] as Array<prodottoCarrello>
	);
	const [lunghezzaCarrello, setLunghezzaCarrello] = useState(0);

	//produttore
	const [ordini, setOrdini] = useState<any>([]);
	const [flag, setFlag] = useState<boolean>(false);

	const [categorie, setCategorie] = useState<Array<string>>([]);
	const [allergeni, setAllergeni] = useState<Array<string>>([]);

	useEffect(() => {
		let sommaCarrello = 0;
		carrello.forEach((element) => {
			sommaCarrello += element.quantita;
		});
		setLunghezzaCarrello(sommaCarrello);
	}, [carrello]);

	useEffect(() => {
		if (Object.keys(datiUtente).length > 0) setDatiUtente({} as typeProfilo);
	}, [loggato]);

	let router;
	if (loggato === "cliente") {
		if (Object.keys(datiUtente).length === 0) {
			setDatiUtente({
				cognome: "",
				email: "",
				exp: -1,
				iat: -1,
				id: -1,
				id_mensa: -1,
				nome: "",
				cliente: -1,
			});
			getProfilo(localStorage.getItem("token") || "scu").then((res: any) => {
				if (!res) {
					return;
				}
				if (res === "Token non valido") {
					localStorage.setItem("loggato", "false");
					return;
				}
				if (res === "Mensa preferita cancellata") {
					localStorage.clear();
					setDatiUtente({} as typeProfilo);
					setProducts([]);
					setLoggato("false");
					return;
				}

				if (res.cliente === 0) {
					localStorage.clear();
					setDatiUtente({} as typeProfilo);
					setProducts([]);
					setLoggato("false");
					return;
				}

				if (res) {
					setUsername(res.nome);
					setDatiUtente(res);
				}
			});

			if (products.length === 0) {
				getProdotti(localStorage.getItem("token") || "scu").then((res: any) => {
					if (!res) {
						return;
					}
					if (res === "Token non valido") {
						localStorage.setItem("loggato", "false");
						return;
					}

					setProducts(res);
				});
			}
		}

		router = createBrowserRouter([
			{
				path: "/home",
				element: (
					<Homepage
						username={username}
						products={products}
						setCarrello={setCarrello}
						lunghezzaCarrello={lunghezzaCarrello}
						setLoggato={setLoggato}
					/>
				),
			},
			{
				path: "/cart",
				element: (
					<Cart
						setLoggato={setLoggato}
						setDatiUtente={setDatiUtente}
						setProducts={setProducts}
						carrello={carrello}
						setCarrello={setCarrello}
					/>
				),
			},
			{
				path: "/profile",
				element: (
					<Profile
						setLoggato={setLoggato}
						datiUtente={datiUtente}
						setDatiUtente={setDatiUtente}
						setProducts={setProducts}
						lunghezzaCarrello={lunghezzaCarrello}
					/>
				),
			},
			{
				path: "/profile/:page",
				element: (
					<ProfilePages
						products={products}
						setLoggato={setLoggato}
						setDatiUtente={setDatiUtente}
						setProducts={setProducts}
					/>
				),
			},
			{
				path: "/product/:id",
				element: (
					<Product
						carrello={carrello}
						setCarrello={setCarrello}
						setLoggato={setLoggato}
					/>
				),
				loader: ({ params }) => {
					const tmp = products.filter(
						(product) => product.id === parseInt(params.id || "-1")
					);

					if (tmp.length === 0) return redirect("/home");
					return tmp[0];
				},
			},
			{
				path: "/changepwd/:token",
				element: <Pwdchange loggato={loggato} setLoggato={setLoggato} />,
				loader: ({ params }) => {
					if (!params.token) return redirect("/home");
					return params.token;
				},
			},
			{
				path: "*",
				loader: () => redirect("/home"),
			},
		]);
	} else if (loggato === "produttore") {
		if (Object.keys(datiUtente).length === 0) {
			setDatiUtente({
				cognome: "",
				email: "",
				exp: -1,
				iat: -1,
				id: -1,
				id_mensa: -1,
				nome: "",
				cliente: -1,
			});
			getProfilo(localStorage.getItem("token") || "scu").then((res: any) => {
				if (!res) {
					return;
				}
				if (res === "Token non valido") {
					localStorage.setItem("loggato", "false");
					return;
				}
				if (res === "Mensa preferita cancellata") {
					localStorage.clear();
					setDatiUtente({} as typeProfilo);
					setProducts([]);
					setLoggato("false");
					return;
				}

				if (res.cliente === 1) {
					localStorage.clear();
					setDatiUtente({} as typeProfilo);
					setProducts([]);
					setLoggato("false");
					return;
				}

				if (res) {
					setUsername(res.nome);
					setDatiUtente(res);
				}
			});
		}
		if (categorie.length === 0) {
			getCategorie({ token: localStorage.getItem("token") || "scu" }).then(
				(res: any) => {
					if (res === "Token non valido") {
						localStorage.removeItem("cart");
						localStorage.removeItem("token");
						localStorage.setItem("loggato", "false");
					}
					setCategorie(res);
				}
			);
		}

		if (allergeni.length === 0) {
			getAllergeni().then((res: any) => {
				if (res === "Token non valido") {
					localStorage.removeItem("cart");
					localStorage.removeItem("token");
					localStorage.setItem("loggato", "false");
				}
				setAllergeni(res);
			});
		}

		router = createBrowserRouter([
			{
				path: "/productorHome",
				element: (
					<HomePageProductor
						ordini={ordini}
						setOrdini={setOrdini}
						flag={flag}
						setFlag={setFlag}
						setLoggato={setLoggato}
					/>
				),
			},
			{
				path: "/productorMenu",
				element: (
					<MenuPageProductor
						allergeni={allergeni}
						categorie={categorie}
						setLoggato={setLoggato}
					/>
				),
				loader: async () => {
					return getProdotti(localStorage.getItem("token") || "scu");
				},
			},
			{
				path: "/completedOrders",
				element: <CompletedOrders setLoggato={setLoggato} />,
				loader: async () => {
					return getProdottiCompletati(localStorage.getItem("token") || "scu");
				},
			},
			{
				path: "/productorProfile",
				element: <ProfileProductor setLoggato={setLoggato} />,
				loader: async () => {
					return getInformazioniMensa(localStorage.getItem("token") || "scu");
				},
			},
			{
				path: "*",
				loader: () => redirect("/productorHome"),
			},
		]);
	} else {
		if (Object.keys(datiUtente).length !== 0) setDatiUtente({} as typeProfilo);
		if (username !== "") setUsername("");
		if (products.length !== 0) setProducts([] as Array<prodotto>);
		localStorage.removeItem("cart");
		localStorage.removeItem("token");

		router = createBrowserRouter([
			{
				path: "/auth",
				element: <Auth setLoggato={setLoggato} />,
			},
			{
				path: "/changepwd/:token",
				element: <Pwdchange loggato={loggato} setLoggato={setLoggato} />,
				loader: ({ params }) => {
					if (!params.token) return redirect("/home");
					return params.token;
				},
			},
			{
				path: "/confirm/email/:token",
				element: <ConfirmEmail />,
			},
			{
				path: "/*",
				loader: () => redirect("/auth"),
			},
		]);
	}

	return <RouterProvider router={router} />;
}

export default App;
