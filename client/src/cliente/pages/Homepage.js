//components
import Navbar from "./components/Navbar";
import Topbar from "./components/Topbar";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Slider = ({ piuAcq }) => {
	const navigate = useNavigate();
	let lista = [];

	piuAcq.forEach((item, index) => {
		lista.push(
			<div
				style={css.elemento}
				onClick={() => {
					navigate("/menu/product?prodotto=" + item.id + "&daDoveArrivo=home");
				}}
				key={index}
			>
				<div style={css.divImmagineElemento}>
					<img
						src={Object.keys(piuAcq).length > 0 ? item.indirizzoImg : ""}
						alt=''
						style={css.divImmagineElementoImg}
					/>
				</div>
				<div style={css.divNomeElemento}>
					<p style={css.nomeElemento}>
						{Object.keys(piuAcq).length > 0 ? item.nome : ""}
					</p>
				</div>
			</div>
		);
	});

	return lista;
};

const NPIUACQ = 5;

const HomePage = ({ elencoProdotti }) => {
	elencoProdotti = JSON.parse(elencoProdotti);

	const [piuAcq, setPiuAcq] = useState([]);

	useEffect(() => {
		trovaPiuAcq();
		// eslint-disable-next-line
	}, []);

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
			<Topbar page='home' />
			<div className='container' style={css.containerHome}>
				<p style={css.nomeMensa}>UASARD MENS</p>
				<p style={css.titoloHome}>I più venduti</p>
				<div style={css.slider}>
					<Slider piuAcq={piuAcq} />
				</div>
			</div>
			<Navbar page='home' />
		</div>
	);
};

export default HomePage;

//
//
//stili
//

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
		fontWeight: "600",
		marginLeft: "25px",
	},
	slider: {
		overflowX: "auto",
		height: "60svw",
		width: "100%",
		display: "flex",
		flexWrap: "nowrap",
		flexDirection: "row",
		alignItems: "center",
	},
	elemento: {
		margin: "10px",
		width: "35svw",
		height: "50svw",
		display: "flex",
		flexDirection: "column",
		borderRadius: "15px",
		boxShadow: "3px 3px 17px -3px rgba(0, 0, 0, 0.56)",
	},
	divImmagineElemento: {
		width: "35svw",
		height: "35svw",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	divImmagineElementoImg: {
		width: "34svw",
		height: "34svw",
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
