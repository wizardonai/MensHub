import { Container, Navbar } from "../components/Components";
import topbarProfile from "../img/topbarProfile.webp";
import cronologia from "../img/cronologia.webp";
import disconnetti from "../img/disconnetti.webp";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
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
import { Label } from "../components/shadcn/Label";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Popup = ({
	tipoPopup,
	setTipoPopup,
	setLoggato,
	setDatiUtente,
	setProducts,
}: {
	tipoPopup: string;
	setTipoPopup: Function;
	setLoggato: Function;
	setDatiUtente: Function;
	setProducts: Function;
}) => {
	if (tipoPopup === "") return <></>;

	const funzionalita = () => {
		switch (tipoPopup.split("-")[0]) {
			case "disconnetti":
				return (
					<div className='w-full flex justify-evenly items-center flex-col h-[80%]'>
						<p className='w-full text-center text-xl'>
							Sicuro di voler disconnettere l'account?
						</p>
						<div className='flex flex-row justify-around items-center w-3/4'>
							<Button
								onClick={() => setTipoPopup("")}
								className='rounded-xl'
								variant='indietro'
							>
								Annulla
							</Button>
							<Button
								variant='avanti'
								onClick={() => {
									setTipoPopup("");
									localStorage.removeItem("cart");
									localStorage.removeItem("token");
									setLoggato(false);
									setDatiUtente({});
									setProducts([]);
								}}
								className='rounded-xl'
							>
								Disconnetti
							</Button>
						</div>
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
				</div>
			</div>
		</>
	);
};

const BtnDisconnetti = ({ setTipoPopup }: { setTipoPopup: Function }) => {
	return (
		<div
			className='w-full h-[70px] flex flex-row justify-center items-center rounded-3xl bg-arancioneScuro mb-3'
			onClick={() => setTipoPopup("disconnetti")}
		>
			<p className='text-marrone text-xl capitalize w-[80%] indent-5'>
				Disconnetti
			</p>
			<div className='w-[20%]'>
				<LazyLoadImage src={disconnetti} alt='' className='w-[40px] h-[40px]' />
			</div>
		</div>
	);
};
const BtnCronologia = () => {
	const navigate = useNavigate();

	return (
		<div
			className='w-full h-[70px] flex flex-row justify-center items-center rounded-3xl bg-arancioneScuro my-2'
			onClick={() => navigate("/profile/cronologiaacquisti")}
		>
			<p className='text-marrone text-xl capitalize w-[80%] indent-5'>
				Cronologia acquisti
			</p>
			<div className='w-[20%]'>
				<LazyLoadImage src={cronologia} alt='' className='w-[40px] h-[40px]' />
			</div>
		</div>
	);
};
const MensaPreferita = ({
	datiUtente,
	mense,
	setDatiUtente,
	setProducts,
	setLoggato,
}: {
	datiUtente: typeProfilo;
	mense: Array<mensa>;
	setDatiUtente: Function;
	setProducts: Function;
	setLoggato: Function;
}) => {
	return (
		<div className='flex flex-col items-start justify-center w-3/4 mb-4'>
			<p className='w-full text-lg'>Mensa preferita</p>
			<Select
				onValueChange={(e: any) => {
					if (datiUtente.id_mensa !== parseInt(e)) {
						setDatiUtente({
							...datiUtente,
							id_mensa: parseInt(e),
						});

						modifyMensa(
							parseInt(e),
							localStorage.getItem("token") || "scu"
						).then((res: any) => {
							if (res === "Token non valido") {
								setLoggato(false);
								return;
							}

							localStorage.setItem("token", res.token);

							getProdotti(res.token).then((res: any) => {
								setProducts(res);
								localStorage.setItem("cart", JSON.stringify([]));
							});
						});
					}
				}}
				defaultValue={datiUtente.id_mensa + ""}
			>
				<SelectTrigger className='w-[85%] mt-2 m-0'>
					<SelectValue placeholder='Seleziona la tua mensa'></SelectValue>
				</SelectTrigger>
				<SelectContent
					defaultValue={datiUtente.id_mensa + ""}
					ref={(ref) => {
						if (!ref) return;
						ref.ontouchstart = (e) => {
							e.preventDefault();
						};
					}}
				>
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
};
const InfoUtente = ({ datiUtente }: { datiUtente: typeProfilo }) => {
	const navigate = useNavigate();
	return (
		<>
			<div className='flex flex-col items-start justify-center w-full mb-4'>
				<Label htmlFor='nome'>Nome</Label>
				<Input
					type='nome'
					id='nome'
					defaultValue={datiUtente.nome}
					disabled
					className='bg-biancoLatte mt-0.5 w-[85%]'
				/>
			</div>
			<div className='flex flex-col items-start justify-center w-full mb-4'>
				<Label htmlFor='cognome'>Cognome</Label>
				<Input
					type='cognome'
					id='cognome'
					defaultValue={datiUtente.cognome}
					disabled
					className='bg-biancoLatte mt-0.5 w-[85%]'
				/>
			</div>
			<div className='flex flex-col items-start justify-center w-full mb-4'>
				<Label htmlFor='email'>Email</Label>
				<Input
					type='email'
					id='email'
					defaultValue={datiUtente.email}
					disabled
					className='bg-biancoLatte mt-0.5 w-[85%]'
				/>
			</div>
			<div className='flex flex-col items-start justify-center w-full mb-4'>
				<p
					className='underline text-lg'
					onClick={() =>
						navigate("/changepwd/" + localStorage.getItem("token") || "")
					}
				>
					Cambia password
				</p>
			</div>
		</>
	);
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

		return (
			<div className='w-full h-full flex justify-center items-center bg-white'>
				<iframe
					src='https://giphy.com/embed/8Ajc7LGGMYssG3Xwlm'
					width='300'
					height='300'
					className='giphy-embed'
					allowFullScreen
					title='caricamento'
				></iframe>
			</div>
		);
	}

	return (
		<>
			<div className='h-[150px] w-full flex justify-center items-center'>
				<LazyLoadImage src={topbarProfile} alt='topbarProfile' />
			</div>
			<Container className='h-containerProfile w-full overflow-y-scroll'>
				<div className='w-full h-full flex items-center flex-col justify-start'>
					<div className='flex flex-col items-start justify-start w-[85%]'>
						<InfoUtente datiUtente={datiUtente} />
						<MensaPreferita
							datiUtente={datiUtente}
							mense={mense}
							setDatiUtente={setDatiUtente}
							setProducts={setProducts}
							setLoggato={setLoggato}
						/>
						<BtnCronologia />
						<BtnDisconnetti setTipoPopup={setTipoPopup} />
					</div>
					{/* <Elementi setLoggato={setLoggato} setTipoPopup={setTipoPopup} /> */}
				</div>
				<Popup
					tipoPopup={tipoPopup}
					setTipoPopup={setTipoPopup}
					setLoggato={setLoggato}
					setProducts={setProducts}
					setDatiUtente={setDatiUtente}
				/>
			</Container>
			<Navbar page='profile' />
		</>
	);
};

export default Profile;
