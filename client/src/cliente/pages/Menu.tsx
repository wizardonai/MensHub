import Navbar from "./components/Navbar";
import Topbar from "./components/Topbar";
import SearchBar from "./components/SearchBar";
import ListElement from "./components/ListElement";

import { useLoaderData } from "react-router-dom";
import React, { useState } from "react";
import { ArrayProdotti, filtroMap, styleMap } from "../../App";
import { prodotto } from "./Homepage";

import "./css/animazioniFiltri.css";
import { hostnameImg, sleep } from "../utils";

//lista completa
const Lista = ({
	filtro,
	elencoProdotti,
}: {
	filtro: string;
	elencoProdotti: Array<prodotto>;
}) => {
	let prodottiFiltrati: Array<prodotto> = [];
	if (filtro !== "") {
		elencoProdotti.forEach((item) => {
			if (filtro === item.categoria) {
				prodottiFiltrati.push(item);
			}
		});
	} else {
		prodottiFiltrati = elencoProdotti;
	}

	let list: Array<React.JSX.Element> = [];
	prodottiFiltrati.forEach((item, index) => {
		list.push(
			<ListElement
				item={item}
				key={item.id}
				index={index}
				daDoveArrivo='menu'
			/>
		);
	});

	return list;
};

//filtri
const Filtri = ({
	filtri,
	setFiltri,
}: {
	filtri: filtroMap;
	setFiltri: Function;
}) => {
	function disattivaAltriFiltri(x: number) {
		const possibiliFiltri = [
			"antipasti",
			"primi",
			"secondi",
			"contorni",
			"panini",
			"dolci",
		];

		if (x > possibiliFiltri.length) {
			setFiltri({
				antipasti: false,
				primi: false,
				secondi: false,
				contorni: false,
				panini: false,
				dolci: false,
			});
		} else {
			let tmp: filtroMap = {
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
		const nomi: Array<string> = [
			"antipasti",
			"primi",
			"secondi",
			"contorni",
			"panini",
			"dolci",
		];

		let cliccato: string = "";
		nomi.forEach((item, index) => {
			if (filtri[item]) {
				cliccato = item;
			}
		});

		if (cliccato == "") {
			let lista: Array<React.JSX.Element> = [];

			nomi.forEach((item, index) => {
				lista.push(
					<div
						key={index}
						style={css.filtriDiv}
						onClick={async () => {
							const filtri = document.getElementsByClassName("riquadroFiltro");

							await sleep(150);

							disattivaAltriFiltri(index);
						}}
						className='riquadroFiltro'
					>
						{item}
					</div>
				);
			});

			return lista;
		} else {
			async function onclickFun(e: any) {
				const filtri = document.getElementsByClassName("togliFiltri");

				//@ts-ignore
				filtri[0].attributes.class.value += " esciX";
				//@ts-ignore
				filtri[1].attributes.class.value += " esci";

				await sleep(500);

				setFiltri({
					antipasti: false,
					primi: false,
					secondi: false,
					contorni: false,
					panini: false,
					dolci: false,
				});
			}

			return (
				<>
					<div
						style={{
							...css.filtriDiv,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
						onClick={onclickFun}
						className='togliFiltri entraX togliFiltriX'
					>
						<img src={hostnameImg + "x.png"} />
					</div>
					<div
						style={{
							...css.filtriDiv,
							...css.filtroCliccato,
						}}
						onClick={onclickFun}
						className='togliFiltri entra'
					>
						{cliccato}
					</div>
				</>
			);
		}
	}

	return (
		<div style={css.filtri} className='px-[]'>
			{ritornaElementi()}
		</div>
	);
};

const Menu = () => {
	const data: any = useLoaderData();
	const [prodottiDaStampare, setProdottiDaStampare] = useState(
		new Array<prodotto>()
	);

	if (!data) return <p>Caricamento</p>;

	const elencoProdotti: ArrayProdotti = data.prodotti;
	const { stringaSearch, setStringaSearch, filtri, setFiltri } = data;
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
			<Topbar titolo='menu' daDoveArrivo='' />
			<div className='containerPage' style={css.containerMenu}>
				<SearchBar
					elencoProdotti={elencoProdotti}
					stringaSearch={stringaSearch}
					setStringaSearch={setStringaSearch}
					setProdottiDaStampare={setProdottiDaStampare}
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

const css: styleMap = {
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
		height: "50px",
		padding: "0svw 1svw",
		scrollbarWidth: "none",
	},
	filtriDiv: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		fontSize: "20px",
		height: "90%",
		padding: "5px 12px",
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
		// padding: "0 15px 15px 15px",
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-evenly",
		alignItems: "center",
	},
};

export default Menu;
