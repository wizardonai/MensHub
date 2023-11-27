//components
import Navbar from "./components/Navbar";
import Topbar from "./components/Topbar";

//css
import "./css/Search.css";
import "./css/Default.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ElementoLista = ({ item, setLista, setProdotto, setDaDoveArrivo }) => {
	item = JSON.parse(item);

	const navigate = useNavigate();

	return (
		<div
			className='elemento'
			onClick={() => {
				setDaDoveArrivo("search");
				setLista(false);
				setProdotto(item);
				navigate("/menu");
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
const Lista = ({ elencoProdotti, setLista, setProdotto, setDaDoveArrivo }) => {
	elencoProdotti = JSON.parse(elencoProdotti);

	const list = [];
	elencoProdotti.forEach((item) => {
		list.push(
			<ElementoLista
				item={JSON.stringify(item)}
				key={item.id}
				setLista={setLista}
				setProdotto={setProdotto}
				setDaDoveArrivo={setDaDoveArrivo}
			/>
		);
	});

	return list;
};

const Search = ({
	elencoProdotti,
	setLista,
	setProdotto,
	setDaDoveArrivo,
	stringaSearch,
	setStringaSearch,
	hostname,
}) => {
	elencoProdotti = JSON.parse(elencoProdotti);
	const [prodottiDaStampare, setProdottiDaStampare] = useState(
		elencoProdotti.prodotti
	);

	useEffect(() => {
		elencoProdotti.prodotti.sort((a, b) => {
			if (a.nome > b.nome) {
				return 1;
			}
			if (a.nome < b.nome) {
				return -1;
			}
			return 0;
		});
	}, []);

	function controlliSearch(e) {
		let str = e.target.value;
		setStringaSearch(str);

		const nChar = str.length;

		let indici = [];
		for (let i = 0; i < elencoProdotti.prodotti.length; i++) {
			if (elencoProdotti.prodotti[i].nome.slice(0, nChar) === str) {
				indici.push(i);
			}
		}

		let prodotti = [];

		indici.forEach((item) => {
			prodotti.push(elencoProdotti.prodotti[item]);
		});

		setProdottiDaStampare(prodotti);
	}

	return (
		<div className='page'>
			<Topbar page='search' />
			<div className='container' id='containerSearch'>
				<div id='divSearchBar'>
					<input
						type='text'
						placeholder='Cerca prodotti...'
						onChange={controlliSearch}
						value={stringaSearch}
						id='searchBar'
						onClick={controlliSearch}
					/>
					<img src={hostname + "search.png"} alt='' id='bottoneCerca' />
				</div>
				<div id='risultatiRicerca'>
					<Lista
						elencoProdotti={JSON.stringify(prodottiDaStampare)}
						setLista={setLista}
						setProdotto={setProdotto}
						setDaDoveArrivo={setDaDoveArrivo}
					/>
				</div>
			</div>
			<Navbar page='search' />
		</div>
	);
};

export default Search;
