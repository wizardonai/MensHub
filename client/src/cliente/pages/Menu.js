import Navbar from "./components/Navbar";
import Topbar from "./components/Topbar";
import SearchBar from "./components/SearchBar";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

//elemento della lista
const ElementoLista = ({ item }) => {
	const navigate = useNavigate();

	return (
		<div
			style={css.elemento}
			onClick={() => {
				navigate("/menu/product?prodotto=" + item.id + "&daDoveArrivo=menu");
			}}
		>
			<div style={css.divImmagineElemento}>
				<img
					src={item.indirizzoImg}
					alt=''
					style={css.divImmagineElementoImg}
				/>
			</div>
			<div style={css.divNomeElemento}>
				<p style={css.nomeElemento}>{item.nome}</p>
			</div>
		</div>
	);
};
//lista completa
const Lista = ({ filtro, elencoProdotti }) => {
	// if (filtro !== "") {
	// 	prodottiFiltrati = Object.groupBy(elencoProdotti, (element) => {
	// 		return element.categoria === filtro ? "filtrati" : "nonFiltrati";
	// 	});
	// } else {
	// 	prodottiFiltrati = { filtrati: elencoProdotti };
	// }

	//

	// if (prodottiFiltrati.filtrati !== undefined) {
	// 	prodottiFiltrati.filtrati.forEach((item) => {
	// 		list.push(<ElementoLista item={item} key={item.id} />);
	// 	});
	// }

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
		list.push(<ElementoLista item={item} key={item.id} />);
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

const Menu = ({
	elencoProdotti,
	stringaSearch,
	setStringaSearch,
	hostname,
	filtri,
	setFiltri,
}) => {
	const [prodottiDaStampare, setProdottiDaStampare] = useState(
		JSON.parse(elencoProdotti).prodotti
	);

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

export default Menu;

//
//
// stili
//trovare come aggiungere questo
/*
#fitri::-webkit-scrollbar {
	display: none;
}
*/
//

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
	elemento: {
		margin: "10px",
		width: "35svw",
		height: "50svw",
		maxWidth: "140px",
		maxHeight: "200px",

		display: "flex",
		flexDirection: "column",
		borderRadius: "15px",
		boxShadow: "3px 3px 17px -3px rgba(0, 0, 0, 0.56)",
		// backgroundColor: "#222",
		// color: "white",
	},
	divImmagineElemento: {
		width: "35svw",
		height: "35svw",
		maxHeight: "140px",
		maxWidth: "140px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	divImmagineElementoImg: {
		width: "90%",
		height: "90%",
		borderRadius: "15px",
	},
	divNomeElemento: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: "15svw",
	},
	nomeElemento: {
		textAlign: "center",
		fontSize: "18px",
		fontWeight: "bold",
	},
};
