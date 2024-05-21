import { useNavigate } from "react-router-dom";
import { Container, Navbar, Topbar } from "../components/Components";
import { useState } from "react";
import { prodotto, sleep, urlImg } from "../utils";
import { Input } from "../components/shadcn/Input";
import searchImg from "../img/search.webp";
import antipastoImg from "../img/antipasto.webp";
import primoImg from "../img/primo.webp";
import secondoImg from "../img/secondo.webp";
import contornoImg from "../img/contorno.webp";
import dolceImg from "../img/dolce.webp";
import bibitaImg from "../img/bibita.webp";
import { Toaster } from "../components/shadcn/Sonner";
import { toast } from "sonner";
import { LazyLoadImage } from "react-lazy-load-image-component";

import loadingVideo from "../img/loading.mov";

const Listone = ({
	filteredProducts,
	filtro,
	setCarrello,
}: {
	filteredProducts: Array<prodotto>;
	filtro: { nome: string; img: string };
	setCarrello: Function;
}) => {
	const navigate = useNavigate();

	// eslint-disable-next-line
	return filteredProducts.map((item) => {
		if (filtro.nome === "" || item.categoria === filtro.nome) {
			return (
				<div
					className='w-[42%] text-center flex flex-col justify-end items-center mb-3 ombraLista rounded-2xl'
					key={item.id}
					id='elementoCompleto'
				>
					<p id='idProdotto' className='hidden'>
						{item.id}
					</p>
					<div
						className='h-[90%] w-full bg-arancioneScuro flex flex-col justify-end items-center rounded-2xl'
						id=''
					>
						<div
							className='rounded-[50%] bg-[#eaeaea] w-[102px] h-[102px] flex justify-center items-center relative'
							id=''
							onClick={() => navigate("/product/" + item.id)}
						>
							<LazyLoadImage
								src={urlImg + item.indirizzo_img}
								alt=''
								width={100}
								height={100}
							/>
						</div>
						<div className='h-[85%] w-full flex items-center flex-col' id=''>
							<div
								className='w-full h-[50px] flex justify-center items-center'
								id=''
								onClick={() => navigate("/product/" + item.id)}
							>
								<p className='text-[16px] text-marrone font-bold tracking-tight'>
									{item.nome}
								</p>
							</div>
							<div
								className='flex flex-row h-[35px] w-full justify-center items-center'
								id=''
							>
								<div
									className='w-[50%] h-full flex justify-center items-center'
									id=''
									onClick={() => navigate("/product/" + item.id)}
								>
									<p className='text-[15px] text-marrone'>
										{item.prezzo.toFixed(2)}€
									</p>
								</div>
								<div
									className='w-[50%] h-full flex justify-center items-center'
									id=''
								>
									<div
										className='rounded-[50%] border border-marrone w-6 h-6 flex justify-center items-center'
										onClick={(e: any) => {
											let elementoCompleto = e.target;

											while (elementoCompleto.id !== "elementoCompleto") {
												elementoCompleto = elementoCompleto.parentNode;
											}

											elementoCompleto.className +=
												" animate-elementoNelCarrello";
											sleep(200).then(() => {
												elementoCompleto.className =
													elementoCompleto.className.replace(
														" animate-elementoNelCarrello",
														""
													);
											});

											const id =
												elementoCompleto.children["idProdotto"].innerHTML;
											let carrello = JSON.parse(
												localStorage.getItem("cart") || "[]"
											);
											let presente = false;
											for (let i = 0; i < carrello.length; i++) {
												if (carrello[i].id === parseInt(id)) {
													presente = true;
													break;
												}
											}
											if (presente) {
												const nuovoCarrello = carrello.map((item: any) => {
													if (item.id === parseInt(id)) {
														let nuovoItem = item;
														nuovoItem.quantita += 1;
														return nuovoItem;
													} else {
														return item;
													}
												});
												// localStorage.setItem(
												// 	"cart",
												// 	JSON.stringify(nuovoCarrello)
												// );
												setCarrello(nuovoCarrello);
											} else {
												carrello.push({ ...item, quantita: 1 });
												// localStorage.setItem("cart", JSON.stringify(carrello));
												setCarrello(carrello);
											}

											toast.success("Aggiunto al carrello!");
										}}
									>
										<p className='text-[18px] text-marrone'>+</p>
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
	possibiliFiltri,
}: {
	filtro: {
		nome: string;
		img: string;
	};
	setFiltro: Function;
	possibiliFiltri: Array<any>;
}) => {
	const findIndex = (x: string) => {
		for (let i = 0; i < possibiliFiltri.length; i++) {
			if (possibiliFiltri[i][0] === x) {
				return i;
			}
		}

		return -1;
	};

	const filtroCliccato = (e: any) => {
		let filtroDivCliccato = e.target;

		while (filtroDivCliccato.id !== "divFiltro") {
			filtroDivCliccato = filtroDivCliccato.parentNode;
		}

		setFiltro({
			nome:
				filtro.nome === ""
					? filtroDivCliccato.children["filtroDaApplicare"].innerHTML
					: "",
			img:
				filtro.nome === ""
					? filtroDivCliccato.children["divImgDaApplicare"].children[
							"imgDaApplicare"
					  ].src
					: "",
		});
	};

	if (filtro.nome === "") {
		return possibiliFiltri.map((item, index) => {
			return (
				<div
					className='h-[45px] rounded-3xl flex justify-center items-center flex-row px-[2.5px] pr-[5px] mx-[10px] bg-arancioneChiaro'
					key={index}
					onClick={filtroCliccato}
					id='divFiltro'
				>
					<div
						className='rounded-[50%] bg-[#fbfcfe] h-[40px] w-[40px] flex justify-center items-center mr-1'
						id='divImgDaApplicare'
					>
						<LazyLoadImage
							src={item[1]}
							alt=''
							width={32}
							height={32}
							id='imgDaApplicare'
						/>
					</div>
					<p
						className='text-marrone capitalize text-[16px]'
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
				className='h-[45px] rounded-3xl flex justify-center items-center flex-row px-[2.5px] pr-[5px] mx-[15px] bg-arancioneScuro'
				key={findIndex(filtro.nome)}
				onClick={filtroCliccato}
				id='divFiltro'
			>
				<div
					className='rounded-[50%] bg-[#fbfcfe] h-[40px] w-[40px] flex justify-center items-center mr-1'
					id=''
				>
					<LazyLoadImage
						src={filtro.img}
						alt=''
						className='h-[32px] w-[32px]'
						id=''
					/>
				</div>
				<p
					className='text-marrone capitalize text-[16px]'
					id='filtroDaApplicare'
				>
					{filtro.nome}
				</p>
			</div>
		);
	}
};

const Searchbar = ({
	products,
	setFilteredProducts,
	setPossibiliFiltri,
}: {
	products: Array<prodotto>;
	setFilteredProducts: Function;
	setPossibiliFiltri: Function;
}) => {
	const onChangeSearch = (e: any) => {
		const strSrc = e.target.value.toLowerCase();

		if (strSrc.length > 0) {
			let lista: Array<prodotto> = [];

			products.forEach((item) => {
				let arr = item.nome.toLowerCase().split(" ");

				for (let i = 0; i < arr.length; i++) {
					if (arr[i].slice(0, strSrc.length) === strSrc) {
						lista.push(item);
						break;
					}
				}
			});

			setFilteredProducts(lista);

			let filtriOg = [
				["antipasto", antipastoImg],
				["primo", primoImg],
				["secondo", secondoImg],
				["contorno", contornoImg],
				["dolce", dolceImg],
				["bibita", bibitaImg],
			];
			let filtriTmp: Array<any> = [];

			lista.forEach((item) => {
				filtriTmp.push(filtriOg.find((x) => x[0] === item.categoria));
			});

			filtriTmp.sort((item1, item2) => {
				switch (item1[0]) {
					case "antipasto":
						return -1;
					case "primo":
						return item2[0] === "antipasto" ? 1 : -1;
					case "secondo":
						return item2[0] === "antipasto" || item2[0] === "primo" ? 1 : -1;
					case "contorno":
						return item2[0] === "dolce" || item2[0] === "bibita" ? -1 : 1;
					case "dolce":
						return item2[0] === "bibita" ? -1 : 1;
					case "bibita":
						return 1;
					default:
						return 0;
				}
			});

			//filtriTmp può contenere due volte lo stesso filtro (ad esempio [["secondo", "img"], ["secondo", "img"]]) e bisogna rimuovere questi duplicati

			filtriTmp = filtriTmp.filter(
				(item, index) => filtriTmp.indexOf(item) === index
			);

			setPossibiliFiltri(filtriTmp);
		} else {
			setFilteredProducts(products);
			setPossibiliFiltri([
				["antipasto", antipastoImg],
				["primo", primoImg],
				["secondo", secondoImg],
				["contorno", contornoImg],
				["dolce", dolceImg],
				["bibita", bibitaImg],
			]);
		}
	};

	return (
		<div className='flex justify-center items-center'>
			<div className='flex justify-center items-center w-[280px]'>
				<Input
					type='text'
					onChange={onChangeSearch}
					className='bg-biancoLatte h-[53px] rounded-l-[40px] rounded-r-none clip-searchbar border-arancioneScuro border-[3px] pr-6 w-full focus-visible:ring-0 focus-visible:ring-offset-0 text-marrone'
				/>
				<div className='h-[58px] w-[3px] bg-arancioneScuro rotate-[32.10deg] relative right-[20px]'></div>
			</div>
			<div className='h-[53px] w-[80px] bg-arancioneScuro clip-searchbtn ml-[-10px] flex justify-end items-center'>
				<LazyLoadImage
					src={searchImg}
					alt=''
					className='mr-[15px] rotate-[80deg]'
					width={35}
					height={35}
					style={{
						filter:
							"invert(21%) sepia(5%) saturate(3444%) hue-rotate(312deg) brightness(93%) contrast(91%)",
					}}
				/>
			</div>
		</div>
	);
};

const Homepage = ({
	username,
	products,
	setCarrello,
	lunghezzaCarrello,
}: {
	username: string;
	products: Array<prodotto>;
	setCarrello: Function;
	lunghezzaCarrello: number;
}) => {
	const [assegnato, setAssegnato] = useState(false);
	const [filteredProducts, setFilteredProducts] = useState(
		[] as Array<prodotto>
	);
	const navigate = useNavigate();
	const [filtro, setFiltro] = useState({ nome: "", img: "" });
	const [possibiliFiltri, setPossibiliFiltri] = useState([
		["antipasto", antipastoImg],
		["primo", primoImg],
		["secondo", secondoImg],
		["contorno", contornoImg],
		["dolce", dolceImg],
		["bibita", bibitaImg],
	]);

	if (!products)
		return (
			<div className='w-full h-full flex justify-center items-center bg-white'>
				<video autoPlay loop muted>
					<source src={loadingVideo} type='video/mp4' />
				</video>
			</div>
		);

	if (products.length === 0) {
		if (localStorage.getItem("token") === "false") {
			navigate("/login");
			return;
		}

		return (
			<div className='w-full h-full flex justify-center items-center bg-white'>
				<video autoPlay loop muted>
					<source src={loadingVideo} type='video/mp4' />
				</video>
			</div>
		);
	}

	if (!assegnato) {
		setFilteredProducts(products);
		setAssegnato(true);
	}

	return (
		<>
			<link rel='preconnect' href={process.env.REACT_APP_HOSTNAME + ":6969"} />
			<Topbar page='home' name={username} />
			<Container>
				<Searchbar
					products={products}
					setFilteredProducts={setFilteredProducts}
					setPossibiliFiltri={setPossibiliFiltri}
				/>
				<div
					className='h-[50px] w-[100%] overflow-x-scroll overflow-y-hidden flex flex-row items-center flex-nowrap p-[2svw] scrollbar-0 my-[10px]'
					id='tuttiFiltri'
				>
					<Filtri
						filtro={filtro}
						setFiltro={setFiltro}
						possibiliFiltri={possibiliFiltri}
					/>
				</div>
				<div
					className='w-full flex justify-evenly flex-row flex-wrap'
					id='divListone'
				>
					<Listone
						filteredProducts={filteredProducts}
						filtro={filtro}
						setCarrello={setCarrello}
					/>
				</div>
			</Container>
			<Navbar page='home' lunghezzaCarrello={lunghezzaCarrello} />
			<Toaster position='top-center' richColors />
		</>
	);
};

export default Homepage;
