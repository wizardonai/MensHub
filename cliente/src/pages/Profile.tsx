import { Container, Navbar } from "../components/Components";
import topbarProfile from "../img/topbarProfile.webp";
import cronologia from "../img/cronologia.webp";
import disconnetti from "../img/disconnetti.webp";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from "../components/shadcn/Input";
import {
	deleteUser,
	getMense,
	getProdotti,
	modifyMensa,
} from "../scripts/fetch";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../components/shadcn/Select";
import { mensa, sleep, typeProfilo } from "../utils";
import { Button } from "../components/shadcn/Button";
import { Label } from "../components/shadcn/Label";
import { LazyLoadImage } from "react-lazy-load-image-component";

import deleteImg from "../img/deleteBlack.webp";
import { toast } from "sonner";
import { Toaster } from "../components/shadcn/Sonner";

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
	const [pwd, setPwd] = useState("");
	const [disabled, setDisabled] = useState(false);

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
			case "eliminaaccount":
				return (
					<>
						<div className='w-full flex justify-evenly items-center flex-col h-[80%]'>
							<p className='w-full text-center text-xl'>Inserire la password</p>
							<p className='w-full text-center mb-1.5 text-[#e36623]'>
								(Quest'azione sarà irreversibile)
							</p>
							<div className='flex flex-col items-center w-3/4'>
								<Input
									type='password'
									id='password'
									className='bg-biancoLatte mt-0.5 w-[85%]'
									variant='inputMenshub'
									onChange={(e) => setPwd(e.target.value)}
								/>
							</div>
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
										if (pwd === "") {
											toast.error("Inserire la password");
											return;
										}

										deleteUser(
											localStorage.getItem("token") || "asd",
											pwd
										).then((res: any) => {
											if (res + "" === "Utente eliminato") {
												setDisabled(true);
												toast.success(
													"Utente eliminato!\nReindirizzamento in corso..."
												);
												sleep(2000).then(() => {
													setTipoPopup("");
													localStorage.removeItem("cart");
													localStorage.removeItem("token");
													localStorage.setItem("login", '"?"');
													setLoggato(false);
													setDatiUtente({});
													setProducts([]);
												});
											} else toast.error(res);
										});
									}}
									className='rounded-xl bg-[#e36623] border-[#e36623] text-biancoLatte'
									disabled={disabled}
								>
									Elimina
								</Button>
							</div>
						</div>
					</>
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

const BtnElmininaAccount = ({ setTipoPopup }: { setTipoPopup: Function }) => {
	const navigate = useNavigate();

	return (
		<div
			className='w-full h-[70px] flex flex-row justify-center items-center rounded-3xl bg-[#e36623] mb-3'
			onClick={() => setTipoPopup("eliminaaccount")}
		>
			<p className='text-marrone text-xl capitalize w-[80%] indent-5'>
				Elimina account
			</p>
			<div className='w-[20%]'>
				<LazyLoadImage
					src={deleteImg}
					alt=''
					className='w-[37px] h-[37px] ml-1'
					style={{
						filter:
							"invert(20%) sepia(5%) saturate(4693%) hue-rotate(317deg) brightness(83%) contrast(83%)",
					}}
				/>
			</div>
		</div>
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
					className='bg-biancoLatte rounded-3xl border-0 shadow-sm focus:outline-none focus:ring-transparent text-marrone'
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
						<BtnElmininaAccount setTipoPopup={setTipoPopup} />
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
			<Toaster richColors />
			<Navbar page='profile' />
		</>
	);
};

export default Profile;
