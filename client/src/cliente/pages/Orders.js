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
	return (
		<div className='elementoCarrello' key={index}>
			<div className='divImg'>
				<img src={item.indirizzoImg} alt='' />
			</div>
			<p className='nomeElementoCarrello'>{item.nome}</p>
			<div className='pulsantiCarrello'>
				<p className='quantitaCarrello'>
					{JSON.parse(localStorage.getItem("cart"))[index].quantita}
				</p>
				{/* <div
					className='pulsanteMeno'
					onClick={() => {
						let elementi = JSON.parse(localStorage.getItem("cart"));
						elementi[index].quantita -= 1;
						localStorage.setItem("cart", JSON.stringify(elementi));

						if (elementi[index].quantita === 0) {
							rimuoviDalCarrello(item, carrello, setCarrello);
						}

						setCarrello(JSON.parse(localStorage.getItem("cart")));
					}}
				>
					<img src={hostname + "minus.png"} alt='' />
				</div>
				<div\\
					className='pulsantePiu'
					onClick={() => {
						let elementi = JSON.parse(localStorage.getItem("cart"));
						elementi[index].quantita += 1;
						localStorage.setItem("cart", JSON.stringify(elementi));

						setCarrello(JSON.parse(localStorage.getItem("cart")));
					}}
				>
					<img src={hostname + "plus.png"} alt='' />
				</div> */}
				<div className='divSuEgiu'>
					<img
						src={hostname + "goBack.png"}
						alt=''
						onClick={() => {
							let elementi = JSON.parse(localStorage.getItem("cart"));
							elementi[index].quantita += 1;
							localStorage.setItem("cart", JSON.stringify(elementi));

							setCarrello(JSON.parse(localStorage.getItem("cart")));
						}}
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
					/>
				</div>
			</div>
			<div className='divPrezzo'>
				<p className='prezzoSingolo'>
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
			{/* <Topbar page='orders' /> */}
			<div className='container' id='containerOrders'>
				<p id='titoloCarrello'>Carrello</p>
				<p id='totalePrezzo'>Totale: {prezzoTot}€</p>
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
								sendOrder(JSON.parse(localStorage.getItem("cart"))).then(() => {
									setTimeout(() => {
										setPopup(false);
									}, 1250);
									localStorage.setItem("cart", JSON.stringify([]));
									setCarrello([]);
								});
							}}
						>
							<div>Ordina ora!</div>
						</div>
					</>
				) : (
					<div id='messaggioFullPage'>
						Aggiungi prodotti dalla pagina menu...
					</div>
				)}
				<div
					className='popup'
					style={popup ? { display: "flex" } : { display: "none" }}
				>
					<p>Ordinazione eseguita con successo!</p>
				</div>
			</div>
			<Navbar page='orders' />
		</div>
	);
}

export default Orders;

/*
- definizione di organizzazione [52]
- modello di organizzazione gerarchico (modello di mizenberg) [53]
- organigramma
- ...
*/
