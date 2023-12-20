//components
import Navbar from "./components/Navbar";

//css
import "./css/Homepage.css";
import "./css/Default.css";
import Topbar from "./components/Topbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Slider = ({ piuAcq }) => {
	const navigate = useNavigate();
	let lista = [];

	piuAcq.forEach((item, index) => {
		lista.push(
			<div
				className='elemento'
				onClick={() => {
					navigate("/menu/product?prodotto=" + item.id + "&daDoveArrivo=home");
				}}
				key={index}
			>
				<div className='divImmagineElemento'>
					<img
						src={Object.keys(piuAcq).length > 0 ? item.indirizzoImg : ""}
						alt=''
					/>
				</div>
				<div className='divNomeElemento'>
					<p className='nomeElemento'>
						{Object.keys(piuAcq).length > 0 ? item.nome : ""}
					</p>
				</div>
			</div>
		);
	});

	return lista;
};

const NPIUACQ = 5;

const HomePage = ({ elencoProdotti }) => {
	elencoProdotti = JSON.parse(elencoProdotti);

	const [piuAcq, setPiuAcq] = useState([]);

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

		let tmp2 = [];
		for (let i = 0; i < NPIUACQ; i++) {
			tmp2.push(tmp[i]);
		}
		setPiuAcq(tmp2);
	}

	return (
		<div className='page'>
			<Topbar page='home' />
			<div className='container' id='containerHome'>
				<p id='nomeMensa'>UASARD MENS</p>
				<p id='titoloHome'>I più venduti</p>
				<div id='slider'>
					<Slider piuAcq={piuAcq} />
				</div>
			</div>
			<Navbar page='home' />
		</div>
	);
};

export default HomePage;