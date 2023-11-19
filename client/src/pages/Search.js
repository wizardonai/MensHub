//components
import Navbar from "./components/Navbar";

//css
import "./css/Search.css";
import './css/Default.css';

//immagini
import bottoneCerca from './image/search.png';

function Search() {
	return (
		<div className='page'>
			<div className='topbar' id="topbarSearch">
				<div id="divSearchBar" >
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