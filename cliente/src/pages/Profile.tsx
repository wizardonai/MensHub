import { Container, Navbar, Topbar } from "../components/Components";
import topbarProfile from "../img/topbarProfile.png";
import datiUtente from "../img/datiUtente.png";
import mensaPrefe from "../img/mensaPrefe.png";
import riscattaCodice from "../img/riscattaCodice.png";
import cronologia from "../img/cronologia.png";
import disconnetti from "../img/disconnetti.png";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { Input } from "../components/shadcn/Input";
import { getMense, getProdotti, modifyMensa } from "../scripts/fetch";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../components/shadcn/Select";
import { mensa, typeProfilo } from "../utils";
import { Button } from "../components/shadcn/Button";

const Popup = ({
	tipoPopup,
	setTipoPopup,
	mense,
	setLoggato,
	datiUtente,
	setDatiUtente,
	setProducts,
}: {
	tipoPopup: string;
	setTipoPopup: Function;
	mense: Array<mensa>;
	setLoggato: Function;
	datiUtente: typeProfilo;
	setDatiUtente: Function;
	setProducts: Function;
}) => {
	const [valid, setValid] = useState(false);
	const navigate = useNavigate();
	const [nuovaMensa, setNuovaMensa] = useState(datiUtente.id_mensa + "");

	if (tipoPopup === "") return <></>;

	const funzionalita = () => {
		switch (tipoPopup) {
			case "mensa":
				return (
					<div className='w-full flex justify-center items-center flex-col h-[65%]'>
						<p className='w-full text-center text-xl'>
							Inserisci la tua mensa preferita
						</p>
						<Select
							onOpenChange={(e) => setValid(e)}
							onValueChange={(e) => {
								setNuovaMensa(e);
							}}
							defaultValue={datiUtente.id_mensa + ""}
						>
							<SelectTrigger className='w-[85%] mt-2'>
								<SelectValue placeholder='Seleziona la tua mensa'></SelectValue>
							</SelectTrigger>
							<SelectContent defaultValue={datiUtente.id_mensa + ""}>
								{mense.map((item) => {
									return (
										<SelectItem value={item.id + ""} key={item.id}>
											{item.nome}
										</SelectItem>
									);
								})}
							</SelectContent>
						</Select>
					</div>
				);
			case "disconnetti":
				return (
					<div className='w-full flex justify-center items-center flex-col h-[65%]'>
						<p className='w-full text-center text-xl'>
							Sicuro di voler disconnettere l'account?
						</p>
					</div>
				);
			default:
				return "";
		}
	};

	return (
		<>
			<div
				className='absolute w-full h-full top-0 left-0'
				onClick={() => setTipoPopup("")}
			></div>
			<div className='w-[350px] h-[180px] absolute top-1/2 left-1/2 mt-[-90px] ml-[-175px]'>
				<div className='w-full h-full bg-background rounded-3xl flex flex-col justify-evenly items-center border-[2px] border-marrone'>
					{funzionalita()}
					<div className='flex justify-evenly items-start flex-row w-full h-[35%]'>
						<Button
							className='w-[100px] h-[40px] bg-arancioneScuro rounded-3xl'
							onClick={() => {
								if (tipoPopup === "mensa") {
									setTipoPopup("");
									setDatiUtente({
										...datiUtente,
										id_mensa: parseInt(nuovaMensa),
									});

									modifyMensa(
										parseInt(nuovaMensa),
										JSON.parse(
											localStorage.getItem("token") || '{"token": "scu"}'
										).token
									).then((res: any) => {
										localStorage.setItem("token", JSON.stringify(res));

										getProdotti(res.token).then((res: any) => {
											setProducts(res);
										});
									});
									navigate("/");
								} else if (tipoPopup === "disconnetti") {
									setTipoPopup("");
									localStorage.removeItem("cart");
									localStorage.removeItem("token");
									setLoggato(false);
								}
							}}
							disabled={valid}
						>
							<p className='text-marrone'>
								{tipoPopup === "mensa" ? "Imposta" : "Disconnetti"}
							</p>
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

const Elementi = ({
	setLoggato,
	setTipoPopup,
}: {
	setLoggato: Function;
	setTipoPopup: Function;
}) => {
	const navigate = useNavigate();

	const pagine = [
		["dati utente", datiUtente],
		["mensa preferita", mensaPrefe],
		["cronologia acquisti", cronologia],
		["disconnetti", disconnetti],
	];

	const gestisciClick = (index: number) => {
		const clicked = pagine[index][0];

		switch (clicked) {
			case "disconnetti":
				setTipoPopup("disconnetti");
				break;
			case "mensa preferita":
				setTipoPopup("mensa");
				break;
			default:
				navigate("/profile/" + clicked.replace(" ", ""));
				break;
		}
	};

	return pagine.map((item, index) => (
		<div
			className='w-[90%] h-[80px] flex flex-row justify-center items-center rounded-3xl bg-arancioneScuro mb-3'
			key={index}
			onClick={() => gestisciClick(index)}
		>
			<p className='text-marrone text-xl capitalize w-[80%] indent-5'>
				{item[0]}
			</p>
			<div className='w-[20%]'>
				<img src={item[1]} alt='' className='w-[40px] h-[40px]' />
			</div>
		</div>
	));
};

const Profile = ({
	setLoggato,
	datiUtente,
	setDatiUtente,
	setProducts,
}: {
	setLoggato: Function;
	datiUtente: typeProfilo;
	setDatiUtente: Function;
	setProducts: Function;
}) => {
	const [tipoPopup, setTipoPopup] = useState("");
	const [mense, setMense] = useState([] as Array<mensa>);

	if (mense.length === 0) {
		setMense([{ id: -1, indirizzo: "richiesto", nome: "richiesto" }]);
		getMense().then((res: any) => {
			setMense(res);
		});

		return <p>CARICAMENTO</p>;
	}

	return (
		<>
			<div className='h-[150px] w-full flex justify-center items-center'>
				<img src={topbarProfile} alt='topbarProfile' />
			</div>
			<Container className='h-containerProfile w-full overflow-y-scroll'>
				<div className='w-full h-full flex items-center flex-col justify-center'>
					<Elementi setLoggato={setLoggato} setTipoPopup={setTipoPopup} />
				</div>
				<Popup
					tipoPopup={tipoPopup}
					setTipoPopup={setTipoPopup}
					mense={mense}
					setLoggato={setLoggato}
					datiUtente={datiUtente}
					setDatiUtente={setDatiUtente}
					setProducts={setProducts}
				/>
			</Container>
			<Navbar page='profile' />
		</>
	);
};

export default Profile;
