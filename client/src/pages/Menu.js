import Navbar from "./components/Navbar";
import Topbar from "./components/Topbar";

function Menu() {
	return (
		<div className='page'>
			<Topbar page='menu' />
			<div className='container'></div>
			<Navbar page='menu' />
		</div>
	);
}

export default Menu;
