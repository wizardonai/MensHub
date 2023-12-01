import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Topbar from "./components/Topbar";
import SearchBar from "./components/SearchBar";

import "./css/Menu.css";

//lista prodotti
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
	lista,
	setLista,
	prodotto,
	setProdotto,
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
	setDaDoveArrivo,
	stringaSearch,
	setStringaSearch,
	hostname,
	prodottiDaStampare,
	setProdottiDaStampare,
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

	useEffect(() => {
		setDaDoveArrivo("menu");
		//eslint-disable-next-line
	}, []);

	return (
		<>
			<SearchBar
				elencoProdotti={elencoProdotti}
				stringaSearch={stringaSearch}
				setStringaSearch={setStringaSearch}
				hostname={hostname}
				setProdottiDaStampare={setProdottiDaStampare}
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
				<Lista
					filtro={filtroAttivo()}
					setLista={setLista}
					setProdotto={setProdotto}
					elencoProdotti={prodottiDaStampare}
				/>
			</div>
		</>
	);
};

//pagina singolo prodotto
const PaginaProdotto = ({ setLista, prodotto }) => {
	return (
		<>
			<div id='informazioniProdotto'>
				<img src={prodotto.indirizzoImg} alt='' id='imgProdotto' />
				<p id='nomeProdotto'>{prodotto.nome}</p>
				<p id='prezzoProdotto'>Prezzo: {prodotto.prezzo}€</p>
				<p id='descrizioneProdotto'>{prodotto.descrizione}</p>
			</div>
		</>
	);
};

const Menu = ({
	lista,
	setLista,
	prodotto,
	setProdotto,
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
	daDoveArrivo,
	setDaDoveArrivo,
	stringaSearch,
	setStringaSearch,
	hostname,
	prodottiDaStampare,
	setProdottiDaStampare,
}) => {
	return (
		<div className='page'>
			<Topbar
				page='menu'
				setLista={setLista}
				lista={lista}
				prodotto={prodotto}
				daDoveArrivo={daDoveArrivo}
			/>
			<div className='container' id='containerMenu'>
				{lista ? (
					<ListaProdotti
						lista={lista}
						setLista={setLista}
						prodotto={prodotto}
						setProdotto={setProdotto}
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
						setDaDoveArrivo={setDaDoveArrivo}
						stringaSearch={stringaSearch}
						setStringaSearch={setStringaSearch}
						hostname={hostname}
						prodottiDaStampare={prodottiDaStampare}
						setProdottiDaStampare={setProdottiDaStampare}
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
