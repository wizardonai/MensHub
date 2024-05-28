import { useEffect, useState } from "react";
import OrdersTable from "../components/OrdersTable";
import { styleMap } from "../../App";
import NavbarProductor from "../components/NavbarProductor";
import OrdineCliccato from "../components/OrdineCliccato";
import { getOrdini } from "../scripts/fetch";
import { Button } from "../components/shadcn/Button";

const HomePageProductor = ({
	ordini,
	setOrdini,
	flag,
	setFlag,
	setLoggato,
}: {
	ordini: any;
	setOrdini: Function;
	flag: boolean;
	setFlag: Function;
	setLoggato: Function;
}) => {
	const [ordineTrascinato, setOrdineTrascinato] = useState<any>(null);
	const [ordineCliccato, setOrdineCliccato] = useState<any>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [prodotti, setProdotti] = useState<any>([]);

	if (ordini.length === 0 && flag === false) {
		getOrdini({ token: localStorage.getItem("token") || "scu" }).then(
			(data) => {
				setOrdini(data);
				setFlag(true);
			}
		);
	}

	useEffect(() => {
		const interval = setInterval(() => {
			getOrdini({ token: localStorage.getItem("token") || "scu" }).then(
				(data) => {
					setOrdini(data);
				}
			);
		}, 2500);
		return () => clearInterval(interval);
	}, []);

	if (localStorage.getItem("loggato") !== '"produttore"') {
		setLoggato("?");
		return;
	}

	return (
		<>
			<div className='page flex mobileProduttore:hidden' style={css.page}>
				<div style={css.sidebar}>
					<NavbarProductor page='productorHome' />
				</div>
				<div style={css.centerPage}>
					<div style={css.containerList}>
						<p style={css.titolo}>Da fare</p>
						<OrdersTable
							colore='#d24a3c'
							ordini={ordini}
							setOrdini={setOrdini}
							stato='da fare'
							ordineTrascinato={ordineTrascinato}
							setOrdineTrascinato={setOrdineTrascinato}
							setOrdineCliccato={setOrdineCliccato}
							isDragging={isDragging}
							setIsDragging={setIsDragging}
							ordineCliccato={ordineCliccato}
							setProdotti={setProdotti}
						/>
					</div>
					<div style={css.containerList}>
						<p style={css.titolo}>In corso</p>
						<OrdersTable
							colore='#e39320'
							ordini={ordini}
							setOrdini={setOrdini}
							stato='in corso'
							ordineTrascinato={ordineTrascinato}
							setOrdineTrascinato={setOrdineTrascinato}
							setOrdineCliccato={setOrdineCliccato}
							isDragging={isDragging}
							setIsDragging={setIsDragging}
							ordineCliccato={ordineCliccato}
							setProdotti={setProdotti}
						/>
					</div>
					<div style={css.containerList}>
						<p style={css.titolo}>Ordine</p>
						{ordineCliccato !== null &&
						ordineCliccato.stato_ordine === "da fare" ? (
							<OrdineCliccato
								ordineCliccato={ordineCliccato}
								setOrdineCliccato={setOrdineCliccato}
								prodotti={prodotti}
								colore='#d24a3c'
								ordini={ordini}
								setOrdini={setOrdini}
							></OrdineCliccato>
						) : ordineCliccato !== null &&
						  ordineCliccato.stato_ordine === "in corso" ? (
							<OrdineCliccato
								ordineCliccato={ordineCliccato}
								setOrdineCliccato={setOrdineCliccato}
								prodotti={prodotti}
								colore='#e39320'
								ordini={ordini}
								setOrdini={setOrdini}
							></OrdineCliccato>
						) : null}
					</div>
				</div>
			</div>
			<div className='h-svh w-svw hidden justify-center items-center mobileProduttore:flex flex-col'>
				<p className='text-marrone text-2xl w-full text-center'>
					Dispositivo non supportato! <br />
					Per una esperienza migliore, utilizza un dispositivo con larghezza
					maggiore
				</p>
				<Button
					className='mt-2 text-xl p-5'
					variant='avanti'
					onClick={() => {
						localStorage.clear();
						setLoggato(false);
					}}
				>
					Disconnettiti
				</Button>
			</div>
		</>
	);
};

const css: styleMap = {
	page: {
		backgroundColor: "#dfd9c9",
		flexDirection: "row",
		alignItems: "center",
	},
	centerPage: {
		width: "90%",
		height: "100%",
		flexDirection: "row",
		display: "flex",
		justifyContent: "space-evenly",
		alignItems: "center",
	},
	sidebar: {
		display: "flex",
		width: "10svw",
		height: "100%",
		alignItems: "center",
		justifyContent: "center",
		marginLeft: "2svw",
	},
	titolo: { fontSize: "130%", color: "#503431", fontWeight: "bold" },
	containerList: {
		display: "flex",
		flexDirection: "column",
		width: "100%",
		height: "84svh",
		margin: "0% 2%",
		position: "relative",
		top: "-2svh ",
	},
};

export default HomePageProductor;
