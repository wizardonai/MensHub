import { useState } from "react";
import {
	RouterProvider,
	createBrowserRouter,
	redirect,
	useNavigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Homepage from "./pages/Homepage";
import Cart from "./pages/Cart";
import { useLocalStorage } from "usehooks-ts";
import Profile from "./pages/Profile";
import { getProdotti, getProfilo } from "./scripts/fetch";
import { sleep } from "./utils";

function App() {
	const [loggato, setLoggato] = useLocalStorage("loggato", false);
	const [username, setUsername] = useState("");

	let router;
	if (loggato) {
		getProfilo(
			JSON.parse(localStorage.getItem("token") || "{}").token || ""
		).then((res: any) => {
			if (res === "Token non valido") {
				localStorage.removeItem("cart");
				localStorage.removeItem("token");
				localStorage.setItem("loggato", "false");
			}
			setUsername(res.nome);
		});

		router = createBrowserRouter([
			{
				path: "/",
				loader: () => redirect("/home"),
			},
			{
				path: "/home",
				element: <Homepage username={username} />,
				loader: async () => {
					if (username === "") {
						return "";
					}

					return getProdotti(JSON.parse(localStorage.getItem("token") || ""));
				},
			},
			{
				path: "/cart",
				element: <Cart />,
			},
			{
				path: "/profile",
				element: <Profile setLoggato={setLoggato} />,
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
