import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
// import "./css/Orders.css";
import { sendOrder } from "../scripts/fetch";
import Topbar from "./components/Topbar";

function rimuoviDalCarrello(item, carrello, setCarrello) {
	let tmp = carrello;

	let lunghezza = tmp.length;
	let tmp2 = [];
	for (let i = 0; i < lunghezza; i++) {
		if (tmp[i].id !== item.id) {
			tmp2.push(tmp[i]);
		}
	}

	localStorage.setItem("cart", JSON.stringify(tmp2));
	setCarrello(JSON.parse(localStorage.getItem("cart")));
}

const ElementoCarrello = ({ index, item, hostname, carrello, setCarrello }) => {
	return (
		<div style={css.elementoCarrello} key={index}>
			<div style={css.divImg}>
				<img src={item.indirizzoImg} alt='' style={css.divImgImg} />
			</div>
			<div style={css.nomeElementoCarrello}>
				<p style={css.nomeElementoCarrelloP}>{item.nome}</p>
			</div>
			<div style={css.pulsantiCarrello}>
				<p style={css.quantitaCarrello}>
					{JSON.parse(localStorage.getItem("cart"))[index].quantita}
				</p>
				<div style={css.divSuEgiu}>
					<img
						src={hostname + "goBack.png"}
						alt=''
						onClick={() => {
							let elementi = JSON.parse(localStorage.getItem("cart"));
							elementi[index].quantita += 1;
							localStorage.setItem("cart", JSON.stringify(elementi));

							setCarrello(JSON.parse(localStorage.getItem("cart")));
						}}
						style={{ ...css.frecciaSu, ...css.divSuEgiuImg }}
					/>
					<img
						src={hostname + "goBack.png"}
						alt=''
						onClick={() => {
							let elementi = JSON.parse(localStorage.getItem("cart"));
							elementi[index].quantita -= 1;
							localStorage.setItem("cart", JSON.stringify(elementi));

							if (elementi[index].quantita === 0) {
								rimuoviDalCarrello(item, carrello, setCarrello);
							}

							setCarrello(JSON.parse(localStorage.getItem("cart")));
						}}
						style={{ ...css.frecciaGiu, ...css.divSuEgiuImg }}
					/>
				</div>
			</div>
			<div style={css.divPrezzo}>
				<p style={css.prezzoSingolo}>
					{(item.prezzo * item.quantita).toFixed(2)}€
				</p>
			</div>
		</div>
	);
};

const ListaCarrello = ({ carrello, hostname, setCarrello }) => {
	let lista = [];

	carrello.forEach((item, index) => {
		lista.push(
			<ElementoCarrello
				index={index}
				item={item}
				hostname={hostname}
				key={index}
				carrello={carrello}
				setCarrello={setCarrello}
			/>
		);
	});

	return lista;
};

function Orders({ hostname }) {
	const [popup, setPopup] = useState(false);

	const [carrello, setCarrello] = useState(
		JSON.parse(localStorage.getItem("cart"))
	);
	const [prezzoTot, setPrezzoTot] = useState(0.0);

	useEffect(() => {
		let tot = 0;
		carrello.forEach((item) => {
			tot += item.prezzo * item.quantita;
		});
		setPrezzoTot(tot.toFixed(2));
	}, [carrello]);

	return (
		<div className='page'>
			<Topbar titolo='carrello' />
			<div className='container' style={css.containerOrders}>
				<p style={css.totalePrezzo}>Totale: {prezzoTot}€</p>
				<div style={css.lineaIniziale}></div>
				{carrello.length >= 1 ? (
					<>
						<div style={css.elementiCarrello}>
							<ListaCarrello
								carrello={carrello}
								hostname={hostname}
								setCarrello={setCarrello}
							/>
						</div>
						<div
							style={css.pulsanteFixatoInBasso}
							onClick={() => {
								setPopup(true);
								sendOrder(JSON.parse(localStorage.getItem("cart"))).then(() => {
									setTimeout(() => {
										setPopup(false);
									}, 1250);
									localStorage.setItem("cart", JSON.stringify([]));
									setCarrello([]);
								});
							}}
						>
							<div style={css.pulsanteFixatoInBassoDiv}>Ordina ora!</div>
						</div>
					</>
				) : (
					<div style={css.messaggioFullPage}>
						Aggiungi prodotti dalla pagina menu...
					</div>
				)}
			</div>
			<Navbar page='orders' />
			<div
				style={
					popup ? css.divSopraPopUp : { ...css.divSopraPopUp, display: "none" }
				}
			>
				<div
					style={
						popup
							? { ...css.popup, display: "flex" }
							: { ...css.popup, display: "none" }
					}
				>
					<p>Ordinazione eseguita con successo!</p>
				</div>
			</div>
		</div>
	);
}

export default Orders;

//
//
// stili
//

const css = {
	totalePrezzo: {
		width: "97%",
		textAlign: "right",
		fontSize: "25px",
	},
	lineaIniziale: {
		width: "100%",
		borderBottom: "2px solid gray",
	},
	elementiCarrello: {
		display: "flex",
		flexDirection: "column",
	},
	elementoCarrello: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		borderBottom: "2px solid gray",
		padding: "5px",
		height: "80px",
	},
	divImg: {
		width: "22svw",
		height: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	divImgImg: {
		width: "18svw",
		height: "18svw",
		borderRadius: "11px",
		border: "1px solid black",
	},
	nomeElementoCarrello: {
		width: "29svw",
		overflowX: "scroll",
		overflowY: "hidden",
	},
	nomeElementoCarrelloP: {
		fontSize: "22px",
		textAlign: "center",
	},
	pulsantiCarrello: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		height: "35px",
		width: "15svw",
	},
	quantitaCarrello: {
		fontSize: "22px",
		marginRight: "10px",
	},
	divSuEgiu: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	divSuEgiuImg: {
		width: "23px",
	},
	frecciaSu: {
		rotate: "90deg",
	},
	frecciaGiu: {
		rotate: "-90deg",
	},
	divPrezzo: {
		minWidth: "22svw",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	prezzoSingolo: {
		fontSize: "22px",
		textAlign: "center",
		marginLeft: "2px",
	},
	messaggioFullPage: {
		color: "gray",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "100%",
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
		position: "absolute",
		top: "50%",
		left: "50%",
		margin: "-17.5svw 0 0 -27.5svw",
		fontSize: "7svw",
		borderRadius: "15px",
		textAlign: "center",
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
