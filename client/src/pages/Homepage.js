//components
import Navbar from "./components/Navbar";

import paninoMortazza from "./image/paninoMortazza.png";

//css
import "./css/Homepage.css";
import "./css/Default.css";
import Topbar from "./components/Topbar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
	const navigate = useNavigate();

	return (
		<div className='page'>
			<Topbar page='home' />
			<div className='container' id='containerHome'>
				<p id='nomeMensa'>NOME MENSA</p>
				<p id='titoloHome'>I più venduti</p>

				<div id='slider'>
					<div id='riquadro1'>
						<img src={paninoMortazza} alt='' />
						<p className='descrizione'>Panino c'a mortazza</p>
					</div>
					<div id='riquadro2'>
						<img src={paninoMortazza} alt='' />
						<p className='descrizione'>Panino c'a mortazza</p>
					</div>
					<div id='riquadro3'>
						<img src={paninoMortazza} alt='' />
						<p className='descrizione'>Panino c'a mortazza</p>
					</div>
					<div id='riquadro4'>
						<img src={paninoMortazza} alt='' />
						<p className='descrizione'>Panino c'a mortazza</p>
					</div>
				</div>

				{/* <div id='divRiquadri'>
					
					<div id='riquadro5'></div>
					<div id='riquadro6'></div>
				</div> */}
			</div>
			<Navbar page='home' />
		</div>
	);
};

export default HomePage;
