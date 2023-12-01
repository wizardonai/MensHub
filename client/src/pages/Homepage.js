//components
import Navbar from "./components/Navbar";

//css
import "./css/Homepage.css";
import "./css/Default.css";
import Topbar from "./components/Topbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = ({
	elencoProdotti,
	setLista,
	setProdotto,
	setDaDoveArrivo,
}) => {
	elencoProdotti = JSON.parse(elencoProdotti);

	const [piuAcq, setPiuAcq] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		trovaPiuAcq();
		// eslint-disable-next-line
	}, []);

	function trovaPiuAcq() {
		let tmp = elencoProdotti.prodotti;

		for (let i = 0; i < tmp.length; i++) {
			for (let j = 0; j < tmp.length - 1; j++) {
				if (tmp[j].nacq < tmp[j + 1].nacq) {
					let tmp2 = tmp[j];
					tmp[j] = tmp[j + 1];
					tmp[j + 1] = tmp2;
				}
			}
		}

		setPiuAcq([tmp[0], tmp[1], tmp[2], tmp[3]]);
	}

	return (
		<div className='page'>
			<Topbar page='home' />
			<div className='container' id='containerHome'>
				<p id='nomeMensa'>UASARD MENS</p>
				<p id='titoloHome'>I più venduti</p>

				<div id='slider'>
					<div
						id='riquadro1'
						onClick={() => {
							setLista(false);
							setProdotto(piuAcq[0]);
							setDaDoveArrivo("home");
							navigate("/menu");
						}}
					>
						<img
							src={
								Object.keys(piuAcq).length !== 0 ? piuAcq[0].indirizzoImg : ""
							}
							alt=''
						/>
						<p className='descrizione'>
							{Object.keys(piuAcq).length !== 0 ? piuAcq[0].nome : ""}
						</p>
					</div>
					<div
						id='riquadro2'
						onClick={() => {
							setLista(false);
							setProdotto(piuAcq[1]);
							setDaDoveArrivo("home");
							navigate("/menu");
						}}
					>
						<img
							src={
								Object.keys(piuAcq).length !== 0 ? piuAcq[1].indirizzoImg : ""
							}
							alt=''
						/>
						<p className='descrizione'>
							{Object.keys(piuAcq).length !== 0 ? piuAcq[1].nome : ""}
						</p>
					</div>
					<div
						id='riquadro3'
						onClick={() => {
							setLista(false);
							setProdotto(piuAcq[2]);
							setDaDoveArrivo("home");
							navigate("/menu");
						}}
					>
						<img
							src={
								Object.keys(piuAcq).length !== 0 ? piuAcq[2].indirizzoImg : ""
							}
							alt=''
						/>
						<p className='descrizione'>
							{Object.keys(piuAcq).length !== 0 ? piuAcq[2].nome : ""}
						</p>
					</div>
					<div
						id='riquadro4'
						onClick={() => {
							setLista(false);
							setProdotto(piuAcq[3]);
							setDaDoveArrivo("home");
							navigate("/menu");
						}}
					>
						<img
							src={
								Object.keys(piuAcq).length !== 0 ? piuAcq[3].indirizzoImg : ""
							}
							alt=''
						/>
						<p className='descrizione'>
							{Object.keys(piuAcq).length !== 0 ? piuAcq[3].nome : ""}
						</p>
					</div>
				</div>
			</div>
			<Navbar page='home' />
		</div>
	);
};

export default HomePage;
