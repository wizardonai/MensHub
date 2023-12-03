import Navbar from "./components/Navbar";
import Topbar from "./components/Topbar";
import "./css/Orders.css";

const ListaCarrello = ({ carrello, hostname }) => {
	let lista = [];

	if (carrello.length !== 0) {
		console.log(carrello);
		carrello.forEach((item, index) => {
			lista.push(
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<p key={index}>{item.nome}</p>
					<div id='pulsantiCarrello'>
						<p id='quantitaCarrello'>0</p>
						<div id='pulsanteMeno'>
							<img src={hostname + "minus.png"} alt='' />
						</div>
						<div id='pulsantePiu'>
							<img src={hostname + "plus.png"} alt='' />
						</div>
					</div>
				</div>
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
				<ListaCarrello carrello={carrello} hostname={hostname} />
			</div>
			<Navbar page='orders' />
		</div>
	);
}

export default Orders;
