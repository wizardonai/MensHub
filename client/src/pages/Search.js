import { useNavigate } from "react-router-dom";

//components
import Navbar from "./components/Navbar";

//css
import "./css/Search.css";
import './css/Default.css';

//immagini
import bottoneCerca from './image/search.png';

function Search() {
	const navigate = useNavigate();

	function navigateToSearch()
	{
		navigate('/search');
	}

	return (
		<div className='page'>
			<div className='topbar' id="topbarSearch">
				<div id="divSearchBar" onClick={navigateToSearch} >
					<input type="text" id="searchBarSearch" placeholder="Cerca prodotti..." autoFocus />
					<img src={bottoneCerca} alt="" id="bottoneCerca" />
				</div>
			</div>
			<div className='container'></div>
			<Navbar />
		</div>
	);
}

export default Search;