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
const Lista = ({ filtro, elencoProdotti }) => {
	let prodottiFiltrati;
	if (filtro !== "") {
		prodottiFiltrati = Object.groupBy(elencoProdotti, (element) => {
			return element.categoria === filtro ? "filtrati" : "nonFiltrati";
		});
	} else {
		prodottiFiltrati = { filtrati: elencoProdotti };
	}

	const list = [];

	if (prodottiFiltrati.filtrati !== undefined) {
		prodottiFiltrati.filtrati.forEach((item) => {
			list.push(<ElementoLista item={item} key={item.id} />);
		});
	}

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
					className={filtri[nomi[index]] ? "filtroCliccato" : ""}
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

	return <div id='filtri'>{ritornaElementi()}</div>;
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
			<Topbar page='menu' />
			<div className='container' id='containerMenu'>
				<SearchBar
					elencoProdotti={elencoProdotti}
					stringaSearch={stringaSearch}
					setStringaSearch={setStringaSearch}
					setProdottiDaStampare={setProdottiDaStampare}
					hostname={hostname}
				/>
				<Filtri filtri={filtri} setFiltri={setFiltri} />
				<div id='lista'>
					<Lista filtro={filtroAttivo()} elencoProdotti={prodottiDaStampare} />
				</div>
			</div>
			<Navbar page='menu' />
		</div>
	);
};

export default Menu;
