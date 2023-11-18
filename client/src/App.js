import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Homepage";

function App() {
	return (
		<Routes>
			<Route path='/' Component={HomePage} />
		</Routes>
	);
}

export default App;
