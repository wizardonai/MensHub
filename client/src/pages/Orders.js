import { useState } from "react";
import Navbar from "./components/Navbar";
import Topbar from "./components/Topbar";
import "./css/Orders.css";

const ElementoCarrello = ({ index, item, hostname }) => {
	const [quantita, setQuantita] = useState(0);

	return (
		<div className='elementoCarrello' key={index}>
			<p className='nomeElementoCarrello'>{item.nome}</p>
			<div className='pulsantiCarrello'>
				<p className='quantitaCarrello'>{quantita}</p>
				<div
					className='pulsanteMeno'
					onClick={() => {
						if (quantita !== 0) {
							setQuantita(quantita - 1);
						}
					}}
				>
					<img src={hostname + "minus.png"} alt='' />
				</div>
				<div className='pulsantePiu' onClick={() => setQuantita(quantita + 1)}>
					<img src={hostname + "plus.png"} alt='' />
				</div>
			</div>
		</div>
	);
};

const ListaCarrello = ({ carrello, hostname }) => {
	let lista = [];

	if (carrello.length !== 0) {
		console.log(carrello);
		carrello.forEach((item, index) => {
			lista.push(
				<ElementoCarrello index={index} item={item} hostname={hostname} />
			);
		});

		return lista;
	}
	return "";
};

function Orders({ carrello, setCarrello, hostname }) {
	return (
		<div className='page'>
			<Topbar page='orders' />
			<div className='container' id='containerOrders'>
				<div id='elementiCarrello'>
					<ListaCarrello carrello={carrello} hostname={hostname} />
				</div>
			</div>
			<Navbar page='orders' />
		</div>
	);
}

export default Orders;
