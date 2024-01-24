//components
import ListElement from "./components/ListElement";
import Navbar from "./components/Navbar";
import Topbar from "./components/Topbar";

import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import { ArrayProdotti, styleMap } from "../../App";

export type prodotto = {
	allergeni: string;
	categoria: string;
	descrizione: string;
	disponibile: number;
	fd: number;
	id: number;
	id_mensa: number;
	indirizzo_img: string;
	nacq: number;
	nome: string;
	prezzo: number;
};
type parametri = {
	piuAcq: Array<prodotto>;
};

const Slider = ({ piuAcq }: parametri) => {
	let lista: Array<React.JSX.Element> = [];

	piuAcq.forEach((item, index) => {
		lista.push(
			<div className='m-[10px]' key={index}>
				<ListElement item={item} index={index} daDoveArrivo='home' />
			</div>
		);
	});

	return lista;
};

const NPIUACQ = 5;

const HomePage = () => {
	const data: any = useLoaderData();
	const [piuAcq, setPiuAcq] = useState(new Array<prodotto>());

	if (!data) return <p>Caricamento</p>;

	const elencoProdotti: ArrayProdotti = data.prodotti;
	if (piuAcq.length === 0) trovaPiuAcq();

	function trovaPiuAcq() {
		let tmp = elencoProdotti.prodotti;

		for (let i = 0; i < tmp.length; i++) {
			for (let j = 0; j < tmp.length - 1; j++) {
				if (tmp[j].nacq < tmp[j + 1].nacq) {
					let tmp2 = tmp[j];
					tmp[j] = tmp[j + 1];
					tmp[j + 1] = tmp2;
				}
			}
		}

		let tmp2: Array<prodotto> = [];
		for (let i = 0; i < NPIUACQ; i++) {
			tmp2.push(tmp[i]);
		}
		setPiuAcq(tmp2);
	}

	return (
		<div className='page'>
			<Topbar titolo='nome mensa' daDoveArrivo='' />
			<div className='containerPage' style={css.containerHome}>
				{/* <p style={css.nomeMensa}>UASARD MENS</p> */}
				<p style={css.titoloHome}>I più venduti</p>
				<div style={css.slider}>
					<Slider piuAcq={piuAcq} />
					{/* <div style={css.barrettaSinistra}></div>
					<div style={css.barrettaDestra}></div> */}
				</div>
			</div>
			<Navbar page='home' />
		</div>
	);
};

const css: styleMap = {
	containerHome: {
		overflowY: "scroll",
	},
	nomeMensa: {
		textTransform: "uppercase",
		fontSize: "35px",
		fontWeight: "bold",
		textAlign: "center",
		width: "100%",
	},
	titoloHome: {
		marginTop: "5px",
		fontSize: "25px",
		marginLeft: "15px",
	},
	slider: {
		overflowX: "scroll",
		height: "60svw",
		width: "100%",
		display: "flex",
		flexWrap: "nowrap",
		flexDirection: "row",
		alignItems: "center",
		maxHeight: "240px",
	},
};

export default HomePage;
