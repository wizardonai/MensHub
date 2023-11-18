import { useNavigate } from "react-router-dom";

//components
import Navbar from "./components/Navbar";

//css
import "./css/Homepage.css";
import './css/Default.css';

//immagini
import bottoneCerca from './image/search.png';

function HomePage() {
	const navigate = useNavigate();

	function navigateToSearch()
	{
		navigate('/search');
	}

	return (
		<div className='page'>
			<div className='topbar' id="topbarHome">
				<div id="divSearchBar" onClick={navigateToSearch} >
					<input type="text" id="searchBarHome" placeholder="Cerca prodotti..." readOnly/>
					<img src={bottoneCerca} alt="" id="bottoneCerca" />
				</div>
			</div>
			<div className='container'></div>
			<Navbar />
		</div>
	);
}

export default HomePage;