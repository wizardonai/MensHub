import { useLoaderData, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Topbar from "./components/Topbar";
import { useState } from "react";
import BottomButton from "./components/BottomButton";
import { ArrayProdotti, styleMap } from "../../App";
import { prodotto } from "../utils";
import { useTheme } from "next-themes";
import { Toaster } from "src/shadcn/Sonner";
import { toast } from "sonner";
import { hostnameImg } from "../utils";

const ListaAllergeni = ({ arr }: { arr: Array<string> }) => {
	const css: styleMap = {
		elementoAllergeno: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-evenly",
			alignItems: "center",
			height: "40px",
		},
		elementoAllergenoP: {
			width: "100%",
		},
		elementoAllergenoPrimoP: {
			marginLeft: "5px",
		},
	};

	let lista: Array<React.JSX.Element> = [];
	arr.forEach((item, index) => {
		lista.push(
			<div
				// style={
				// 	index % 2 === 0
				// 		? { ...css.elementoAllergeno, ...css.sfondoGrigietto }
				// 		: { ...css.elementoAllergeno }
				// }
				style={css.elementoAllergeno}
				key={index}
			>
				<p
					style={{
						...css.nomeAllergeno,
						...css.elementoAllergenoP,
						...css.elementoAllergenoPrimoP,
					}}
				>
					{item}
				</p>
				<p style={{ ...css.allergenoPresente, ...css.elementoAllergenoP }}>
					Si
				</p>
			</div>
		);
	});

	return lista;
};

const ProductPage = () => {
	const data: any = useLoaderData();
	const { resolvedTheme } = useTheme();
	const navigate = useNavigate();

	const daDoveArrivo =
		new URLSearchParams(window.location.search).get("daDoveArrivo") || "menu";

	const [prodotto, setProdotto] = useState({} as prodotto);
	const [espandi, setEspandi] = useState(false);
	// const [popup, setPopup] = useState(false);

	if (!data) return <p>Caricamento</p>;

	const elencoProdotti: ArrayProdotti = data.prodotti;

	const { id }: { id: string } = data;

	if (Object.keys(prodotto).length === 0) {
		elencoProdotti.prodotti.forEach((item: prodotto) => {
			if (item.id === parseInt(id)) {
				setProdotto(item);
			}
		});
	}

	const prodottoGiaEsistente = (id: number) => {
		let tmp = JSON.parse(localStorage.getItem("cart") || "{}");

		for (let i = 0; i < tmp.length; i++) {
			if (tmp[i].id === id) {
				return i;
			}
		}

		return -1;
	};

	const funAddCart = (x: number) => {
		let tmp;
		const ris = prodottoGiaEsistente(prodotto.id);

		tmp = JSON.parse(localStorage.getItem("cart") || "{}");

		if (ris >= 0) {
			tmp[ris].quantita += x;
		} else {
			tmp = JSON.parse(localStorage.getItem("cart") || "{}");

			tmp.push({
				...prodotto,
				quantita: x,
			});
		}
		localStorage.setItem("cart", JSON.stringify(tmp));

		toast.success("Aggiunto " + prodotto.nome + " (" + x + ") al carrello!", {
			action: {
				label: "Vai al carrello",
				onClick: () => {
					navigate("/orders");
				},
			},
		});
	};

	//
	//
	// stili
	//

	const css: styleMap = {
		containerProductPage: {
			overflowY: "scroll",
			overflowX: "hidden",
		},
		informazioniProdotto: {
			padding: "0 15px 15px 15px",
			display: "flex",
			flexDirection: "column",
			justifyContent: "space-evenly",
			alignItems: "center",
			// marginBottom: "calc(7svh)",
			marginBottom: "50px",
		},
		imgProdotto: {
			width: "80svw",
			height: "80svw",
			maxWidth: "350px",
			maxHeight: "350px",
		},
		nomeProdotto: {
			width: "100%",
			padding: "5px",
			textAlign: "center",
			fontSize: "25px",
			textTransform: "uppercase",
			fontWeight: "bold",
		},
		prezzoAggiungiCarrello: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			width: "100%",
			height: "25px",
		},
		prezzoProdotto: {
			width: "100%",
			fontSize: "20px",
			fontWeight: "bold",
		},
		descrizioneProdotto: {
			width: "100%",
			padding: "5px",
			fontSize: "18px",
			margin: "25px",
		},
		allergeni: {
			width: "100%",
			marginTop: "25px",
		},
		espandiAllergeni: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			border: "1px solid",
			borderColor:
				resolvedTheme === "light" ? "rgb(66, 66, 66)" : "var(--foreground)",
			padding: "5px",
		},
		espanso: {
			borderBottom: "none",
		},
		imgEspandi: {
			width: "30px",
			rotate: "-90deg",
			filter:
				resolvedTheme === "light"
					? ""
					: "invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg) brightness(102%) contrast(102%)",
		},
		elencoAllergeni: {
			border: "1px solid",
			borderColor:
				resolvedTheme === "light" ? "rgb(66, 66, 66)" : "var(--foreground)",
			borderTop: "none",
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
		<>
			<div className='page'>
				<Topbar titolo='product' daDoveArrivo={daDoveArrivo} />
				<div className='containerPage' style={css.containerProductPage}>
					<div style={css.informazioniProdotto}>
						<img src={prodotto.indirizzo_img} alt='' style={css.imgProdotto} />
						<p style={css.nomeProdotto}>{prodotto.nome}</p>
						<div style={css.prezzoAggiungiCarrello}>
							<p style={css.prezzoProdotto}>Prezzo: {prodotto.prezzo}€</p>
						</div>
						<p style={css.descrizioneProdotto}>{prodotto.descrizione}</p>
						<div style={css.allergeni}>
							<div
								onClick={() => {
									setEspandi(!espandi);
								}}
								style={
									espandi
										? { ...css.espandiAllergeni, ...css.espanso }
										: {
												...css.espandiAllergeni,
												borderBottom: "1px solid",
												borderBottomColor:
													resolvedTheme === "light"
														? "rgb(66, 66, 66)"
														: "var(--foreground)",
										  }
								}
							>
								<p style={{ fontWeight: "bold" }}>Allergeni</p>
								<img
									src={hostnameImg + "goBack.png"}
									alt=''
									style={
										espandi
											? { ...css.imgEspandi, rotate: "90deg" }
											: { ...css.imgEspandi, rotate: "-90deg" }
									}
								/>
							</div>
							<div
								style={
									espandi
										? { display: "block", ...css.elencoAllergeni }
										: { display: "none", ...css.elencoAllergeni }
								}
							>
								{prodotto.allergeni !== undefined &&
								prodotto.allergeni !== "" ? (
									<ListaAllergeni
										arr={prodotto.allergeni.replace(" ", "").split(",")}
									/>
								) : (
									<p
										style={{ ...css.elementoAllergeno, ...css.sfondoGrigietto }}
									>
										Nessun allergeno presente!
									</p>
								)}
							</div>
						</div>
					</div>
					<BottomButton
						text='Aggiungi al carrello'
						onClickFun={funAddCart}
						display=''
					/>
				</div>
				<Navbar page='menu' />
				<Toaster position='top-right' />
			</div>
		</>
	);
};

export default ProductPage;
