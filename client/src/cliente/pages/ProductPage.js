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
				style={
					index % 2 === 0
						? { ...css.elementoAllergeno, ...css.sfondoGrigietto }
						: { ...css.elementoAllergeno }
				}
				key={index}
			>
				<p
					style={{
						...css.nomeAllergeno,
						...css.elementoAllergenoP,
						...css.elementoAllergenoPrimoP,
					}}
				>
					{item}
				</p>
				<p style={{ ...css.allergenoPresente, ...css.elementoAllergenoP }}>
					Si
				</p>
			</div>
		);
	});

	return lista;
};

const ProductPage = ({ elencoProdotti, hostname }) => {
	elencoProdotti = JSON.parse(elencoProdotti);

	const location = new useLocation();
	const [parametri, setParametri] = useState([]);
	const [prodotto, setProdotto] = useState({
		allergeni: "",
	});

	const [espandi, setEspandi] = useState(false);

	const [popup, setPopup] = useState(false);

	useEffect(() => {
		let tmp = location.search.replace("?", "").split("&");

		let parametri = [];

		for (let i = 0; i < tmp.length; i++) {
			tmp[i] = tmp[i].split("=");
			parametri[tmp[i][0]] = tmp[i][1];
		}

		setParametri(parametri);

		elencoProdotti.prodotti.forEach((item) => {
			if (item.id === parseInt(parametri["prodotto"])) {
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
				<Topbar titolo='product' daDoveArrivo={parametri["daDoveArrivo"]} />
				<div className='container' style={css.containerProductPage}>
					<div style={css.informazioniProdotto}>
						<img src={prodotto.indirizzoImg} alt='' style={css.imgProdotto} />
						<p style={css.nomeProdotto}>{prodotto.nome}</p>
						<div style={css.prezzoAggiungiCarrello}>
							<p style={css.prezzoProdotto}>Prezzo: {prodotto.prezzo}€</p>
						</div>
						<p style={css.descrizioneProdotto}>{prodotto.descrizione}</p>
						<div style={css.allergeni}>
							<div
								onClick={() => {
									setEspandi(!espandi);
								}}
								style={
									espandi
										? { ...css.espandiAllergeni, ...css.espanso }
										: {
												...css.espandiAllergeni,
												borderBottom: "1px solid gray",
										  }
								}
							>
								<p style={{ fontWeight: "bold" }}>Allergeni</p>
								<img
									src={hostname + "goBack.png"}
									alt=''
									style={
										espandi
											? { ...css.imgEspandi, rotate: "90deg" }
											: { ...css.imgEspandi, rotate: "-90deg" }
									}
								/>
							</div>
							<div
								style={
									espandi
										? { display: "block", ...css.elencoAllergeni }
										: { display: "none", ...css.elencoAllergeni }
								}
							>
								{prodotto.allergeni !== "" ? (
									<ListaAllergeni
										arr={prodotto.allergeni.replace(" ", "").split(",")}
									/>
								) : (
									<p
										style={{ ...css.elementoAllergeno, ...css.sfondoGrigietto }}
									>
										Nessun allergeno presente!
									</p>
								)}
							</div>
						</div>
					</div>
					<div
						style={css.pulsanteFixatoInBasso}
						onClick={() => {
							let tmp;
							if (!popup) {
								const ris = prodottoGiaEsistente(prodotto.id);

								tmp = JSON.parse(localStorage.getItem("cart"));

								if (ris >= 0) {
									tmp[ris].quantita += 1;
								} else {
									tmp = JSON.parse(localStorage.getItem("cart"));

									tmp.push({
										...prodotto,
										quantita: 1,
									});
								}
								localStorage.setItem("cart", JSON.stringify(tmp));

								//popup
								setPopup(true);
								setTimeout(() => {
									setPopup(false);
								}, 1250);
							}
						}}
					>
						<div style={css.pulsanteFixatoInBassoDiv}>Aggiungi al carrello</div>
					</div>
				</div>
				<Navbar page='menu' />
				<div
					style={
						popup
							? css.divSopraPopUp
							: { ...css.divSopraPopUp, display: "none" }
					}
				>
					<div
						style={
							popup
								? { ...css.popup, display: "flex" }
								: { ...css.popup, display: "none" }
						}
						className='popup'
					>
						<p>Aggiunto al carrello!</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductPage;

//
//
// stili
//

const css = {
	containerProductPage: {
		overflowY: "scroll",
		overflowX: "hidden",
	},
	informazioniProdotto: {
		padding: "0 15px 15px 15px",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-evenly",
		alignItems: "center",
		marginBottom: "calc(7svh)",
	},
	imgProdotto: {
		width: "50svw",
		height: "50svw",
		maxWidth: "200px",
		maxHeight: "200px",
	},
	nomeProdotto: {
		width: "100%",
		padding: "5px",
		textAlign: "center",
		fontSize: "25px",
		textTransform: "uppercase",
		fontWeight: "bold",
	},
	prezzoAggiungiCarrello: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
		height: "25px",
	},
	prezzoProdotto: {
		width: "100%",
		fontSize: "20px",
		fontWeight: "bold",
	},
	descrizioneProdotto: {
		width: "100%",
		padding: "5px",
		fontSize: "18px",
		margin: "25px",
	},
	allergeni: {
		width: "100%",
		marginTop: "25px",
	},
	espandiAllergeni: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		border: "1px solid gray",
		padding: "5px",
	},
	espanso: {
		borderBottom: "none",
	},
	imgEspandi: {
		width: "30px",
		rotate: "-90deg",
	},
	elencoAllergeni: {
		border: "1px solid rgb(66, 66, 66)",
		borderTop: "none",
	},
	elementoAllergeno: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
		height: "40px",
	},
	elementoAllergenoP: {
		width: "100%",
	},
	sfondoGrigietto: {
		backgroundColor: "lightgray",
	},
	elementoAllergenoPrimoP: {
		marginLeft: "5px",
	},
	divSopraPopUp: {
		position: "absolute",
		width: "100svw",
		height: "100svh",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "transparent",
		top: "0",
		left: "0",
	},
	popup: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		color: "#fbd85d",
		backgroundColor: "#1a5d1a",
		height: "35svw",
		width: "55svw",
		borderRadius: "15px",
		textAlign: "center",
		maxWidth: "200px",
		maxHeight: "127px",
	},
	pulsanteFixatoInBasso: {
		backgroundColor: "transparent",
		height: "7svh",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		width: "100%",
		borderRadius: "15px",
		position: "fixed",
		bottom: "calc(10svh)",
	},
	pulsanteFixatoInBassoDiv: {
		height: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		color: "#fbd85d",
		backgroundColor: "#1a5d1a",
		fontSize: "20px",
		textTransform: "uppercase",
		width: "80%",
		borderRadius: "15px 15px 0 0",
	},
};
