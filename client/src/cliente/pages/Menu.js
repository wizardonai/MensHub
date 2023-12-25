import Navbar from "./components/Navbar";
import Topbar from "./components/Topbar";
import SearchBar from "./components/SearchBar";
import ListElement from "./components/ListElement";

import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";

//lista completa
const Lista = ({ filtro, elencoProdotti }) => {
	let prodottiFiltrati = [];
	if (filtro !== "") {
		elencoProdotti.forEach((item) => {
			if (filtro === item.categoria) {
				prodottiFiltrati.push(item);
			}
		});
	} else {
		prodottiFiltrati = elencoProdotti;
	}

	let list = [];
	prodottiFiltrati.forEach((item) => {
		list.push(<ListElement item={item} key={item.id} daDoveArrivo='menu' />);
	});

	return list;
};

//filtri
const Filtri = ({ filtri, setFiltri }) => {
	function disattivaAltriFiltri(x) {
		const possibiliFiltri = [
			"antipasti",
			"primi",
			"secondi",
			"contorni",
			"panini",
			"dolci",
		];

		if (x > possibiliFiltri.length) {
			setFiltri((prev) => ({
				antipasti: false,
				primi: false,
				secondi: false,
				contorni: false,
				panini: false,
				dolci: false,
			}));
		} else {
			let tmp = {
				antipasti: false,
				primi: false,
				secondi: false,
				contorni: false,
				panini: false,
				dolci: false,
			};
			tmp[possibiliFiltri[x]] = true;
			setFiltri(tmp);
		}
	}

	function ritornaElementi() {
		const nomi = [
			"antipasti",
			"primi",
			"secondi",
			"contorni",
			"panini",
			"dolci",
		];

		let lista = [];

		nomi.forEach((item, index) => {
			lista.push(
				<div
					key={index}
					style={
						filtri[nomi[index]]
							? {
									...css.filtriDiv,
									...css.filtroCliccato,
							  }
							: css.filtriDiv
					}
					onClick={() => {
						if (filtri[nomi[index]]) {
							disattivaAltriFiltri(10);
						} else {
							disattivaAltriFiltri(index);
						}
					}}
				>
					{item}
				</div>
			);
		});

		return lista;
	}

	return <div style={css.filtri}>{ritornaElementi()}</div>;
};

const Menu = () => {
	const data = useLoaderData();
	const [prodottiDaStampare, setProdottiDaStampare] = useState([]);

	if (!data) return <p>Caricamento</p>;

	const elencoProdotti = data.prodotti;
	const { stringaSearch, setStringaSearch, hostname, filtri, setFiltri } = data;
	if (prodottiDaStampare.length === 0)
		setProdottiDaStampare(elencoProdotti.prodotti);

	function filtroAttivo() {
		const stati = [
			filtri.antipasti,
			filtri.primi,
			filtri.secondi,
			filtri.contorni,
			filtri.panini,
			filtri.dolci,
		];

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
			<Topbar titolo='menu' />
			<div className='container' style={css.containerMenu}>
				<SearchBar
					elencoProdotti={elencoProdotti}
					stringaSearch={stringaSearch}
					setStringaSearch={setStringaSearch}
					setProdottiDaStampare={setProdottiDaStampare}
					hostname={hostname}
				/>
				<Filtri filtri={filtri} setFiltri={setFiltri} />
				<div style={css.lista}>
					<Lista filtro={filtroAttivo()} elencoProdotti={prodottiDaStampare} />
				</div>
			</div>
			<Navbar page='menu' />
		</div>
	);
};

const css = {
	containerMenu: {
		overflowY: "scroll",
		overflowX: "hidden",
	},
	filtri: {
		width: "100%",
		overflowX: "scroll",
		overflowY: "hidden",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		flexWrap: "nowrap",
		height: "10%",
		scrollbarWidth: "none",
	},
	filtriDiv: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		fontSize: "20px",
		padding: "5px 15px",
		margin: "0.5svw",
		border: "2px solid #222",
		borderRadius: "20px",
		cursor: "pointer",
	},
	cliccato: {
		color: "white",
		backgroundColor: "#1a5d1a",
	},
	filtroCliccato: {
		backgroundColor: "#222",
		color: "white",
	},
	lista: {
		padding: "0 15px 15px 15px",
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "center",
		alignItems: "center",
	},
};

export default Menu;
