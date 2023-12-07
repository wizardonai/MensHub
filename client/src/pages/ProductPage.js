import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Topbar from "./components/Topbar";
import "./css/ProductPage.css";
import { useEffect, useState } from "react";

const ListaAllergeni = ({ arr }) => {
	let lista = [];
	arr.forEach((item, index) => {
		lista.push(
			<div
				className={
					index % 2 === 0
						? "elementoAllergeno sfondoGrigietto"
						: "elementoAllergeno"
				}
				key={index}
			>
				<p className='nomeAllergeno'>{item}</p>
				<p className='allergenoPresente'>Si</p>
			</div>
		);
	});

	return lista;
};

const ProductPage = ({ elencoProdotti, hostname }) => {
	elencoProdotti = JSON.parse(elencoProdotti);

	const location = new useLocation();
	const [parametri, setParametri] = useState([]);
	const [prodotto, setProdotto] = useState({});

	const [espandi, setEspandi] = useState(false);

	const [popup, setPopup] = useState(false);

	useEffect(() => {
		let tmp = location.search.replace("?", "").split("&");

		let provaArrayAssociativo = [];

		for (let i = 0; i < tmp.length; i++) {
			tmp[i] = tmp[i].split("=");
			provaArrayAssociativo[tmp[i][0]] = tmp[i][1];
		}

		setParametri(provaArrayAssociativo);

		elencoProdotti.prodotti.forEach((item) => {
			if (item.id === parseInt(provaArrayAssociativo["prodotto"])) {
				setProdotto(item);
			}
		});
		//eslint-disable-next-line
	}, []);

	function prodottoGiaEsistente(id) {
		let tmp = JSON.parse(localStorage.getItem("cart"));

		for (let i = 0; i < tmp.length; i++) {
			if (tmp[i].id === id) {
				return i;
			}
		}

		return -1;
	}

	return (
		<>
			<div className='page'>
				<Topbar page='product' daDoveArrivo={parametri["daDoveArrivo"]} />
				<div className='container' id='containerProductPage'>
					<div id='informazioniProdotto'>
						<img src={prodotto.indirizzoImg} alt='' id='imgProdotto' />
						<p id='nomeProdotto'>{prodotto.nome}</p>
						<div id='prezzoAggiungiCarrello'>
							<p id='prezzoProdotto'>Prezzo: {prodotto.prezzo}€</p>
						</div>
						<p id='descrizioneProdotto'>{prodotto.descrizione}</p>
						<div id='allergeni'>
							<div
								onClick={() => {
									setEspandi(!espandi);
								}}
								className={
									espandi ? "espandiAllergeni espanso" : "espandiAllergeni"
								}
							>
								<p style={{ fontWeight: "bold" }}>Allergeni</p>
								<img
									src={hostname + "goBack.png"}
									alt=''
									id='imgEspandi'
									style={espandi ? { rotate: "90deg" } : { rotate: "-90deg" }}
									className={espandi ? "sottosopra" : "soprasotto"}
								/>
							</div>
							<div
								id='elencoAllergeni'
								style={espandi ? { display: "block" } : { display: "none" }}
							>
								{prodotto.allergeni !== undefined ? (
									<ListaAllergeni
										arr={prodotto.allergeni.replace(" ", "").split(",")}
									/>
								) : (
									""
								)}
							</div>
						</div>
					</div>
					<div
						className='pulsanteFixatoInBasso'
						onClick={() => {
							if (!popup) {
								const ris = prodottoGiaEsistente(prodotto.id);
								if (ris >= 0) {
									let tmp = JSON.parse(localStorage.getItem("cart"));

									tmp[0].quantita += 1;

									localStorage.setItem("cart", JSON.stringify(tmp));
								} else {
									let tmp = JSON.parse(localStorage.getItem("cart"));
									//aggiunto prodotto con quantita
									let tmp2 = prodotto;
									tmp2.quantita = 1;
									tmp.push(tmp2);
									localStorage.setItem("cart", JSON.stringify(tmp));
								}
								//popup
								setPopup(true);
								setTimeout(() => {
									setPopup(false);
								}, 1250);
							}
						}}
					>
						<div>Aggiungi al carrello</div>
					</div>
					<div
						className='popup'
						style={popup ? { display: "flex" } : { display: "none" }}
					>
						<p> Aggiunto al carrello!</p>
					</div>
				</div>
				<Navbar page='menu' />
			</div>
		</>
	);
};

export default ProductPage;
