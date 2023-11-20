import Navbar from "./components/Navbar";
import Topbar from "./components/Topbar";

function Orders() {
	return (
		<div className='page'>
			<Topbar page='orders' />
			<div className='container'></div>
			<Navbar page='orders' />
		</div>
	);
}

export default Orders;
