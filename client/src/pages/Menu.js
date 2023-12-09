import Navbar from "./components/Navbar";
import Topbar from "./components/Topbar";
import SearchBar from "./components/SearchBar";

import "./css/Menu.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

//elemento della lista
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
//lista completa
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

//filtri
const Filtri = ({
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

	function ritornaElementi() {
		const nomi = [
			["antipasti", antipasti],
			["primi", primi],
			["secondi", secondi],
			["contorni", contorni],
			["panini", panini],
			["dolci", dolci],
		];

		let lista = [];

		nomi.forEach((item, index) => {
			lista.push(
				<div
					className={item[1] ? "filtroCliccato" : ""}
					onClick={() => {
						if (item[1]) {
							disattivaAltriFiltri(10);
						} else {
							disattivaAltriFiltri(index);
						}
					}}
				>
					{item[0]}
				</div>
			);
		});

		return lista;
	}

	return <div id='filtri'>{ritornaElementi()}</div>;
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
			<div className='container' id='containerMenu'>
				<SearchBar
					elencoProdotti={elencoProdotti}
					stringaSearch={stringaSearch}
					setStringaSearch={setStringaSearch}
					setProdottiDaStampare={setProdottiDaStampare}
					hostname={hostname}
				/>
				<Filtri
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
				/>
				<div id='lista'>
					<Lista filtro={filtroAttivo()} elencoProdotti={prodottiDaStampare} />
				</div>
			</div>
			<Navbar page='menu' />
		</div>
	);
};

export default Menu;
