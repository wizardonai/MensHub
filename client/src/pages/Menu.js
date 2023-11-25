import { useState } from "react";
import Navbar from "./components/Navbar";
import Topbar from "./components/Topbar";

import "./css/Menu.css";

const ElementoLista = ({ prodotto }) => {
	return (
		<div className='elemento'>
			<div className='divImmagineElemento'></div>
			<p className='nomeElemento'>{prodotto.nome}</p>
		</div>
	);
};
const Lista = ({ filtro }) => {
	const oggettone = {
		prodotti: [
			{
				id: 1,
				nome: "paninazzo",
				descrizione: "panino con la mortadella casareccia",
				prezzo: 69.69,
				categoria: "panino",
				indirizzoImg: "asdasd",
				disponibilita: true,
				idm: "",
				nacq: 69,
			},
			{
				id: 2,
				nome: "carbonara",
				descrizione: "panino con la mortadella casareccia",
				prezzo: 69.69,
				categoria: "primo",
				indirizzoImg: "asdasd",
				disponibilita: true,
				idm: "",
				nacq: 69,
			},
			{
				id: 3,
				nome: "spaghetti all'arrabbiata",
				descrizione: "panino con la mortadella casareccia",
				prezzo: 69.69,
				categoria: "primo",
				indirizzoImg: "asdasd",
				disponibilita: true,
				idm: "",
				nacq: 69,
			},
			{
				id: 4,
				nome: "cotoletta con le patatins",
				descrizione: "panino con la mortadella casareccia",
				prezzo: 69.69,
				categoria: "secondo",
				indirizzoImg: "asdasd",
				disponibilita: true,
				idm: "",
				nacq: 69,
			},
			{
				id: 5,
				nome: "panna cotta",
				descrizione: "panino con la mortadella casareccia",
				prezzo: 69.69,
				categoria: "dolce",
				indirizzoImg: "asdasd",
				disponibilita: true,
				idm: "",
				nacq: 69,
			},
			{
				id: 6,
				nome: "insalata",
				descrizione: "panino con la mortadella casareccia",
				prezzo: 69.69,
				categoria: "contorno",
				indirizzoImg: "asdasd",
				disponibilita: true,
				idm: "",
				nacq: 69,
			},
			{
				id: 7,
				nome: "paninazzo",
				descrizione: "panino con la mortadella casareccia",
				prezzo: 69.69,
				categoria: "panino",
				indirizzoImg: "asdasd",
				disponibilita: true,
				idm: "",
				nacq: 69,
			},
			{
				id: 8,
				nome: "paninazzo",
				descrizione: "panino con la mortadella casareccia",
				prezzo: 69.69,
				categoria: "panino",
				indirizzoImg: "asdasd",
				disponibilita: true,
				idm: "",
				nacq: 69,
			},
		],
	};

	const lista = [];
	oggettone.prodotti.forEach((item) => {
		if (filtro !== "") {
			if (filtro === item.categoria) {
				lista.push(<ElementoLista prodotto={item} key={item.id} />);
			}
		} else {
			lista.push(<ElementoLista prodotto={item} key={item.id} />);
		}
	});

	return lista;
};

const Menu = () => {
	const [antipasti, setAntipasti] = useState(false);
	const [primi, setPrimi] = useState(false);
	const [secondi, setSecondi] = useState(false);
	const [contorni, setContorni] = useState(false);
	const [panini, setPanini] = useState(false);
	const [dolci, setDolci] = useState(false);

	function disattivaAltriFiltri(x) {
		const array = [
			setAntipasti,
			setPrimi,
			setSecondi,
			setContorni,
			setPanini,
			setDolci,
		];

		if (x > array.length) {
			array.forEach((item) => {
				item(false);
			});
		} else {
			array.forEach((item, index) => {
				if (index !== x) {
					item(false);
				} else {
					item(true);
				}
			});
		}
	}

	function filtroAttivo() {
		const stati = [antipasti, primi, secondi, contorni, panini, dolci];
		const stringhe = [
			"antipasto",
			"primo",
			"secondo",
			"contorno",
			"panino",
			"dolce",
		];
		let daRitornare = "";
		stati.forEach((item, index) => {
			if (item) {
				daRitornare = stringhe[index];
			}
		});

		return daRitornare;
	}

	return (
		<div className='page'>
			<Topbar page='menu' />
			<div className='container'>
				<div id='filtri'>
					<div
						className={antipasti ? "filtroCliccato" : ""}
						onClick={() => {
							if (antipasti) {
								disattivaAltriFiltri(10);
							} else {
								disattivaAltriFiltri(0);
							}
						}}
					>
						Antipasti
					</div>
					<div
						className={primi ? "filtroCliccato" : ""}
						onClick={() => {
							if (primi) {
								disattivaAltriFiltri(10);
							} else {
								disattivaAltriFiltri(1);
							}
						}}
					>
						Primi
					</div>
					<div
						className={secondi ? "filtroCliccato" : ""}
						onClick={() => {
							if (secondi) {
								disattivaAltriFiltri(10);
							} else {
								disattivaAltriFiltri(2);
							}
						}}
					>
						Secondi
					</div>
					<div
						className={contorni ? "filtroCliccato" : ""}
						onClick={() => {
							if (contorni) {
								disattivaAltriFiltri(10);
							} else {
								disattivaAltriFiltri(3);
							}
						}}
					>
						Contorni
					</div>
					<div
						className={panini ? "filtroCliccato" : ""}
						onClick={() => {
							if (panini) {
								disattivaAltriFiltri(10);
							} else {
								disattivaAltriFiltri(4);
							}
						}}
					>
						Panini
					</div>
					<div
						className={dolci ? "filtroCliccato" : ""}
						onClick={() => {
							if (dolci) {
								disattivaAltriFiltri(10);
							} else {
								disattivaAltriFiltri(5);
							}
						}}
					>
						Dolci
					</div>
				</div>
				<div id='lista'>
					<Lista filtro={filtroAttivo()} />
				</div>
			</div>
			<Navbar page='menu' />
		</div>
	);
};

export default Menu;
