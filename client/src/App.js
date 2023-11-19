import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Homepage";
import Search from "./pages/Search";
import Menu from "./pages/Menu";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";

function App() {
	return (
		<Routes>
			<Route path='/' Component={HomePage} />
			<Route path='/search' Component={Search} />
			<Route path='/menu' Component={Menu} />
			<Route path='/orders' Component={Orders} />
			<Route path='/profile' Component={Profile} />
		</Routes>
	);
}

export default App;
