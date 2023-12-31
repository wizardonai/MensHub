import { useLoaderData, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Topbar from "./components/Topbar";
import "./css/Popup.css";
import { useEffect, useState } from "react";
import BottomButton from "./components/BottomButton";
import Popup from "./components/Popup";

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

const ProductPage = (props) => {
	const data = useLoaderData();

	const daDoveArrivo = new URLSearchParams(window.location.search).get(
		"daDoveArrivo"
	);

	const [parametri, setParametri] = useState([]);
	const [prodotto, setProdotto] = useState({});
	const [espandi, setEspandi] = useState(false);
	const [popup, setPopup] = useState(false);

	if (!data) return <p>Caricamento</p>;

	const elencoProdotti = data.prodotti;
	const { hostname, id } = data;

	if (Object.keys(prodotto).length === 0) {
		elencoProdotti.prodotti.forEach((item, index) => {
			if (item.id === parseInt(id)) {
				setProdotto(item);
			}
		});
	}

	const prodottoGiaEsistente = (id) => {
		let tmp = JSON.parse(localStorage.getItem("cart"));

		for (let i = 0; i < tmp.length; i++) {
			if (tmp[i].id === id) {
				return i;
			}
		}

		return -1;
	};

	const funAddCart = () => {
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
	};

	return (
		<>
			<div className='page'>
				<Topbar titolo='product' daDoveArrivo={daDoveArrivo} />
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
								{prodotto.allergeni !== undefined &&
								prodotto.allergeni !== "" ? (
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
					<BottomButton text='Aggiungi al carrello' onClickFun={funAddCart} />
				</div>
				<Navbar page='menu' />
				<Popup text='Aggiunto al carrello!' show={popup} setPopup={setPopup} />
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
		// marginBottom: "calc(7svh)",
		marginBottom: "50px",
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
};
