//components
import ListElement from "./components/ListElement";
import Navbar from "./components/Navbar";
import Topbar from "./components/Topbar";

import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const Slider = ({ piuAcq }) => {
	const navigate = useNavigate();
	let lista = [];

	piuAcq.forEach((item, index) => {
		lista.push(<ListElement item={item} key={item.id} daDoveArrivo='home' />);
	});

	return lista;
};

const NPIUACQ = 5;

const HomePage = () => {
	const data = useLoaderData();
	const [piuAcq, setPiuAcq] = useState([]);

	if (!data) return <p>Caricamento</p>;

	const elencoProdotti = data.prodotti;
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

		let tmp2 = [];
		for (let i = 0; i < NPIUACQ; i++) {
			tmp2.push(tmp[i]);
		}
		setPiuAcq(tmp2);
	}

	return (
		<div className='page'>
			<Topbar titolo='nome mensa' />
			<div className='container' style={css.containerHome}>
				{/* <p style={css.nomeMensa}>UASARD MENS</p> */}
				<p style={css.titoloHome}>I più venduti</p>
				<div style={css.slider}>
					<Slider piuAcq={piuAcq} />
				</div>
			</div>
			<Navbar page='home' />
		</div>
	);
};

const css = {
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
		overflowX: "auto",
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
