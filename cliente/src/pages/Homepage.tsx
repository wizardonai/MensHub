import { useLoaderData } from "react-router-dom";
import { Container, Navbar, Topbar } from "../components/Components";
import { useState } from "react";
import { prodotto, urlImg } from "../utils";
import { Input } from "../components/shadcn/Input";

import searchImg from "../img/search.png";
import antipastoImg from "../img/antipasto.png";
import primoImg from "../img/primo.png";
import secondoImg from "../img/secondo.png";
import contornoImg from "../img/contorno.png";
import dolceImg from "../img/dolce.png";
import bibitaImg from "../img/bibita.png";

const Listone = ({
	filteredProducts,
	filtro,
}: {
	filteredProducts: Array<prodotto>;
	filtro: string;
}) => {
	// eslint-disable-next-line
	return filteredProducts.map((item, index) => {
		if (filtro === "" || item.categoria === filtro) {
			return (
				<div
					className='w-[42%] text-center flex flex-col justify-end items-center mb-3'
					key={index}
				>
					<div className='h-[90%] w-full bg-arancioneScuro flex flex-col justify-end items-center'>
						<div className='rounded-[50%] bg-[#eaeaea] w-[102px] h-[102px] flex justify-center items-center relative'>
							<img
								src={urlImg + item.indirizzo_img}
								alt=''
								className='w-[100px] h-[100px]'
							/>
						</div>
						<div className='h-[85%] w-full flex items-center flex-col'>
							<div className='w-full h-[50px] flex justify-center items-center'>
								<p className='text-[16px]'>{item.nome}</p>
							</div>
							<div className='flex flex-row h-[35px] w-full justify-center items-center'>
								<div className='w-[50%] h-full flex justify-center items-center'>
									<p className='text-[15px]'>{item.prezzo.toFixed(2)}€</p>
								</div>
								<div className='w-[50%] h-full flex justify-center items-center'>
									<div className='rounded-[50%] border border-marrone w-6 h-6 flex justify-center items-center'>
										<p className='text-[18px]'>+</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		}
	});
};
const Filtri = ({
	filtro,
	setFiltro,
}: {
	filtro: string;
	setFiltro: Function;
}) => {
	const filtri = [
		["antipasto", antipastoImg],
		["primo", primoImg],
		["secondo", secondoImg],
		["contorno", contornoImg],
		["dolce", dolceImg],
		["bibita", bibitaImg],
	];

	const findIndex = (x: string) => {
		for (let i = 0; i < filtri.length; i++) {
			if (filtri[i][0] === x) {
				return i;
			}
		}

		return -1;
	};

	const filtroCliccato = (e: any) => {
		let filtroDivCliccato = e.target;

		// VECCHIA VERSIONE
		// while (tuttiFiltri.id !== "tuttiFiltri") {
		// 	tuttiFiltri = tuttiFiltri.parentNode;
		// }
		//
		//
		//

		while (filtroDivCliccato.id !== "divFiltro") {
			filtroDivCliccato = filtroDivCliccato.parentNode;
		}

		// VECCHIA VERSIONE
		//se non c'è il cliccatoFiltro nell'elemento faccio questo e aggiungo il cliccato all'elemento
		// const classi = filtroDivCliccato.className.split(" ");
		// let giaCliccato = false;
		// for (let i = 0; i < classi.length && !giaCliccato; i++) {
		// 	if (classi[i] === "cliccatoFiltro") {
		// 		giaCliccato = true;
		// 	}
		// }

		// VECCHIA VERSIONE
		//if (!giaCliccato) {
		// for (let i = 0; i < tuttiFiltri.children.length; i++) {
		// 	if (tuttiFiltri.children[i] !== filtroDivCliccato) {
		// 		tuttiFiltri.children[i].className = tuttiFiltri.children[
		// 			i
		// 		].className.replace(" cliccatoFiltro", "");
		// 	}
		// filtroDivCliccato.className += " cliccatoFiltro";
		// setFiltro(filtroDivCliccato.children[1].innerHTML);
		// }

		if (filtro === "") {
			console.log(filtroDivCliccato.className);

			filtroDivCliccato.className += " cliccatoFiltro";

			setFiltro(filtroDivCliccato.children["filtroDaApplicare"].innerHTML);
		} else {
			filtroDivCliccato.className = filtroDivCliccato.className.replace(
				" cliccatoFiltro",
				""
			);
			setFiltro("");
		}

		//
		//
		//
		// VECCHIA VERSIONE
		// } else {
		// 	filtroDivCliccato.className = filtroDivCliccato.className.replace(
		// 		" cliccatoFiltro",
		// 		""
		// 	);

		// 	setFiltro("");
		// }
	};

	if (filtro === "") {
		return filtri.map((item, index) => {
			return (
				<div
					className='h-[45px] rounded-3xl flex justify-center items-center flex-row px-[2.5px] pr-[5px] mx-[15px] bg-arancioneChiaro'
					key={index}
					onClick={filtroCliccato}
					id='divFiltro'
				>
					<div
						className='rounded-[50%] bg-[#fbfcfe] h-[40px] w-[40px] flex justify-center items-center mr-1'
						id=''
					>
						<img src={item[1]} alt='' className='h-[32px] w-[32px]' id='' />
					</div>
					<p
						className='text-white capitalize text-[16px]'
						id='filtroDaApplicare'
					>
						{item[0]}
					</p>
				</div>
			);
		});
	} else {
		return (
			<div
				className='h-[45px] rounded-3xl flex justify-center items-center flex-row px-[2.5px] pr-[5px] mx-[15px] bg-arancioneChiaro'
				key={findIndex(filtro)}
				onClick={filtroCliccato}
				id='divFiltro'
			>
				<div
					className='rounded-[50%] bg-[#fbfcfe] h-[40px] w-[40px] flex justify-center items-center mr-1'
					id=''
				>
					<img
						src={filtri[findIndex(filtro)][1]}
						alt=''
						className='h-[32px] w-[32px]'
						id=''
					/>
				</div>
				<p className='text-white capitalize text-[16px]' id='filtroDaApplicare'>
					{filtro}
				</p>
			</div>
		);
	}
};

const Searchbar = ({
	products,
	setFilteredProducts,
}: {
	products: Array<prodotto>;
	setFilteredProducts: Function;
}) => {
	const onChangeSearch = (e: any) => {
		const strSrc = e.target.value.toLowerCase();

		if (strSrc.length > 0) {
			let lista: Array<prodotto> = [];

			products.forEach((item) => {
				let arr = item.nome.toLowerCase().split(" ");

				let trovato = false;

				for (let i = 0; i < arr.length && !trovato; i++) {
					if (arr[i].slice(0, strSrc.length) === strSrc) {
						trovato = true;
					} else {
						trovato = false;
					}
				}

				if (trovato) {
					lista.push(item);
				}
			});

			setFilteredProducts(lista);
		} else {
			setFilteredProducts(products);
		}
	};

	return (
		<div className='flex justify-center items-center'>
			<div className='flex justify-center items-center w-[280px]'>
				<Input
					type='text'
					onChange={onChangeSearch}
					className='bg-biancoLatte h-[53px] rounded-l-[40px] rounded-r-none clip-searchbar border-arancioneScuro border-[3px] pr-6 w-full focus-visible:ring-0 focus-visible:ring-offset-0'
				/>
				<div className='h-[58px] w-[3px] bg-arancioneScuro rotate-[32.10deg] relative right-[20px]'></div>
			</div>
			<div className='h-[53px] w-[80px] bg-arancioneScuro clip-searchbtn ml-[-10px] flex justify-end items-center'>
				<img
					src={searchImg}
					alt=''
					className='w-[35px] h[35px] mr-[15px] rotate-[80deg]'
					style={{
						filter:
							"invert(21%) sepia(5%) saturate(3444%) hue-rotate(312deg) brightness(93%) contrast(91%)",
					}}
				/>
			</div>
		</div>
	);
};

const Homepage = ({ username }: { username: string }) => {
	const produtcs: any = useLoaderData();
	const [assegnato, setAssegnato] = useState(false);
	const [filteredProducts, setFilteredProducts] = useState(
		[] as Array<prodotto>
	);
	const [filtro, setFiltro] = useState("");

	if (!produtcs) {
		return <p>CARICAMENTO</p>;
	}

	if (!assegnato) {
		setFilteredProducts(produtcs);
		setAssegnato(true);
	}

	return (
		<>
			<Topbar page='home' name={username} />
			<Container>
				<Searchbar
					products={produtcs}
					setFilteredProducts={setFilteredProducts}
				/>
				<div
					className='h-[50px] w-[100%] overflow-x-scroll overflow-y-hidden flex flex-row items-center flex-nowrap p-[1svw] scrollbar-0 my-[10px]'
					id='tuttiFiltri'
				>
					<Filtri filtro={filtro} setFiltro={setFiltro} />
				</div>
				<div className='w-full flex justify-evenly flex-row flex-wrap'>
					<Listone filteredProducts={filteredProducts} filtro={filtro} />
				</div>
			</Container>
			<Navbar page='home' />
		</>
	);
};

export default Homepage;
