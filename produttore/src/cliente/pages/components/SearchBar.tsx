//css
import { useEffect } from "react";
import { ArrayProdotti, styleMap } from "../../../App";
import { hostname } from "../../../App";
import { prodotto } from "../Homepage";
import { useTheme } from "next-themes";

const SearchBar = ({
	elencoProdotti,
	stringaSearch,
	setStringaSearch,
	setProdottiDaStampare,
}: {
	elencoProdotti: ArrayProdotti;
	stringaSearch: string;
	setStringaSearch: Function;
	setProdottiDaStampare: Function;
}) => {
	const { resolvedTheme } = useTheme();

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

	function controlliSearch(e: any, effect: boolean) {
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
						let tmp: Array<string> = [];
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

				let prodotti: Array<prodotto> = [];

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
	//
	//
	// stili
	//

	const css: styleMap = {
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
			/*
			border: "1px solid",
			borderColor: "var(--foreground)",
			borderRadius: "20px",
			*/
			display: "flex",
			alignItems: "center",
			padding: "5px 0",
			justifyContent: "space-evenly",
			backgroundColor: "var(--background)",
			width: "98svw",
			margin: "0.5svw 0.5svw",
			outline: "none",
			maxHeight: "30px",
			boxSizing: "content-box",
		},
		searchBar: {
			fontSize: "20px",
			height: "50px",
			border: "0",
			backgroundColor: "transparent",
			outline: "none",
			width: "80%",
		},
		bottoneCerca: {
			height: "6%",
			maxHeight: "30px",
			filter:
				resolvedTheme === "light"
					? ""
					: "invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg) brightness(102%) contrast(102%)",
		},
	};

	return (
		<div style={css.divSearchBar}>
			<img src={hostname + "search.png"} alt='' style={css.bottoneCerca} />
			<input
				type='text'
				placeholder='Cerca prodotti...'
				// @ts-ignore
				onChange={controlliSearch}
				value={stringaSearch}
				style={css.searchBar}
				// @ts-ignore
				onClick={controlliSearch}
			/>
		</div>
	);
};

export default SearchBar;
