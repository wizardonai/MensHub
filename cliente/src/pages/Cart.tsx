import { useState } from "react";
import { Container, Navbar, Topbar } from "../components/Components";
import { Nullable, prodottoCarrello, urlImg } from "../utils";

import deleteImg from "../img/delete.png";

const Elemento = ({ item }: { item: prodottoCarrello }) => {
	const [start, setStart] = useState(null as Nullable<number>);
	const [end, setEnd] = useState(null as Nullable<number>);

	const minSwipeDistance = 50;

	const onTouchEndFn = (e: React.TouchEvent<HTMLDivElement>) => {
		if (start && end) {
			const distance = end - start;

			const right = distance > minSwipeDistance;
			const left = distance < -minSwipeDistance;

			if (left) {
				let tmp: any = e.currentTarget;

				while (tmp.id !== "divTot") {
					tmp = tmp.parentNode;
				}

				if (!tmp.className.includes("animate-swipeLeftCarrello")) {
					tmp.className = tmp.className.replace(
						" animate-swipeRightCarrello",
						""
					);
					tmp.className = tmp.className.replace(
						" animate-swipeLeftCarrello",
						""
					);

					tmp.className += " animate-swipeLeftCarrello";
					tmp.children["altriDati"].className += " hidden";

					let btnElimina = tmp.parentNode.children[1];

					btnElimina.className = btnElimina.className.replace(" hidden", "");
					btnElimina.className = btnElimina.className.replace(
						" animate-swipeRightCarrelloEl",
						""
					);
					btnElimina.className += " animate-swipeLeftCarrelloEl";
				}
			} else {
				let tmp: any = e.currentTarget;

				while (tmp.id !== "divTot") {
					tmp = tmp.parentNode;
				}

				if (tmp.className.includes("animate-swipeLeftCarrello")) {
					tmp.className = tmp.className.replace(
						" animate-swipeLeftCarrello",
						""
					);
					tmp.children["altriDati"].className = tmp.children[
						"altriDati"
					].className.replace(" hidden", "");

					tmp.className += " animate-swipeRightCarrello";

					let btnElimina = tmp.parentNode.children[1];
					btnElimina.className += " animate-swipeRightCarrelloEl";
					btnElimina.className = btnElimina.className.replace(
						" animate-swipeLeftCarrelloEl",
						""
					);
				}
			}
		}
	};

	return (
		<div className='flex flex-row justify-start items-center'>
			<div
				className='w-full h-24 flex flex-row justify-evenly items-center rounded-2xl bg-arancioneScuro mb-3'
				onTouchStart={(e) => {
					setEnd(null);
					setStart(e.targetTouches[0].clientX);
				}}
				onTouchMove={(e) => {
					setEnd(e.targetTouches[0].clientX);
				}}
				onTouchEnd={onTouchEndFn}
				id='divTot'
			>
				<img
					src={urlImg + item.indirizzo_img}
					alt={item.nome}
					className='w-20 h-20'
					id=''
				/>
				<p className='w-1/2 text-center text-white' id=''>
					{item.nome}
				</p>
				<div
					className='flex justify-center items-center flex-col w-1/4'
					id='altriDati'
				>
					<p id='' className='text-white'>
						{item.prezzo}€
					</p>
					<div
						className='flex flex-row justify-evenly items-center w-full'
						id=''
					>
						<p id='' className='text-white'>
							-
						</p>
						<p id='' className='text-white'>
							{item.quantita}
						</p>
						<p id='' className='text-white'>
							+
						</p>
					</div>
				</div>
			</div>
			<div className='h-24 justify-center hidden items-center clip-searchbtn bg-red-800 mb-3'>
				<img src={deleteImg} alt='' className='w-[40px] h-[40px] ml-5' />
			</div>
		</div>
	);
};
const Lista = ({ carrello }: { carrello: Array<prodottoCarrello> }) => {
	return carrello.map((item, index) => <Elemento item={item} key={index} />);
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
					<div className='w-[80%]'>
						<Lista carrello={carrello} />
					</div>
				</div>
			</Container>
			<Navbar page='cart' />
		</>
	);
};

export default Cart;
