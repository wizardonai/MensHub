//components
import Navbar from "./components/Navbar";

//css
import "./css/Homepage.css";
import "./css/Default.css";
import Topbar from "./components/Topbar";

const HomePage = () => {
	return (
		<div className='page'>
			<Topbar page='home' />
			<div className='container'>
				<div id='divSlider'></div>
				<div id='divRiquadri'>
					<div id='riquadroSearch'></div>
					<div id='riquadroMenu'></div>
					<div id='riquadroOrders'></div>
					<div id='riquadroProfile'></div>
				</div>
			</div>
			<Navbar page='home' />
		</div>
	);
};

export default HomePage;
