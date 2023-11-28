//css
import "../css/SearchBar.css";
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

		if (str.length > 0) {
			let indici = [];
			for (let i = 0; i < elencoProdotti.prodotti.length; i++) {
				let arr = elencoProdotti.prodotti[i].nome.split(" ");

				let arr2 = [];
				if (arr.length === 1) {
					arr2.push(arr[0]);
				} else {
					let tmp = [];
					arr.forEach((item) => {
						let tmp2 = item.split("'");
						tmp2.forEach((item2) => {
							tmp.push(item2);
						});
					});

					tmp.forEach((item) => {
						arr2.push(item);
					});
				}

				for (let j = 0; j < arr2.length; j++) {
					if (arr2[j].slice(0, nChar) === str) {
						indici.push(i);
						break;
					}
				}
			}

			let prodotti = [];

			indici.forEach((item) => {
				prodotti.push(elencoProdotti.prodotti[item]);
			});

			setProdottiDaStampare(prodotti);
		} else {
			setProdottiDaStampare(elencoProdotti.prodotti);
		}
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
