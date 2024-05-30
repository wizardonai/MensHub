import { useEffect, useRef, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

import imgSotto from "../img/sotto_login.png";
import imgSopra from "../img/sopra_benvenuto.png";
import { Input } from "../components/shadcn/Input";
import { Button } from "../components/shadcn/Button";
import { Label } from "../components/shadcn/Label";
import { sleep } from "../../utils";
import { toast } from "sonner";
import { Toaster } from "../components/shadcn/Sonner";
import { changePassword, checkRecover } from "../scripts/fetch";

const PasswordDimenticata = ({
	token,
	animazioniImmagini,
}: {
	token: string;
	animazioniImmagini: Function;
}) => {
	const navigate = useNavigate();

	const div = useRef(null);

	const [dati, setDati] = useState({ pwd: "", confpwd: "" });

	return (
		<div className='flex flex-col w-[65%] animate-showElement' ref={div}>
			<Label htmlFor='nuovaPassword' className='text-marrone'>
				Nuova password
			</Label>
			<Input
				type='password'
				id='nuovaPassword'
				variant='inputMenshub'
				onChange={(e: any) =>
					setDati((prev) => ({ ...prev, pwd: e.target.value }))
				}
				className='mt-1'
			/>
			<Label htmlFor='confermaPassword' className='text-marrone weight'>
				Conferma password
			</Label>
			<Input
				type='password'
				id='confermaPassword'
				variant='inputMenshub'
				onChange={(e: any) =>
					setDati((prev) => ({ ...prev, confpwd: e.target.value }))
				}
				className='mt-1'
			/>
			<Button
				variant='avanti'
				className='rounded-3xl shadow-lg text-lg w-full mt-1'
				onClick={() => {
					//chiamata al server

					if (dati.pwd === "" || dati.confpwd === "") {
						toast.error("Compilare tutti i campi");
						return;
					}
					if (dati.pwd !== dati.confpwd) {
						toast.error("Le password non coincidono");
						return;
					}

					changePassword(token, null, dati.pwd, dati.confpwd).then((res) => {
						if (res !== "Password cambiata con successo") toast.error(res);
						else {
							toast.info(res + "\nReinderizzamento al login...");
							sleep(2500).then(() => navigate("/auth"));
						}
					});
				}}
			>
				Cambia password
			</Button>
		</div>
	);
};
const CambiaPassword = ({
	token,
	animazioniImmagini,
}: {
	token: string;
	animazioniImmagini: Function;
}) => {
	const navigate = useNavigate();
	const div = useRef(null);
	const [data, setData] = useState({ oldpwd: "", pwd: "", confpwd: "" });

	useEffect(() => {
		animazioniImmagini(40, 5, window.innerHeight);
	}, []);

	return (
		<div
			className='flex flex-col space-y-1 w-[65%] animate-showElement'
			ref={div}
		>
			<Label htmlFor='vecchiaPassword'>Vecchia password</Label>
			<Input
				type='password'
				id='vecchiaPassword'
				variant='inputMenshub'
				onChange={(e: any) =>
					setData((prev) => ({ ...prev, oldpwd: e.target.value }))
				}
			/>
			<Label htmlFor='nuovaPassword'>Nuova password</Label>
			<Input
				type='password'
				id='nuovaPassword'
				variant='inputMenshub'
				onChange={(e: any) =>
					setData((prev) => ({ ...prev, pwd: e.target.value }))
				}
			/>
			<Label htmlFor='confermaPassword'>Conferma password</Label>
			<Input
				type='password'
				id='confermaPassword'
				variant='inputMenshub'
				onChange={(e: any) =>
					setData((prev) => ({ ...prev, confpwd: e.target.value }))
				}
			/>
			<div className='w-full flex flex-row items-center justify-center '>
				<Button
					variant='indietro'
					className='w-1/2 rounded-3xl shadow-lg text-lg'
					onClick={() => {
						//@ts-ignore
						div.current.classList.remove("animate-showElement");
						//@ts-ignore
						div.current.classList.add("animate-hideElement");
						sleep(400).then(() => navigate("/profile"));
					}}
				>
					Indietro
				</Button>
				<Button
					variant='avanti'
					className='rounded-3xl shadow-lg text-lg w-1/2'
					onClick={() => {
						//chiamata al server
						changePassword(token, data.oldpwd, data.pwd, data.confpwd).then(
							(res) => {
								if (res !== "Password cambiata con successo") toast.error(res);
								else {
									toast.success(res);
									sleep(2500).then(() => navigate("/profile"));
								}
							}
						);
					}}
				>
					Cambia
				</Button>
			</div>
		</div>
	);
};

const Pwdchange = () => {
	const token: any = useLoaderData();

	const [images, setImages] = useState([useRef(null), useRef(null)]);
	const [loggato, setLoggato] = useState("?");

	const navigate = useNavigate();

	if (!token || token === "") {
		navigate("/");
		return;
	}

	if (loggato === "?") {
		checkRecover(token).then((res) => {
			if (res === "Token non valido") {
				navigate("/");
				return;
			}

			if (res === "Recover") {
				setLoggato("no");
				return;
			}

			setLoggato("si");
		});
	}

	const animazioniImmagini = (sopra: number, sotto: number, height: number) => {
		const generaProporzioni = (
			sopra: number,
			sotto: number,
			height: number
		) => {
			const rapportoProporzione1 = 844 / height;
			const rapportoProporzione2 = height / 844;

			const sopraHeight = sopra * rapportoProporzione1;
			const sottoHeight = sotto * rapportoProporzione2;
			return {
				sopra: Math.ceil(sopraHeight / 5) * 5,
				sotto: Math.ceil(sottoHeight / 5) * 5,
			};
		};

		const proporzioni = generaProporzioni(sopra, sotto, window.innerHeight);

		//@ts-ignore
		images[0].current.style.top = `-${proporzioni.sopra}svh`;
		//@ts-ignore
		images[1].current.style.bottom = `-${proporzioni.sotto}svh`;
	};

	return (
		<>
			<div className='w-full h-full flex flex-col items-center justify-center absolute top-0 bottom-0 overflow-hidden'>
				<img
					src={imgSopra}
					alt=''
					className='absolute top-[-40svh] z-[-2] transition-[top] duration-1000 ease-in-out'
					ref={images[0]}
				/>
				{loggato === "si" ? (
					<CambiaPassword
						token={token}
						animazioniImmagini={animazioniImmagini}
					/>
				) : (
					<PasswordDimenticata
						token={token}
						animazioniImmagini={animazioniImmagini}
					/>
				)}
				<img
					src={imgSotto}
					alt=''
					className='absolute bottom-[-5svh] z-[-2] transition-[bottom] duration-1000 ease-in-out'
					ref={images[1]}
				/>
				<Toaster richColors />
			</div>
		</>
	);
};

export default Pwdchange;
