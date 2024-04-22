import { useEffect, useState } from "react";
import {
	RouterProvider,
	createBrowserRouter,
	redirect,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Homepage from "./pages/Homepage";
import Cart from "./pages/Cart";
import { useLocalStorage } from "usehooks-ts";
import Profile from "./pages/Profile";
import { getProdotti, getProfilo } from "./scripts/fetch";
import ProfilePages from "./pages/ProfilePages";
import { prodotto, typeProfilo } from "./utils";
import Product from "./pages/Product";

function App() {
	const [loggato, setLoggato] = useLocalStorage("loggato", false);
	const [username, setUsername] = useState("");
	const [datiUtente, setDatiUtente] = useState({} as typeProfilo);
	const [products, setProducts] = useState([] as Array<prodotto>);

	let router;
	if (loggato) {
		if (username === "") {
			setUsername("Caricamento...");
			getProfilo(
				JSON.parse(localStorage.getItem("token") || '{"token": "scu"}').token
			).then((res: any) => {
				if (res === "Token non valido") {
					localStorage.removeItem("cart");
					localStorage.removeItem("token");
					localStorage.setItem("loggato", "false");
					return;
				}

				setUsername(res.nome);
				setDatiUtente(res);
			});

			if (products.length === 0) {
				getProdotti(
					JSON.parse(localStorage.getItem("token") || '{"token": "scu"}').token
				).then((res: any) => {
					setProducts(res);
				});
			}
		}

		router = createBrowserRouter([
			{
				path: "/",
				loader: () => redirect("/home"),
			},
			{
				path: "/home",
				element: <Homepage username={username} products={products} />,
			},
			{
				path: "/cart",
				element: <Cart />,
			},
			{
				path: "/profile",
				element: (
					<Profile
						setLoggato={setLoggato}
						datiUtente={datiUtente}
						setDatiUtente={setDatiUtente}
						setProducts={setProducts}
					/>
				),
			},
			{
				path: "/profile/:page",
				element: <ProfilePages datiUtente={datiUtente} products={products} />,
			},
			{
				path: "/product/:id",
				element: <Product />,
				loader: ({ params }) => {
					const tmp = products.filter(
						(product) => product.id === parseInt(params.id || "-1")
					);

					if (tmp.length === 0) return redirect("/home");
					return tmp[0];
				},
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
				element: <LoginPage setLoggato={setLoggato} />,
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
}

export default App;
