import { useEffect, useState } from "react";
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
import { getProfilo } from "./scripts/fetch";

function App() {
	const [loggato, setLoggato] = useLocalStorage("loggato", false);
	const [username, setUsername] = useState("");

	let router;
	if (loggato) {
		getProfilo(
			JSON.parse(localStorage.getItem("token") || "{}").token || ""
		).then((res: any) => {
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
