import Navbar from "./components/Navbar";
import Topbar from "./components/Topbar";
import SearchBar from "./components/SearchBar";

import "./css/Menu.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

//lista prodotti
const ElementoLista = ({ item }) => {
	const navigate = useNavigate();

	return (
		<div
			className='elemento'
			onClick={() => {
				navigate("/menu/product?prodotto=" + item.id + "&daDoveArrivo=menu");
			}}
		>
			<div className='divImmagineElemento'>
				<img src={item.indirizzoImg} alt='' />
			</div>
			<div className='divNomeElemento'>
				<p className='nomeElemento'>{item.nome}</p>
			</div>
		</div>
	);
};
const Lista = ({ filtro, setLista, setProdotto, elencoProdotti }) => {
	// elencoProdotti = JSON.parse(elencoProdotti);

	const list = [];
	elencoProdotti.forEach((item) => {
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
const ListaProdotti = ({
	antipasti,
	primi,
	secondi,
	contorni,
	panini,
	dolci,
	setAntipasti,
	setPrimi,
	setSecondi,
	setContorni,
	setPanini,
	setDolci,
	elencoProdotti,
	stringaSearch,
	setStringaSearch,
	prodottiDaStampare,
	setProdottiDaStampare,
	hostname,
}) => {
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
			<SearchBar
				elencoProdotti={elencoProdotti}
				stringaSearch={stringaSearch}
				setStringaSearch={setStringaSearch}
				setProdottiDaStampare={setProdottiDaStampare}
				hostname={hostname}
			/>
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
				<Lista filtro={filtroAttivo()} elencoProdotti={prodottiDaStampare} />
			</div>
		</>
	);
};

const Menu = ({
	antipasti,
	primi,
	secondi,
	contorni,
	panini,
	dolci,
	setAntipasti,
	setPrimi,
	setSecondi,
	setContorni,
	setPanini,
	setDolci,
	elencoProdotti,
	stringaSearch,
	setStringaSearch,
	hostname,
}) => {
	const [prodottiDaStampare, setProdottiDaStampare] = useState(
		JSON.parse(elencoProdotti).prodotti
	);

	return (
		<div className='page'>
			<Topbar page='menu' />
			<div className='container' id='containerMenu'>
				<ListaProdotti
					antipasti={antipasti}
					primi={primi}
					secondi={secondi}
					contorni={contorni}
					panini={panini}
					dolci={dolci}
					setAntipasti={setAntipasti}
					setPrimi={setPrimi}
					setSecondi={setSecondi}
					setContorni={setContorni}
					setPanini={setPanini}
					setDolci={setDolci}
					elencoProdotti={elencoProdotti}
					stringaSearch={stringaSearch}
					setStringaSearch={setStringaSearch}
					prodottiDaStampare={prodottiDaStampare}
					setProdottiDaStampare={setProdottiDaStampare}
					hostname={hostname}
				/>
			</div>
			<Navbar page='menu' />
		</div>
	);
};

export default Menu;
