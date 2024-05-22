import {
	RouterProvider,
	createBrowserRouter,
	redirect,
} from "react-router-dom";
// import RegisterPage from "./pages/RegisterPage";
import Homepage from "./pages/Homepage";
import Cart from "./pages/Cart";
import { useLocalStorage } from "usehooks-ts";
import Profile from "./pages/Profile";
import { getProdotti, getProfilo } from "./scripts/fetch";
import ProfilePages from "./pages/ProfilePages";
import { prodotto, prodottoCarrello, typeProfilo } from "./utils";
import Product from "./pages/Product";
import { useState } from "react";
import Auth from "./pages/Auth";
import Pwdchange from "./pages/Pwdchange";
import Tmp from "./pages/tmp";
import ConfirmEmail from "./pages/ConfirmEmail";

function App() {
	const [loggato, setLoggato] = useLocalStorage("loggato", "?");
	const [username, setUsername] = useState("");
	const [datiUtente, setDatiUtente] = useState({} as typeProfilo);
	const [products, setProducts] = useState([] as Array<prodotto>);
	const [carrello, setCarrello] = useLocalStorage("cart", [] as Array<prodottoCarrello>);

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
					localStorage.removeItem("cart");
					localStorage.removeItem("token");
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
						lunghezzaCarrello={carrello.length}
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
						lunghezzaCarrello={carrello.length}
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
				element: <Product carrello={carrello} setCarrello={setCarrello} />,
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
				element: <Pwdchange loggato={loggato} />,
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
		router = createBrowserRouter([
			{
				path: "/home",
				element: <Tmp setLoggato={setLoggato} />,
			},
			{
				path: "*",
				loader: () => redirect("/home"),
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
				element: <Pwdchange loggato={loggato} />,
				loader: ({ params }) => {
					if (!params.token) return redirect("/home");
					return params.token;
				},
			},
			{
				path : "/confirm/email/:token",
				element : <ConfirmEmail />,
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
