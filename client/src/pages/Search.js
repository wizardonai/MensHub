//components
import Navbar from "./components/Navbar";
import Topbar from "./components/Topbar";

//css
import "./css/Search.css";
import "./css/Default.css";

const Search = () => {
	return (
		<div className='page'>
			<Topbar page='search' />
			<div className='container'></div>
			<Navbar page='search' />
		</div>
	);
};

export default Search;
