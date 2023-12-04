import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Topbar from "./components/Topbar";
import "./css/Orders.css";
import { sendOrder } from "../scripts/fetch";

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
	const [quantita, setQuantita] = useState(
		JSON.parse(localStorage.getItem("cart"))[index].quantita
	);

	let quantitaPerAggiornare = JSON.parse(localStorage.getItem("cart"))[index]
		.quantita;

	useEffect(() => {
		localStorage.setItem("cart", localStorage.getItem("cart"));
	}, [quantitaPerAggiornare]);

	return (
		<div className='elementoCarrello' key={index}>
			<img src={item.indirizzoImg} alt='' />
			<p className='nomeElementoCarrello'>{item.nome}</p>
			<div className='pulsantiCarrello'>
				<p className='quantitaCarrello'>{quantita}</p>
				<div
					className='pulsanteMeno'
					onClick={() => {
						let elementi = JSON.parse(localStorage.getItem("cart"));
						elementi[index].quantita -= 1;
						localStorage.setItem("cart", JSON.stringify(elementi));
						setQuantita(elementi[index].quantita);
						quantitaPerAggiornare -= 1;

						if (elementi[index].quantita === 0) {
							rimuoviDalCarrello(item, carrello, setCarrello);
						}
					}}
				>
					<img src={hostname + "minus.png"} alt='' />
				</div>
				<div
					className='pulsantePiu'
					onClick={() => {
						let elementi = JSON.parse(localStorage.getItem("cart"));
						elementi[index].quantita += 1;
						localStorage.setItem("cart", JSON.stringify(elementi));
						setQuantita(elementi[index].quantita);
						quantitaPerAggiornare += 1;
					}}
				>
					<img src={hostname + "plus.png"} alt='' />
				</div>
			</div>
		</div>
	);
};

const ListaCarrello = ({ carrello, hostname, setCarrello }) => {
	let lista = [];

	if (carrello.length !== 0) {
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
	}
	return "";
};

function Orders({ hostname }) {
	const [popup, setPopup] = useState(false);
	const [messaggioPopup, setMessaggioPopup] = useState("");

	const [carrello, setCarrello] = useState(
		JSON.parse(localStorage.getItem("cart"))
	);

	useEffect(() => {
		setCarrello(JSON.parse(localStorage.getItem("cart")));
	}, [localStorage.getItem("cart")]);

	return (
		<div className='page'>
			<Topbar page='orders' />
			<div className='container' id='containerOrders'>
				{carrello.length >= 1 ? (
					<>
						<div id='elementiCarrello'>
							<ListaCarrello
								carrello={carrello}
								hostname={hostname}
								setCarrello={setCarrello}
							/>
						</div>
						<div
							className='pulsanteFixatoInBasso'
							onClick={() => {
								setPopup(true);
								if (carrello.length >= 1) {
									setMessaggioPopup("Ordinazione eseguita con successo!");
									sendOrder(carrello).then(() => {
										localStorage.setItem("cart", JSON.stringify([]));
										setCarrello([]);
									});
								} else {
									setMessaggioPopup("Il carrello è vuoto!");
								}
								setTimeout(() => {
									setPopup(false);
								}, 1250);
							}}
						>
							<div>Ordina ora!</div>
						</div>
						<div
							className='popup'
							style={popup ? { display: "flex" } : { display: "none" }}
						>
							<p>{messaggioPopup}</p>
						</div>
					</>
				) : (
					<div id='messaggioFullPage'>
						Aggiungi prodotti dalla pagina menu...
					</div>
				)}
			</div>
			<Navbar page='orders' />
		</div>
	);
}

export default Orders;
