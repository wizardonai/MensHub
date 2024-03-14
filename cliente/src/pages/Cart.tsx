import { useState } from "react";
import { Container, Navbar, Topbar } from "../components/Components";
import { prodottoCarrello, urlImg } from "../utils";

const Lista = ({ carrello }: { carrello: Array<prodottoCarrello> }) => {
	return carrello.map((item, index) => (
		<div
			key={index}
			className='w-[80%] h-24 flex flex-row justify-evenly items-center rounded-2xl border border-arancioneScuro mb-3'
		>
			<img
				src={urlImg + item.indirizzo_img}
				alt={item.nome}
				className='w-20 h-20'
			/>
			<p className='w-1/2 text-center'>{item.nome}</p>
			<div className='flex justify-center items-center flex-col w-1/4'>
				<p>{item.prezzo}€</p>
				<div className='flex flex-row justify-evenly items-center w-full'>
					<p>-</p>
					<p>{item.quantita}</p>
					<p>+</p>
				</div>
			</div>
		</div>
	));
};

const Cart = () => {
	const [carrello, setCarrello] = useState(
		JSON.parse(localStorage.getItem("cart") || "{}")
	);

	return (
		<>
			<Topbar page='cart' name={""} />
			<Container>
				<div className='w-full h-full flex items-center flex-col'>
					<Lista carrello={carrello} />
				</div>
			</Container>
			<Navbar page='cart' />
		</>
	);
};

export default Cart;
