import { Container, Navbar, Topbar } from "../components/Components";
import topbarProfile from "../img/topbarProfile.png";
import datiUtente from "../img/datiUtente.png";
import mensaPrefe from "../img/mensaPrefe.png";
import riscattaCodice from "../img/riscattaCodice.png";
import cronologia from "../img/cronologia.png";
import disconnetti from "../img/disconnetti.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from "../components/shadcn/Input";
import { getMense } from "../scripts/fetch";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../components/shadcn/Select";
import { mensa } from "../utils";
import { Button } from "../components/shadcn/Button";

const Popup = ({
	tipoPopup,
	setTipoPopup,
	mense,
}: {
	tipoPopup: string;
	setTipoPopup: Function;
	mense: Array<mensa>;
}) => {
	if (tipoPopup === "") return <></>;

	const funzionalita = () => {
		switch (tipoPopup) {
			case "mensa":
				return (
					<div className='w-full flex justify-center items-center flex-col h-[65%]'>
						<p className='w-full text-center text-xl'>
							Inserisci la tua mensa preferita
						</p>
						<Select>
							<SelectTrigger className='w-[85%] mt-2'>
								<SelectValue placeholder='Seleziona la tua mensa'></SelectValue>
							</SelectTrigger>
							<SelectContent>
								{mense.map((item, index) => {
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
			case "codice":
				return (
					<div className='w-full flex justify-center items-center flex-col h-[65%]'>
						<p className='w-full text-center text-xl'>
							Inserisci il codice da riscattare
						</p>
						<Input className='w-3/4 f	ocus-visible:ring-0 focus-visible:ring-offset-0 mt-2' />
					</div>
				);
			default:
				return "";
		}
	};

	return (
		<div className='w-[350px] h-[180px] absolute top-1/2 left-1/2 mt-[-90px] ml-[-175px]'>
			<div className='w-full h-full bg-background rounded-3xl flex flex-col justify-evenly items-center border-[2px] border-marrone'>
				{funzionalita()}
				<div className='flex justify-evenly items-start flex-row w-full h-[35%]'>
					<Button
						className='w-[100px] h-[40px] bg-arancioneScuro rounded-3xl'
						onClick={() => setTipoPopup("")}
					>
						<p className='text-marrone'>Annulla</p>
					</Button>
					<Button
						className='w-[100px] h-[40px] bg-arancioneScuro rounded-3xl'
						onClick={() => {}}
					>
						<p className='text-marrone'>
							{tipoPopup === "mensa" ? "Imposta" : "Riscatta"}
						</p>
					</Button>
				</div>
			</div>
		</div>
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
		["riscatta codice", riscattaCodice],
		["cronologia acquisti", cronologia],
		["disconnetti", disconnetti],
	];

	const gestisciClick = (index: number) => {
		const clicked = pagine[index][0];

		switch (clicked) {
			case "disconnetti":
				localStorage.removeItem("cart");
				localStorage.removeItem("token");
				setLoggato(false);
				break;
			case "mensa preferita":
				setTipoPopup("mensa");
				break;
			case "riscatta codice":
				setTipoPopup("codice");
				break;
			default:
				navigate(`/profile/${clicked.replace(" ", "")}`);
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

const Profile = ({ setLoggato }: { setLoggato: Function }) => {
	const [tipoPopup, setTipoPopup] = useState("");
	const [mense, setMense] = useState([]);

	if (mense.length === 0) {
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
				/>
			</Container>
			<Navbar page='profile' />
		</>
	);
};

export default Profile;
