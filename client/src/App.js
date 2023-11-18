import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Homepage";
import Search from "./pages/Search";

function App() {
	return (
		<Routes>
			<Route path='/' Component={HomePage} />
			<Route path='/search' Component={Search} />
		</Routes>
	);
}

export default App;
