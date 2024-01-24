import { useState } from "react";
import Navbar from "./components/Navbar";
import { sendOrder } from "../scripts/fetch";
import Topbar from "./components/Topbar";
import BottomButton from "./components/BottomButton";
import { hostname, styleMap } from "../../App";
import { prodotto } from "./Homepage";
import { useTheme } from "next-themes";
import { Toaster } from "src/shadcn/Sonner";
import { toast } from "sonner";
import { Minus, Plus } from "lucide-react";
import { Button } from "src/shadcn/Button";

type aggiuntaQuantita = {
	quantita: number;
};
type prodottoCarrello = prodotto & aggiuntaQuantita;

function rimuoviDalCarrello(
	item: prodotto,
	carrello: Array<prodottoCarrello>,
	setCarrello: Function
) {
	let tmp = carrello;

	let lunghezza = tmp.length;
	let tmp2 = [];
	for (let i = 0; i < lunghezza; i++) {
		if (tmp[i].id !== item.id) {
			tmp2.push(tmp[i]);
		}
	}

	localStorage.setItem("cart", JSON.stringify(tmp2));
	setCarrello(JSON.parse(localStorage.getItem("cart") || "{}"));

	const elementi: any = document.getElementsByClassName("divElemento");

	for (let i = 0; i < elementi.length; i++) {
		elementi[i].style.marginLeft = "0px";
		elementi[i].children[2].style.display = "none";
	}
}

const ElementoCarrello = ({
	index,
	item,
	carrello,
	setCarrello,
}: {
	index: number;
	item: prodottoCarrello;
	carrello: Array<prodottoCarrello>;
	setCarrello: Function;
}) => {
	const { resolvedTheme } = useTheme();
	const [touchStart, setTouchStart] = useState(null);
	const [touchEnd, setTouchEnd] = useState(null);

	const minSwipeDistance = 50;

	const onTouchStart = (e: any) => {
		setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
		setTouchStart(e.targetTouches[0].clientX);
	};

	const onTouchMove = (e: any) => setTouchEnd(e.targetTouches[0].clientX);

	const onTouchEnd = (e: any) => {
		if (!touchStart || !touchEnd) return;
		const distance = touchStart - touchEnd;
		const isLeftSwipe = distance > minSwipeDistance;
		const isRightSwipe = distance < -minSwipeDistance;

		let tmp = e.target;
		while (tmp.attributes.class?.value !== "divElemento") {
			tmp = tmp.parentNode;
		}
		if (isLeftSwipe) {
			tmp.style.marginLeft = "-190px";
			tmp.children[2].style.display = "flex";
		} else {
			tmp.style.marginLeft = "0";
			tmp.children[2].style.display = "none";
		}
	};

	const css: styleMap = {
		elementoCarrello: {
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			padding: "5px",
			height: "120px",
			borderRadius: "11px",
			width: "350px",
			marginTop: "20px",
			boxShadow:
				resolvedTheme === "light"
					? "3px 3px 17px -3px rgba(0, 0, 0, 0.56)"
					: "3px 3px 17px -3px rgba(255, 255, 255, 0.1)",
		},
		divImgElemento: {
			width: "100px",
			height: "100px",
		},
		infoElemento: {
			width: "calc(100% - 100px)",
			height: "100%",
			display: "flex",
			flexDirection: "column",
		},
		divCancella: {
			width: "70px",
			height: "120px",
			background: "red",
			position: "absolute",
			right: "calc((100svw - 350px) / 2 + 10px)",
			borderRadius: "11px",
			display: "none",
			justifyContent: "center",
			alignItems: "center",
		},
		divCancellaImg: {
			width: "35px",
			height: "35px",
			filter:
				"invert(100%) sepia(47%) saturate(0%) hue-rotate(32deg) brightness(116%) contrast(100%)",
		},
	};

	return (
		<div
			style={css.elementoCarrello}
			key={index}
			onTouchStart={onTouchStart}
			onTouchMove={onTouchMove}
			onTouchEnd={onTouchEnd}
			className='divElemento'
		>
			<div style={css.divImgElemento}>
				<img
					src={item.indirizzo_img}
					alt=''
					className='w-[100%] h-[100%] rounded-[11px]'
				/>
			</div>
			<div style={css.infoElemento}>
				<div className='h-[50%] flex justify-center items-center'>
					<p className='w-[90%] text-lg capitalize'>{item.nome}</p>
				</div>
				<div className='h-[50%] w-[100%] flex flex-row'>
					<div className='w-[50%] h-[100%] flex items-center justify-center text-lg'>
						{item.prezzo}€
					</div>
					<div className='w-[50%] h-[100%] flex flex-row items-center justify-evenly'>
						<Button
							variant='outline'
							size='icon'
							className='rounded-full h-7 w-7'
							onClick={() => {
								let elementi = JSON.parse(localStorage.getItem("cart") || "{}");
								elementi[index].quantita -= 1;
								localStorage.setItem("cart", JSON.stringify(elementi));

								setCarrello(JSON.parse(localStorage.getItem("cart") || "{}"));
							}}
							disabled={item.quantita === 1 ? true : false}
						>
							<Minus className='h-[26px] w-[26px]' />
						</Button>
						<p>{item.quantita}</p>
						<Button
							variant='outline'
							size='icon'
							className='rounded-full h-7 w-7'
							onClick={() => {
								let elementi = JSON.parse(localStorage.getItem("cart") || "{}");
								elementi[index].quantita += 1;
								localStorage.setItem("cart", JSON.stringify(elementi));

								setCarrello(JSON.parse(localStorage.getItem("cart") || "{}"));
							}}
						>
							<Plus className='h-[26px] w-[26px]' />
						</Button>
					</div>
				</div>
			</div>
			<div
				style={css.divCancella}
				onClick={() => {
					rimuoviDalCarrello(item, carrello, setCarrello);
				}}
			>
				<img src={hostname + "bin.png"} alt='' style={css.divCancellaImg} />
			</div>
		</div>
	);
};

const ListaCarrello = ({
	carrello,
	setCarrello,
}: {
	carrello: Array<prodottoCarrello>;
	setCarrello: Function;
}) => {
	let lista: Array<React.JSX.Element> = [];

	carrello.forEach((item, index) => {
		lista.push(
			<ElementoCarrello
				index={index}
				item={item}
				key={index}
				carrello={carrello}
				setCarrello={setCarrello}
			/>
		);
	});

	return lista;
};

function Orders() {
	const [carrello, setCarrello] = useState(
		JSON.parse(localStorage.getItem("cart") || "{}")
	);

	const calcPrezzoTot = () => {
		let tot = 0;
		carrello.forEach((item: prodottoCarrello) => {
			tot += item.prezzo * item.quantita;
		});

		return tot.toFixed(2);
	};

	const orderFun = () => {
		sendOrder(JSON.parse(localStorage.getItem("cart") || "{}")).then(() => {
			toast.success("Ordinazione effettuata!", {
				action: {
					label: "Chiudi",
					onClick: () => {},
				},
			});
			localStorage.setItem("cart", JSON.stringify([]));
			setCarrello([]);
		});
	};

	const css: styleMap = {
		containerOrders: {
			overflowY: "scroll",
			overflowX: "hidden",
		},
		informazioniCarrello: {
			marginBottom: "50px",
		},
		totalePrezzo: {
			width: "97%",
			textAlign: "right",
			fontSize: "25px",
		},
		elementiCarrello: {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
		},
		messaggioFullPage: {
			color: "gray",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			height: "calc(100svh - 18svh - 30px)",
			margin: "0",
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
	};

	return (
		<div className='page'>
			<Topbar titolo='carrello' daDoveArrivo='' />
			<div className='containerPage' style={css.containerOrders}>
				<p style={css.totalePrezzo}>Totale: {calcPrezzoTot()}€</p>
				<div style={css.informazioniCarrello}>
					{carrello.length >= 1 ? (
						<>
							<div style={css.elementiCarrello} id='listaCarrello'>
								<ListaCarrello carrello={carrello} setCarrello={setCarrello} />
							</div>
						</>
					) : (
						<div style={css.messaggioFullPage}>
							Aggiungi prodotti dalla pagina menu...
						</div>
					)}
					<BottomButton
						text='Ordina ora'
						onClickFun={orderFun}
						display={carrello.length !== 0 ? "" : "none"}
					/>
				</div>
			</div>
			<Navbar page='orders' />
			<Toaster position='top-right' />
		</div>
	);
}

export default Orders;

/*
		// divImg: {
		// 	width: "18%",
		// 	maxWidth: "80px",
		// 	height: "100%",
		// 	display: "flex",
		// 	justifyContent: "center",
		// 	alignItems: "center",
		// },
		// divImgImg: {
		// 	width: "70px",
		// 	height: "70px",
		// 	borderRadius: "11px",
		// 	border: "1px solid black",
		// },
		// nomeElementoCarrello: {
		// 	width: "40%",
		// 	overflowX: "scroll",
		// },
		// nomeElementoCarrelloP: {
		// 	fontSize: "22px",
		// 	textAlign: "center",
		// 	whiteSpace: "nowrap",
		// },
		// pulsantiCarrello: {
		// 	display: "flex",
		// 	flexDirection: "row",
		// 	justifyContent: "center",
		// 	alignItems: "center",
		// 	height: "35px",
		// 	width: "13%",
		// },
		// quantitaCarrello: {
		// 	fontSize: "22px",
		// 	marginRight: "10px",
		// },
		// divSuEgiu: {
		// 	display: "flex",
		// 	flexDirection: "column",
		// 	justifyContent: "center",
		// 	alignItems: "center",
		// },
		// divSuEgiuImg: {
		// 	width: "23px",
		// 	filter:
		// 		"invert(8%) sepia(19%) saturate(0%) hue-rotate(264deg) brightness(92%) contrast(86%)",
		// },
		// frecciaSu: {
		// 	rotate: "90deg",
		// },
		// frecciaGiu: {
		// 	rotate: "-90deg",
		// },
		// divPrezzo: {
		// 	width: "21%",
		// 	display: "flex",
		// 	justifyContent: "center",
		// 	alignItems: "center",
		// },
		// prezzoSingolo: {
		// 	fontSize: "22px",
		// 	textAlign: "center",
		// 	marginLeft: "2px",
		// },
		*/
