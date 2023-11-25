import { useState } from "react";
import Navbar from "./components/Navbar";
import Topbar from "./components/Topbar";

import "./css/Menu.css";

import paninoMortazza from "./image/paninoMortazza.png";

const ElementoLista = ({ item, setProdotto, setLista }) => {
	return (
		<div
			className='elemento'
			onClick={() => {
				setProdotto(item);
				setLista(false);
			}}
		>
			<div className='divImmagineElemento'>
				<img src={paninoMortazza} alt='' />
			</div>
			<div className='divNomeElemento'>
				<p className='nomeElemento'>{item.nome}</p>
			</div>
		</div>
	);
};
const Lista = ({ filtro, setLista, setProdotto }) => {
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

	const list = [];
	oggettone.prodotti.forEach((item) => {
		if (filtro !== "") {
			if (filtro === item.categoria) {
				list.push(
					<ElementoLista
						item={item}
						key={item.id}
						setLista={setLista}
						setProdotto={setProdotto}
					/>
				);
			}
		} else {
			list.push(
				<ElementoLista
					item={item}
					key={item.id}
					setLista={setLista}
					setProdotto={setProdotto}
				/>
			);
		}
	});

	return list;
};

const PaginaProdotto = ({ setLista, prodotto }) => {
	return (
		<>
			<div id='informazioniProdotto'>
				<img src={paninoMortazza} alt='' id='imgProdotto' />
				<p id='nomeProdotto'>{prodotto.nome}</p>
				<p id='prezzoProdotto'>Prezzo: {prodotto.prezzo}€</p>
				<p id='descrizioneProdotto'>{prodotto.descrizione}</p>
			</div>
		</>
	);
};
const ListaProdotti = ({ lista, setLista, prodotto, setProdotto }) => {
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
		<>
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
				<Lista
					filtro={filtroAttivo()}
					setLista={setLista}
					setProdotto={setProdotto}
				/>
			</div>
		</>
	);
};

const Menu = ({ lista, setLista, prodotto, setProdotto }) => {
	return (
		<div className='page'>
			<Topbar
				page='menu'
				setLista={setLista}
				lista={lista}
				prodotto={prodotto}
			/>
			<div className='container' id='containerMenu'>
				{lista ? (
					<ListaProdotti
						lista={lista}
						setLista={setLista}
						prodotto={prodotto}
						setProdotto={setProdotto}
					/>
				) : (
					<PaginaProdotto setLista={setLista} prodotto={prodotto} />
				)}
			</div>
			<Navbar page='menu' />
		</div>
	);
};

export default Menu;
