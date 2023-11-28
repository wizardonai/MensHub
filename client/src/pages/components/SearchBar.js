//css
import "../css/Search.css";
import "../css/Default.css";
import { useEffect, useState } from "react";

const SearchBar = ({
	elencoProdotti,
	stringaSearch,
	setStringaSearch,
	hostname,
	setProdottiDaStampare,
}) => {
	elencoProdotti = JSON.parse(elencoProdotti);

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
	);
};

export default SearchBar;
