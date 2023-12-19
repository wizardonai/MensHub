//css
import { useEffect } from "react";

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
		//eslint-disable-next-line
	}, []);

	function controlliSearch(e, effect) {
		if (!effect) {
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
		} else {
			setProdottiDaStampare(elencoProdotti.prodotti);
		}
	}

	useEffect(() => {
		controlliSearch(null, true);
		// eslint-disable-next-line
	}, []);

	return (
		<div style={css.divSearchBar}>
			<img src={hostname + "search.png"} alt='' style={css.bottoneCerca} />
			<input
				type='text'
				placeholder='Cerca prodotti...'
				onChange={controlliSearch}
				value={stringaSearch}
				style={css.searchBar}
				onClick={controlliSearch}
			/>
		</div>
	);
};

export default SearchBar;

//
//
// stili
//

const css = {
	containerSearch: {
		overflowY: "scroll",
		overflowX: "hidden",
	},
	risultatiRicerca: {
		display: "flex",
		flexWrap: "wrap",
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	divSearchBar: {
		border: "2px solid black",
		borderRadius: "20px",
		display: "flex",
		alignItems: "center",
		padding: "5px 0",
		justifyContent: "space-evenly",
		backgroundColor: "white",
		width: "calc(100% - 25px)",
		width: "98svw",
		margin: "0.5svw 0.5svw",
		outline: "none",
	},
	searchBar: {
		fontSize: "20px",
		height: "30px",
		border: "0",
		backgroundColor: "transparent",
		outline: "none",
		width: "80%",
	},
	bottoneCerca: {
		width: "6%",
	},
};
