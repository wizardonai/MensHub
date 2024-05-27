import { useEffect, useRef, useState } from "react";
import { Container, Navbar, Topbar } from "../components/Components";
import { Nullable, prodottoCarrello, typeProfilo, urlImg } from "../../utils";

import deleteImg from "../img/delete.webp";
import { sendOrder } from "../scripts/fetch";
import { toast } from "sonner";
import { Toaster } from "../components/shadcn/Sonner";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerTrigger,
} from "../components/shadcn/Drawer";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../components/shadcn/Select";

const Elemento = ({
	item,
	setCarrello,
}: {
	item: prodottoCarrello;
	setCarrello: Function;
}) => {
	const [start, setStart] = useState(null as Nullable<number>);
	const [end, setEnd] = useState(null as Nullable<number>);

	const divtot = useRef(null as Nullable<HTMLDivElement>);
	const bottoneElimina = useRef(null as Nullable<HTMLDivElement>);

	const [quantita, setQuantita] = useState(item.quantita);

	const minSwipeDistance = 50;
	const onTouchEndFn = (e: React.TouchEvent<HTMLDivElement>) => {
		if (start && end) {
			const distance = end - start;

			// const right = distance > minSwipeDistance;
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
				className='w-full h-[80px] flex flex-row justify-start items-center rounded-3xl bg-arancioneScuro mb-3'
				onTouchStart={(e) => {
					setEnd(null);
					setStart(e.targetTouches[0].clientX);
				}}
				onTouchMove={(e) => {
					setEnd(e.targetTouches[0].clientX);
				}}
				onTouchEnd={onTouchEndFn}
				id='divTot'
				ref={divtot}
			>
				<LazyLoadImage
					src={urlImg + item.indirizzo_img}
					alt={item.nome}
					className='w-[70px] h-[70px] ml-2'
					id=''
				/>
				<div className='w-1/2 flex flex-col items-center pl-1' id=''>
					<p
						id=''
						className=' text-marrone w-full whitespace-nowrap overflow-hidden overflow-ellipsis'
					>
						{item.nome}
					</p>
					<p id='' className=' text-marrone w-full'>
						{item.prezzo.toFixed(2)}€
					</p>
				</div>
				<div
					className='flex justify-center items-center flex-col w-[20%] mr-[5%]'
					id='altriDati'
				>
					<div
						className='flex flex-row justify-evenly items-center w-full'
						id=''
					>
						<p
							id=''
							className='text-marrone text-3xl'
							onClick={() => {
								if (quantita === 1) return;
								let tmp = JSON.parse(localStorage.getItem("cart") || "{}");

								tmp.forEach((item2: prodottoCarrello) => {
									if (item2.id === item.id) {
										item2.quantita--;
										setQuantita(quantita - 1);
									}
								});

								// localStorage.setItem("cart", JSON.stringify(tmp));
								setCarrello(tmp);
							}}
						>
							-
						</p>
						<p id='' className='text-marrone mx-2'>
							{quantita}
						</p>
						<p
							id=''
							className='text-marrone  text-2xl'
							onClick={() => {
								let tmp = JSON.parse(localStorage.getItem("cart") || "{}");

								tmp.forEach((item2: prodottoCarrello) => {
									if (item2.id === item.id) {
										item2.quantita++;
										setQuantita(quantita + 1);
									}
								});

								// localStorage.setItem("cart", JSON.stringify(tmp));
								setCarrello(tmp);
							}}
						>
							+
						</p>
					</div>
				</div>
			</div>
			<div
				className='h-[80px] justify-center hidden items-center clip-searchbtn bg-red-800 mb-3'
				onClick={() => {
					let tmp = JSON.parse(localStorage.getItem("cart") || "{}");
					tmp = tmp.filter((item2: prodottoCarrello) => item2.id !== item.id);
					setCarrello(tmp);
					// localStorage.setItem("cart", JSON.stringify(tmp));

					//@ts-ignore
					divtot.current.className = divtot.current.className.replace(
						" animate-swipeLeftCarrello",
						""
					);

					//@ts-ignore
					divtot.current.children["altriDati"].className =
						//@ts-ignore
						divtot.current.children["altriDati"].className.replace(
							" hidden",
							""
						);
					//@ts-ignore
					bottoneElimina.current.className =
						//@ts-ignore
						bottoneElimina.current.className.replace(
							" animate-swipeLeftCarrelloEl",

							""
						);
					//@ts-ignore
					bottoneElimina.current.className += " hidden";
				}}
				ref={bottoneElimina}
			>
				<LazyLoadImage
					src={deleteImg}
					alt=''
					className='w-[40px] h-[40px] ml-7 mt-5'
				/>
			</div>
		</div>
	);
};
const Lista = ({
	carrello,
	setCarrello,
}: {
	carrello: Array<prodottoCarrello>;
	setCarrello: Function;
}) => {
	return carrello.map((item, index) => (
		<Elemento item={item} key={index} setCarrello={setCarrello} />
	));
};

const Cart = ({
	setLoggato,
	setDatiUtente,
	setProducts,
	carrello,
	setCarrello,
}: {
	setLoggato: Function;
	setDatiUtente: Function;
	setProducts: Function;
	carrello: Array<prodottoCarrello>;
	setCarrello: Function;
}) => {
	const [orario, setOrario] = useState("");

	const [totale, setTotale] = useState(0);
	useEffect(() => {
		let tmp = 0;
		carrello.forEach((item: prodottoCarrello) => {
			tmp += item.prezzo * item.quantita;
		});

		setTotale(tmp);
	}, [carrello]);

	function generaOrario(start: number, end: number) {
		let orari = [];
		for (let i = start; i <= end; i++) {
			let orario = i < 10 ? "0" + i : i + "";
			orari.push(
				<SelectItem value={orario} key={i}>
					{orario}
				</SelectItem>
			);
		}

		return orari;
	}

	return (
		<>
			<div className='h-svh w-svw tel:hidden'>
				<Topbar page='carrello' name={""} />
				<Container>
					<div className='h-[92%] w-full flex items-center flex-col overflow-y-scroll'>
						<div className='w-[80%]'>
							<Lista carrello={carrello} setCarrello={setCarrello} />
						</div>
					</div>
					<div className='h-[8%] w-full flex flex-row justify-evenly items-center border-t-2 border-dashed'>
						<div className='text-xl text-marrone'>
							Totale: {totale.toFixed(2)}€
						</div>
						<Drawer>
							<DrawerTrigger
								className='bg-[#5c8c46] p-[6px] px-6 rounded-3xl text-background text-xl'
								disabled={carrello.length === 0}
							>
								Ordina
							</DrawerTrigger>
							<DrawerContent>
								<div className='w-full flex flex-col items-center justify-evenly h-40'>
									<p className='text-xl'>Sicuro di voler ordinare?</p>
									<p className='text-lg mt-1'>Totale: {totale.toFixed(2)}€</p>
									<div className='flex justify-center items-center flex-row w-full'>
										<Select
											onValueChange={(e) => {
												setOrario(
													e +
														(orario.split(":")[1] === undefined
															? ":00"
															: ":" + orario.split(":")[1])
												);
											}}
										>
											<SelectTrigger className='bg-biancoLatte rounded-3xl border-0 shadow-sm focus:outline-none focus:ring-transparent text-marrone w-1/4 mr-1'>
												<p className='mr-2'>
													{orario !== undefined ? orario.split(":")[0] : ""}
												</p>
											</SelectTrigger>
											<SelectContent defaultValue={orario.split(":")[0]}>
												{generaOrario(12, 22)}
											</SelectContent>
										</Select>
										<Select
											onValueChange={(e) => {
												setOrario(orario.split(":")[0] + ":" + e);
											}}
											disabled={orario === "" || orario === undefined}
										>
											<SelectTrigger className='bg-biancoLatte rounded-3xl border-0 shadow-sm focus:outline-none focus:ring-transparent text-marrone w-1/4 mr-1'>
												<p className='mr-2'>
													{orario !== undefined ? orario.split(":")[1] : ""}
												</p>
											</SelectTrigger>
											<SelectContent defaultValue={orario.split(":")[1]}>
												<SelectItem value='00'>00</SelectItem>
												<SelectItem value='15'>15</SelectItem>
												<SelectItem value='30'>30</SelectItem>
												<SelectItem value='45'>45</SelectItem>
											</SelectContent>
										</Select>
									</div>
									<div className='flex flex-row items-center justify-evenly mt-2 w-[65%]'>
										<DrawerClose className='inline-flex items-center justify-center whitespace-nowrap  text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-5 bg-biancoLatte text-marrone border-2 border-marrone font-bold shadow-lg tracking-wide rounded-2xl w-[40%] p-2'>
											Annulla
										</DrawerClose>
										<DrawerClose
											disabled={orario === "" || orario === undefined}
											onClick={() => {
												sendOrder(
													carrello,
													localStorage.getItem("token") || "scu",
													orario
												).then((res: any) => {
													if (!res) {
														toast.error("Errore di connessione");
														return;
													}
													if (res === "Token non valido") {
														setLoggato(false);
														return;
													}
													if (res === "Mensa preferita cancellata") {
														localStorage.removeItem("cart");
														localStorage.removeItem("token");
														setDatiUtente({} as typeProfilo);
														setProducts([]);
														setLoggato("false");
														return;
													}
													if (res.toString() === "Ordine aggiunto") {
														setOrario("");
														localStorage.setItem("cart", "[]");
														setCarrello([]);
														toast.info("Ordine effettuato");
													} else toast.error(res + "");
												});
											}}
											className='inline-flex items-center justify-center whitespace-nowrap  text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-marrone text-biancoLatte border-2 border-marrone font-bold shadow-lg tracking-wide rounded-2xl w-[40%] p-2'
										>
											Conferma
										</DrawerClose>
									</div>
								</div>
							</DrawerContent>
						</Drawer>
					</div>
					<Toaster position='top-center' richColors />
				</Container>
				<Navbar page='cart' />
			</div>
			<div className='h-svh w-svw hidden justify-center items-center tel:flex'>
				<p className='text-marrone text-2xl w-full text-center'>
					Dispositivo non supportato! <br />
					Per una esperienza migliore, utilizza un dispositivo mobile
				</p>
			</div>
		</>
	);
};

export default Cart;
