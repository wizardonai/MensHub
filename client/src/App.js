import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Homepage";
import Search from "./pages/Search";
import Menu from "./pages/Menu";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import { useState } from "react";

function App() {
	const [lista, setLista] = useState(true);
	const [prodotto, setProdotto] = useState({});

	return (
		<Routes>
			<Route path='/' Component={HomePage} />
			<Route path='/search' Component={Search} />
			<Route
				path='/menu'
				element={
					<Menu
						lista={lista}
						setLista={setLista}
						prodotto={prodotto}
						setProdotto={setProdotto}
					/>
				}
			/>
			<Route path='/orders' Component={Orders} />
			<Route path='/profile' Component={Profile} />
		</Routes>
	);
}

export default App;
