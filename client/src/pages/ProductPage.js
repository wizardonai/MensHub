import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Topbar from "./components/Topbar";
import "./css/ProductPage.css";
import { useEffect, useState } from "react";

const ProductPage = ({ elencoProdotti, hostname }) => {
	elencoProdotti = JSON.parse(elencoProdotti);

	const location = new useLocation();
	const [parametri, setParametri] = useState([]);
	const [prodotto, setProdotto] = useState({});

	const [espandi, setEspandi] = useState(false);

	useEffect(() => {
		let tmp = location.search.replace("?", "").split("&");

		let provaArrayAssociativo = [];

		for (let i = 0; i < tmp.length; i++) {
			tmp[i] = tmp[i].split("=");
			provaArrayAssociativo[tmp[i][0]] = tmp[i][1];
		}

		setParametri(provaArrayAssociativo);

		elencoProdotti.prodotti.forEach((item) => {
			if (item.id === parseInt(provaArrayAssociativo["prodotto"])) {
				setProdotto(item);
			}
		});
		//eslint-disable-next-line
	}, []);

	return (
		<>
			<Topbar page='product' daDoveArrivo={parametri["daDoveArrivo"]} />
			<div className='container'>
				<div id='informazioniProdotto'>
					<img src={prodotto.indirizzoImg} alt='' id='imgProdotto' />
					<p id='nomeProdotto'>{prodotto.nome}</p>
					<p id='prezzoProdotto'>Prezzo: {prodotto.prezzo}€</p>
					<p id='descrizioneProdotto'>{prodotto.descrizione}</p>
					<div id='allergeni'>
						<div
							onClick={() => {
								setEspandi(!espandi);
							}}
							className={
								espandi ? "espandiAllergeni espanso" : "espandiAllergeni"
							}
						>
							<p>Allergeni</p>
							<img
								src={hostname + "goBack.png"}
								alt=''
								id='imgEspandi'
								style={espandi ? { rotate: "90deg" } : { rotate: "-90deg" }}
								className={espandi ? "sottosopra" : "soprasotto"}
							/>
						</div>
						<div
							id='elencoAllergeni'
							style={espandi ? { display: "block" } : { display: "none" }}
						>
							{prodotto.allergeni}
						</div>
					</div>
				</div>
			</div>
			<Navbar page='menu' />
		</>
	);
};

export default ProductPage;
