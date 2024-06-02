import { useLocalStorage } from "usehooks-ts";

import imgSopra from "./cliente/img/sopra_benvenuto.png";
import imgSotto from "./cliente/img/sotto_login.png";
import loginTop from "./cliente/img/topLogin.png";
import loginBottom from "./cliente/img/bottomLogin.png";
import loginCerchio from "./cliente/img/cerchioLogin.png";

import { Button } from "./cliente/components/shadcn/Button";
import React, { useEffect, useRef, useState } from "react";
import { dataLog, dataMensa, dataReg, mensa, sleep } from "./utils";
import {
	getMense,
	loginUser,
	modifyMensa,
	registerMensa,
	registerUser,
	sendEmail,
} from "./cliente/scripts/fetch";
import { Label } from "./cliente/components/shadcn/Label";
import { Input } from "./cliente/components/shadcn/Input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./cliente/components/shadcn/Select";
import { Toaster } from "./cliente/components/shadcn/Sonner";
import { toast } from "sonner";

import logopiccolo from "./cliente/img/logoPiccolo.png";
import { Checkbox } from "./cliente/components/shadcn/Checkbox";

//
//
//login
const Login = ({
	setLogin,
	setLoggato,
	animazioniImmagini,
}: {
	setLogin: Function;
	setLoggato: Function;
	animazioniImmagini: Function;
}) => {
	const [pwdDimenticata, setPwdDimenticata] = useState(false);
	const [scegliMensa, setScegliMensa] = useState(false);
	const [mense, setMense] = useState([] as Array<mensa>);
	const [nuovaMensa, setNuovaMensa] = useState(-1);
	const [token, setToken] = useState("");

	const [data, setData] = useState({
		email: "",
		password: "",
	} as dataLog);

	const div = useRef(null);
	const div2 = useRef(null);
	const imgAngolo = useRef(null);

	useEffect(() => {
		if (!scegliMensa) return;

		getMense().then((res: any) => {
			if (!res) {
				toast.error("Errore nella connessione al server");
				return;
			}
			if (res === "nessuna mensa trovata") {
				setMense([]);
				toast.error("Nessuna mensa disponibile");
				return;
			}
			setMense(res);
		});
	}, [scegliMensa]);

	const submitLoginCliccato = () => {
		if (data.email === "" || data.password === "") {
			toast.error("Compilare tutti i campi!");
			return;
		}

		if (scegliMensa) {
			if (mense.length === 0) {
				toast.error("Nessuna mensa disponibile!");
				return;
			}
			if (nuovaMensa === -1) {
				toast.error("Scegliere una mensa!");
				return;
			}

			modifyMensa(nuovaMensa, token).then((res) => {
				if (!res) {
					toast.error("Errore nella connessione al server");
					return;
				}
				loginUser(data).then((res: any) => {
					if (!res) {
						toast.error("Errore nella connessione al server");
						return;
					}

					if (
						typeof res === "object" &&
						res.message === "Mensa preferita cancellata"
					) {
						setToken(res.token);
						setScegliMensa(true);
						toast.error(
							"La tua mensa preferita è stata cancellata!\nScegline un'altra"
						);
						return;
					}
					if (typeof res === "string") {
						toast.error(res);
						return;
					}

					localStorage.setItem("token", res.token);

					if (res.tipo + "" === "1") {
						localStorage.setItem("cart", JSON.stringify([]));
						setLoggato("cliente");
					} else {
						setLoggato("produttore");
					}
				});
			});
		} else {
			loginUser(data).then((res: any) => {
				if (!res) {
					toast.error("Errore nella connessione al server");
					return;
				}

				if (
					typeof res === "object" &&
					res.message === "Mensa preferita cancellata"
				) {
					setToken(res.token);
					setScegliMensa(true);
					toast.error(
						"La tua mensa preferita è stata cancellata!\nScegline un'altra"
					);
					return;
				}
				if (typeof res === "string") {
					toast.error(res);
					return;
				}

				localStorage.setItem("token", res.token);

				if (res.tipo + "" === "1") {
					localStorage.setItem("cart", JSON.stringify([]));
					setLoggato("cliente");
				} else {
					setLoggato("produttore");
				}
			});
		}
	};

	useEffect(() => {
		animazioniImmagini(45, 5, window.innerHeight);
		//eslint-disable-next-line
	}, []);

	return (
		<>
			<img
				src={logopiccolo}
				alt='logo piccolo'
				className='absolute scale-[0.13] top-3 right-3 translate-x-[43%] translate-y-[-43%] animate-showElement flex tel:hidden'
				ref={imgAngolo}
			/>
			<div
				className='flex flex-col justify-center items-center h-full animate-showElement'
				ref={div}
			>
				{pwdDimenticata ? (
					<PasswordDimenticata
						setPwdDimenticata={setPwdDimenticata}
						animazioniImmagini={animazioniImmagini}
					/>
				) : (
					<div ref={div2}>
						<div className='flex flex-col w-full'>
							<div className='flex flex-col'>
								<Label htmlFor='email' className='text-marrone font-bold'>
									Email
								</Label>
								<Input
									id='email'
									type='email'
									onChange={(e) => {
										setData({ ...data, email: e.target.value });
									}}
									variant='inputMenshub'
								/>
							</div>
							<div className='flex flex-col'>
								<Label htmlFor='password' className='text-marrone font-bold'>
									Password
								</Label>
								<Input
									id='password'
									type='password'
									onChange={(e) => {
										setData({ ...data, password: e.target.value });
									}}
									variant='inputMenshub'
								/>
							</div>
							{scegliMensa && mense.length > 0 ? (
								<div className='flex flex-col'>
									<Label
										htmlFor='mensaprefe'
										className='text-marrone font-bold'
									>
										Nuova mensa preferita
									</Label>
									<Select onValueChange={(e: any) => setNuovaMensa(e)}>
										<SelectTrigger
											id='mensaprefe'
											className='bg-biancoLatte rounded-3xl border-0 shadow-sm focus:outline-none focus:ring-transparent text-marrone'
										>
											<SelectValue></SelectValue>
										</SelectTrigger>
										<SelectContent
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
							) : (
								""
							)}
							<div className='flex flex-col mt-1'>
								<p
									className='text-marrone text-base underline cursor-pointer'
									onClick={() => {
										//@ts-ignore
										div2.current.classList.add("animate-hideFast");
										animazioniImmagini(35, 0, window.innerHeight);
										sleep(400).then(() => {
											setPwdDimenticata(true);
										});
									}}
								>
									Password dimenticata?
								</p>
							</div>
						</div>
						<div className='flex flex-row w-full mt-3'>
							<Button
								variant='indietro'
								className='w-1/2 rounded-3xl mr-1'
								onClick={() => {
									animazioniImmagini(0, 15, window.innerHeight);

									//@ts-ignore
									div.current.classList.remove("animate-showElement");
									//@ts-ignore
									div.current.classList.add("animate-hideElement");
									//@ts-ignore
									imgAngolo.current.classList.remove("animate-showElement");
									//@ts-ignore
									imgAngolo.current.classList.add("animate-hideElement");

									sleep(900).then(() => {
										setLogin("?");
									});
								}}
							>
								Indietro
							</Button>
							<button
								onClick={submitLoginCliccato}
								className='w-1/2 bg-marrone p-2 text-biancoLatte rounded-3xl'
							>
								Accedi
							</button>
						</div>
					</div>
				)}
			</div>
		</>
	);
};
//
//password dimenticata
const PasswordDimenticata = ({
	setPwdDimenticata,
	animazioniImmagini,
}: {
	setPwdDimenticata: Function;
	animazioniImmagini: Function;
}) => {
	const div = useRef(null);
	const [email, setEmail] = useState("");
	const [emailInviata, setEmailInviata] = useState(false);

	return (
		<div className='flex flex-col w-full' ref={div}>
			<Label htmlFor='email' className='text-marrone font-bold mb-1'>
				Email
			</Label>
			<Input
				id='email'
				variant='inputMenshub'
				onChange={(e: any) => setEmail(e.target.value)}
			></Input>
			<div className='flex flex-row w-full'>
				<Button
					variant='indietro'
					className='w-1/2 rounded-3xl mr-1'
					onClick={() => {
						//@ts-ignore
						div.current.classList.add("animate-hideFast");
						animazioniImmagini(45, 5, window.innerHeight);
						sleep(400).then(() => {
							setPwdDimenticata(false);
						});
					}}
				>
					Indietro
				</Button>
				<Button
					variant='avanti'
					onClick={() => {
						if (email === "") {
							toast.error("Inserire un'email!");
							return;
						}

						setEmailInviata(true);

						//chiamata al server
						sendEmail(email).then((res) => {
							if (!res) {
								toast.error("Errore nella connessione al server");
								setEmailInviata(false);
								return;
							}
							if (res === "Email inviata con successo")
								toast.info("Email inviata! (controlla spam)");
							else toast.error(res);
						});
					}}
					className='w-1/2 rounded-3xl'
					disabled={emailInviata}
				>
					Invia
				</Button>
			</div>
		</div>
	);
};

//
//
//register generale
const Register = ({
	animazioniImmagini,
	setLogin,
	id,
	setId,
}: {
	animazioniImmagini: Function;
	setLogin: Function;
	id: number;
	setId: Function;
}) => {
	const [utente, setUtente] = useState("?");
	const div = useRef(null);
	const imgAngolo = useRef(null);

	return (
		<>
			<img
				src={logopiccolo}
				alt='logo piccolo'
				className='absolute scale-[0.13] top-3 right-3 translate-x-[43%] translate-y-[-43%] animate-showElement tel:hidden'
				ref={imgAngolo}
			/>
			<div
				className='flex flex-col justify-center items-center h-full animate-showElement w-[85%]'
				ref={div}
			>
				{utente === "?" ? (
					<SceltaUtente
						setUtente={setUtente}
						setLogin={setLogin}
						animazioniImmagini={animazioniImmagini}
						imgAngolo={imgAngolo}
					/>
				) : utente === "cliente" ? (
					<RegisterCliente
						setLogin={setLogin}
						setUtente={setUtente}
						animazioniImmagini={animazioniImmagini}
						id_mensa={id}
						setId={setId}
					/>
				) : (
					<RegisterMensa
						setUtente={setUtente}
						setLogin={setLogin}
						animazioniImmagini={animazioniImmagini}
						setId={setId}
					/>
				)}
			</div>
		</>
	);
};
//
//register mensa
const ContattiMensa = ({
	data,
	setData,
}: {
	data: dataMensa;
	setData: Function;
}) => {
	return (
		<div className='flex w-full items-center gap-4 flex-col animate-showElement'>
			<div className='flex flex-col w-full'>
				<Label htmlFor='nome' className='text-marrone font-bold mb-0.5'>
					Nome Mensa
				</Label>
				<Input
					id='nome'
					type='text'
					onChange={(e) => {
						setData({ ...data, nome: e.target.value });
					}}
					className='bg-biancoLatte rounded-3xl border-0 shadow-lg focus:outline-none focus:ring-transparent text-marrone w-full'
					defaultValue={data.nome}
				/>
			</div>
			<div className='flex flex-col w-full'>
				<Label htmlFor='email' className='text-marrone font-bold mb-0.5'>
					Email di contatto
				</Label>
				<Input
					id='email'
					type='email'
					onChange={(e) => {
						setData({ ...data, email: e.target.value });
					}}
					className='bg-biancoLatte rounded-3xl border-0 shadow-lg focus:outline-none focus:ring-transparent text-marrone w-full'
					defaultValue={data.email}
				/>
			</div>
			<div className='flex flex-col w-full'>
				<Label htmlFor='telefono' className='text-marrone font-bold mb-0.5'>
					Telefono di contatto
				</Label>
				<Input
					id='telefono'
					type='tel'
					onChange={(e) => {
						setData({ ...data, telefono: e.target.value });
					}}
					pattern='[0-9]{10}'
					className='bg-biancoLatte rounded-3xl border-0 shadow-lg focus:outline-none focus:ring-transparent text-marrone w-full'
					defaultValue={data.telefono}
				/>
			</div>
			<div className='flex flex-col w-full'>
				<Label htmlFor='indirizzo' className='text-marrone font-bold mb-0.5'>
					Indirizzo
				</Label>
				<Input
					id='indirizzo'
					type='text'
					onChange={(e) => {
						setData({ ...data, indirizzo: e.target.value });
					}}
					className='bg-biancoLatte rounded-3xl border-0 shadow-lg focus:outline-none focus:ring-transparent text-marrone'
					defaultValue={data.indirizzo}
				/>
			</div>
		</div>
	);
};
const IndirizzoMensa = ({
	data,
	setData,
	setPrivacy,
	setCookie,
}: {
	data: dataMensa;
	setData: Function;
	setPrivacy: Function;
	setCookie: Function;
}) => {
	const [regioni, setRegioni] = useState([] as Array<string>);
	const [province, setProvince] = useState([]);
	const [comuni, setComuni] = useState([]);

	useEffect(() => {
		if (data.regione === undefined) return;
		fetch(
			"https://axqvoqvbfjpaamphztgd.functions.supabase.co/province/" +
				data.regione,
			{
				headers: {
					"Access-Control-Allow-Origin": "*",
				},
			}
		)
			.then((res) => res.json())
			.then((res) => {
				if (!res) {
					toast.error("Errore nella connessione al server");
					return;
				}
				setProvince(res);
			});
	}, [data.regione]);
	useEffect(() => {
		if (data.provincia === undefined) return;
		fetch(
			"https://axqvoqvbfjpaamphztgd.functions.supabase.co/comuni/provincia/" +
				data.provincia,
			{
				headers: {
					"Access-Control-Allow-Origin": "*",
				},
			}
		)
			.then((res) => res.json())
			.then((res) => {
				if (!res) {
					toast.error("Errore nella connessione al server");
					return;
				}
				setComuni(res);
			});
	}, [data.provincia]);

	if (regioni.length === 0) {
		fetch("https://axqvoqvbfjpaamphztgd.functions.supabase.co/regioni", {
			headers: {
				"Access-Control-Allow-Origin": "*",
			},
		})
			.then((res) => res.json())
			.then((res) => {
				if (!res) {
					toast.error("Errore nella connessione al server");
					return;
				}
				setRegioni(res);
			});
	}

	return (
		<div className='flex  items-center gap-4 flex-col animate-showFast w-full'>
			<div className='flex flex-col w-full'>
				<Label htmlFor='regione' className='text-marrone font-bold mb-0.5'>
					Regione
				</Label>
				<Select
					disabled={regioni.length === 0}
					onValueChange={(e) => setData({ ...data, regione: e })}
					defaultValue={data.regione}
				>
					<SelectTrigger
						className='bg-biancoLatte rounded-3xl border-0 shadow-sm focus:outline-none focus:ring-transparent text-marrone'
						id='regione'
					>
						<SelectValue placeholder=''></SelectValue>
					</SelectTrigger>
					<SelectContent
						ref={(ref) => {
							if (!ref) return;
							ref.ontouchstart = (e) => {
								e.preventDefault();
							};
						}}
						className='bg-biancoLatte rounded-3xl border-0 shadow-sm focus:outline-none focus:ring-transparent text-marrone'
					>
						{regioni.map((item, index) => {
							return (
								<SelectItem value={item} key={index} className='text-marrone'>
									{item}
								</SelectItem>
							);
						})}
					</SelectContent>
				</Select>
			</div>
			<div className='flex flex-col w-full'>
				<Label htmlFor='provincia' className='text-marrone font-bold mb-0.5'>
					Provincia
				</Label>
				<Select
					disabled={province.length === 0}
					onValueChange={(e) => setData({ ...data, provincia: e })}
					defaultValue={data.provincia}
				>
					<SelectTrigger
						className='bg-biancoLatte rounded-3xl border-0 shadow-sm focus:outline-none focus:ring-transparent text-marrone'
						id='provincia'
					>
						<SelectValue placeholder=''></SelectValue>
					</SelectTrigger>
					<SelectContent
						ref={(ref) => {
							if (!ref) return;
							ref.ontouchstart = (e) => {
								e.preventDefault();
							};
						}}
						className='bg-biancoLatte rounded-3xl border-0 shadow-sm focus:outline-none focus:ring-transparent text-marrone'
					>
						{province.map((item: any, index: number) => {
							return (
								<SelectItem
									value={item.nome}
									key={index}
									className='text-marrone'
								>
									{item.nome}
								</SelectItem>
							);
						})}
					</SelectContent>
				</Select>
			</div>
			<div className='flex flex-col w-full'>
				<Label htmlFor='comune' className='text-marrone font-bold mb-0.5'>
					Comune
				</Label>
				<Select
					disabled={comuni.length === 0}
					onValueChange={(e) =>
						setData({ ...data, comune: e.split("-")[0], cap: e.split("-")[1] })
					}
					defaultValue={data.comune}
				>
					<SelectTrigger
						className='bg-biancoLatte rounded-3xl border-0 shadow-sm focus:outline-none focus:ring-transparent text-marrone'
						id='comune'
					>
						<SelectValue placeholder=''></SelectValue>
					</SelectTrigger>
					<SelectContent
						ref={(ref) => {
							if (!ref) return;
							ref.ontouchstart = (e) => {
								e.preventDefault();
							};
						}}
						className='bg-biancoLatte rounded-3xl border-0 shadow-sm focus:outline-none focus:ring-transparent text-marrone'
					>
						{comuni.map((item: any, index: number) => {
							return (
								<SelectItem
									value={item.nome + "-" + item.cap}
									key={index}
									className='text-marrone'
								>
									{item.nome}
								</SelectItem>
							);
						})}
					</SelectContent>
				</Select>
			</div>
			<div className='flex flex-row w-[95%]'>
				<div className='h-full'>
					<Checkbox
						variant='menshub'
						id='privacy'
						onCheckedChange={(e) => setPrivacy(e)}
					/>
				</div>
				<p className='text-marrone font-bold text-sm ml-0.5'>
					Dichiaro di avere 18 anni e di aver letto e accettato
					<a
						href='https://www.iubenda.com/privacy-policy/74362538'
						target='_blank'
						className='iubenda-white iubenda-noiframe iubenda-embed iubenda-noiframe underline italic'
						title='Privacy Policy'
					>
						Privacy Policy
					</a>
				</p>
			</div>
			<div className='flex flex-row w-[95%]'>
				<div className='h-full'>
					<Checkbox
						variant='menshub'
						id='privacy'
						onCheckedChange={(e) => setCookie(e)}
					/>
				</div>
				<p className='text-marrone font-bold text-sm ml-0.5'>
					Dichiaro di avere 18 anni e di aver letto e accettato
					<a
						href='https://www.iubenda.com/privacy-policy/74362538/cookie-policy'
						target='_blank'
						className='iubenda-white iubenda-noiframe iubenda-embed iubenda-noiframe underline italic'
						title='Cookie Policy'
					>
						Cookie Policy
					</a>
				</p>
			</div>
		</div>
	);
};
const RegisterMensa = ({
	setUtente,
	animazioniImmagini,
	setLogin,
	setId,
}: {
	setUtente: Function;
	animazioniImmagini: Function;
	setLogin: Function;
	setId: Function;
}) => {
	const [pagina, setPagina] = useState(0);

	const div = useRef(null);

	const [data, setData] = useState({} as dataMensa);

	const [privacy, setPrivacy] = useState(true);
	const [cookie, setCookie] = useState(true);

	const elementi = [
		<ContattiMensa data={data} setData={setData} />,
		<IndirizzoMensa
			data={data}
			setData={setData}
			setPrivacy={setPrivacy}
			setCookie={setCookie}
		/>,
	];

	useEffect(() => {
		animazioniImmagini(45, 5, window.innerHeight);
		//eslint-disable-next-line
	}, []);

	return (
		<div
			className='flex flex-col justify-between items-center animate-showElement overflow-y-scroll w-3/4 tel:overflow-y-hidden'
			ref={div}
		>
			{elementi[pagina]}
			<div className='flex flex-row items-center justify-center mt-2 w-full'>
				<Button
					variant='indietro'
					onClick={() => {
						if (pagina === 0) {
							animazioniImmagini(35, 0, window.innerHeight);
							//@ts-ignore
							div.current.classList.remove("animate-showElement");
							//@ts-ignore
							div.current.classList.add("animate-hideElement");

							sleep(900).then(() => {
								setUtente("?");
							});
						} else {
							setPagina(0);
							setPrivacy(true);
							setCookie(true);
						}
					}}
					className='w-1/2 p-2 rounded-3xl mt-1 mr-1'
				>
					Indietro
				</Button>
				<Button
					// onClick={submitRegisterCliccato}
					variant='avanti'
					className='w-1/2 bg-marrone p-2 text-biancoLatte rounded-3xl mt-1'
					onClick={() => {
						if (pagina === 0) {
							if (
								data.nome === undefined ||
								data.nome === "" ||
								data.email === undefined ||
								data.email === "" ||
								data.telefono === undefined ||
								data.telefono === "" ||
								data.indirizzo === undefined ||
								data.indirizzo === ""
							) {
								toast.error("Compilare tutti i campi!");
								return;
							}
							setPagina(1);
							setPrivacy(false);
							setCookie(false);
						} else if (pagina === 1) {
							if (
								data.regione === undefined ||
								data.provincia === undefined ||
								data.comune === undefined ||
								data.cap === undefined ||
								data.indirizzo === undefined ||
								data.regione === "" ||
								data.provincia === "" ||
								data.comune === ""
							) {
								toast.error("Compilare tutti i campi!");
								return;
							} else {
								registerMensa({
									...data,
									provincia: data.provincia.replace("'", "\\'"),
								}).then((res) => {
									if (!res) {
										toast.error("Errore nella connessione al server");
										return;
									}
									if (typeof res === "string") {
										toast.error(res);
									} else {
										toast.success("Mensa creata con successo");
										setId(res);
										setLogin(0);
										setUtente("cliente");
									}
								});
							}
						}
					}}
					disabled={!privacy || !cookie}
				>
					{pagina === 0 ? "Avanti" : "Registra"}
				</Button>
			</div>
		</div>
	);
};
//
//register cliente
const RegisterCliente = ({
	setUtente,
	animazioniImmagini,
	setLogin,
	id_mensa,
	setId,
}: {
	setUtente: Function;
	animazioniImmagini: Function;
	setLogin: Function;
	id_mensa: number;
	setId: Function;
}) => {
	const [data, setData] = useState({
		nome: "",
		cognome: "",
		email: "",
		password: "",
		confirm_password: "",
		id_mensa: id_mensa,
		cliente: id_mensa === -1,
	} as dataReg);

	const [mense, setMense] = useState([] as Array<mensa>);
	const div = useRef(null);
	const [emailInviata, setEmailInviata] = useState(false);

	const [pagina, setPagina] = useState("1");

	const [privacy, setPrivacy] = useState(true);
	const [cookie, setCookie] = useState(true);

	const [openMensaPreferita, setOpenMensaPreferita] = useState(false);

	if (mense.length === 0) {
		setMense([{ id: -1, indirizzo: "richiesto", nome: "richiesto" }]);
		if (id_mensa === -1) {
			getMense().then((res: any) => {
				if (!res) {
					toast.error("Errore nella connessione al server");
					return;
				}
				if (res === "nessuna mensa trovata") {
					setMense([
						{
							id: -1,
							indirizzo: "richiesto",
							nome: "richiesto",
						},
					]);
					toast.info("Nessuna mensa registrata\nReinderizzamento alla home...");

					sleep(1500).then(() => {
						animazioniImmagini(0, 15, window.innerHeight);
						setLogin("?");
					});
				} else setMense(res);
			});
		}

		return <p>CARICAMENTO</p>;
	}

	const submitRegisterCliccato = () => {
		if (
			data.email === "" ||
			data.nome === "" ||
			data.cognome === "" ||
			data.password === "" ||
			data.confirm_password === "" ||
			data.id_mensa === -1 ||
			data.id_mensa === undefined
		) {
			toast.error("Compilare tutti i campi!");
			return;
		}

		if (data.password !== data.confirm_password) {
			toast.error("Password e conferma password devono corrispondere!");
			return;
		}
		setEmailInviata(true);
		registerUser(data).then((res) => {
			if (!res) {
				toast.error("Errore nella connessione al server");
				setEmailInviata(false);
				return;
			}
			if (
				res !==
				"Registrazione avvenuta. Controlla la casella di posta per confermare l'email."
			) {
				setEmailInviata(false);
				toast.error(res + "");
				setId(-1);
			} else {
				toast.success(res);
			}
		});
	};

	const pagina1 = () => {
		return (
			<>
				{id_mensa !== -1 ? (
					<div className='flex flex-col'>
						<p className='text-2xl text-marrone text-center'>
							Crea l'utente amministratore:
						</p>
					</div>
				) : (
					""
				)}
				<div className='flex flex-col'>
					<Label htmlFor='nome' className='text-marrone font-bold mb-0.5'>
						Nome
					</Label>
					<Input
						id='nome'
						type='text'
						onChange={(e) => {
							setData({ ...data, nome: e.target.value });
						}}
						className='bg-biancoLatte rounded-3xl border-0 shadow-lg focus:outline-none focus:ring-transparent text-marrone'
						defaultValue={data.nome}
					/>
				</div>
				<div className='flex flex-col'>
					<Label htmlFor='cognome' className='text-marrone font-bold mb-0.5'>
						Cognome
					</Label>
					<Input
						id='cognome'
						type='text'
						onChange={(e) => {
							setData({ ...data, cognome: e.target.value });
						}}
						className='bg-biancoLatte rounded-3xl border-0 shadow-lg focus:outline-none focus:ring-transparent text-marrone'
						defaultValue={data.cognome}
					/>
				</div>
				{id_mensa !== -1 ? (
					""
				) : (
					<div className='flex flex-col'>
						<Label
							htmlFor='selectMensa'
							className='text-marrone font-bold mb-0.5'
						>
							Mensa preferita
						</Label>
						<Select
							onValueChange={(e: any) => {
								setData({ ...data, id_mensa: e });
							}}
							defaultValue={data.id_mensa}
							onOpenChange={(e) => setOpenMensaPreferita(e)}
						>
							<SelectTrigger
								className='w-full m-0 bg-biancoLatte text-marrone rounded-3xl shadow-lg border-0'
								id='selectMensa'
							>
								<SelectValue placeholder=''></SelectValue>
							</SelectTrigger>
							<SelectContent
								ref={(ref) => {
									if (!ref) return;
									ref.ontouchstart = (e) => {
										e.preventDefault();
									};
								}}
								className='bg-biancoLatte border-0 rounded-2xl hadow-lg'
							>
								{mense.map((item) => {
									return (
										<SelectItem
											value={item.id + ""}
											key={item.id}
											className='text-marrone'
										>
											{item.nome}
										</SelectItem>
									);
								})}
							</SelectContent>
						</Select>
					</div>
				)}
			</>
		);
	};
	const pagina2 = () => {
		return (
			<>
				<div className='flex flex-col'>
					<Label htmlFor='email' className='text-marrone font-bold mb-0.5'>
						Email
					</Label>
					<Input
						id='email'
						type='email'
						onChange={(e) => {
							setData({ ...data, email: e.target.value });
						}}
						className='bg-biancoLatte rounded-3xl border-0 shadow-lg focus:outline-none focus:ring-transparent text-marrone'
						defaultValue={data.email}
					/>
				</div>
				<div className='flex flex-col'>
					<Label htmlFor='password' className='text-marrone font-bold mb-0.5'>
						Password
					</Label>
					<Input
						id='password'
						type='password'
						onChange={(e) => {
							setData({ ...data, password: e.target.value });
						}}
						className='bg-biancoLatte rounded-3xl border-0 shadow-lg focus:outline-none focus:ring-transparent text-marrone'
						defaultValue={data.password}
					/>
				</div>
				<div className='flex flex-col'>
					<Label
						htmlFor='confermaPassword'
						className='text-marrone font-bold mb-0.5'
					>
						Conferma password
					</Label>
					<Input
						id='confermaPassword'
						type='password'
						onChange={(e) => {
							setData({ ...data, confirm_password: e.target.value });
						}}
						className='bg-biancoLatte rounded-3xl border-0 shadow-lg focus:outline-none focus:ring-transparent text-marrone'
						defaultValue={data.confirm_password}
					/>
				</div>
				<div className='flex flex-row w-[95%]'>
					<div className='h-full'>
						<Checkbox
							variant='menshub'
							id='privacy'
							onCheckedChange={(e: boolean) => setPrivacy(e)}
						/>
					</div>
					<p className='text-marrone font-bold text-sm ml-0.5'>
						Dichiaro di avere 18 anni e di aver letto e accettato{" "}
						<a
							href='https://www.iubenda.com/privacy-policy/74362538'
							target='_blank'
							className='iubenda-white iubenda-noiframe iubenda-embed iubenda-noiframe underline italic'
							title='Privacy Policy'
						>
							Privacy Policy
						</a>
					</p>
				</div>
				<div className='flex flex-row w-[95%]'>
					<div className='h-full'>
						<Checkbox
							variant='menshub'
							id='privacy'
							onCheckedChange={(e: boolean) => setCookie(e)}
						/>
					</div>
					<p className='text-marrone font-bold text-sm ml-0.5'>
						Dichiaro di avere 18 anni e di aver letto e accettato{" "}
						<a
							href='https://www.iubenda.com/privacy-policy/74362538/cookie-policy'
							target='_blank'
							className='iubenda-white iubenda-noiframe iubenda-embed iubenda-noiframe underline italic'
							title='Cookie Policy'
						>
							Cookie Policy
						</a>
					</p>
				</div>
			</>
		);
	};

	return (
		<div
			className='flex flex-col justify-between items-center animate-showElement overflow-y-scroll tel:overflow-y-scroll w-3/4'
			ref={div}
		>
			<div className='grid w-full items-center gap-4'>
				{pagina === "1" ? pagina1() : ""}
				{pagina === "2" ? pagina2() : ""}
			</div>

			<div className='flex flex-row items-center justify-center w-full mt-3'>
				<Button
					variant='indietro'
					onClick={() => {
						if (pagina === "1") {
							animazioniImmagini(35, 0, window.innerHeight);

							//@ts-ignore
							div.current.classList.remove("animate-showElement");
							//@ts-ignore
							div.current.classList.add("animate-hideElement");

							sleep(900).then(() => {
								setUtente("?");
							});
						} else {
							setPagina("1");
							setPrivacy(true);
							setCookie(true);
						}
					}}
					className='w-1/2 rounded-3xl mt-1 mr-1'
					disabled={openMensaPreferita}
				>
					Indietro
				</Button>
				<Button
					variant='avanti'
					onClick={
						pagina === "2"
							? submitRegisterCliccato
							: () => {
									if (
										data.nome === "" ||
										data.cognome === "" ||
										data.id_mensa === -1
									) {
										toast.error("Compilare tutti i campi!");
										return;
									}
									setPagina("2");
									setPrivacy(false);
									setCookie(false);
							  }
					}
					disabled={emailInviata || !privacy || !cookie || openMensaPreferita}
					className='w-1/2 rounded-3xl mt-1'
				>
					{pagina === "2" ? "Registrati" : "Avanti"}
				</Button>
			</div>
		</div>
	);
};

//
//
//scelta utente
const SceltaUtente = ({
	setUtente,
	setLogin,
	animazioniImmagini,
	imgAngolo,
}: {
	setUtente: Function;
	setLogin: Function;
	animazioniImmagini: Function;
	imgAngolo: any;
}) => {
	const div = useRef(null);

	useEffect(() => {
		animazioniImmagini(35, 0, window.innerHeight);
		//eslint-disable-next-line
	}, []);

	return (
		<div
			className='flex flex-col items-center justify-center animate-showElement'
			ref={div}
		>
			<Button
				variant='avanti'
				className='w-full rounded-3xl py-[22px] text-lg mt-2'
				onClick={() => {
					animazioniImmagini(45, 5, window.innerHeight);

					//@ts-ignore
					div.current.classList.remove("animate-showElement");
					//@ts-ignore
					div.current.classList.add("animate-hideElement");

					sleep(900).then(() => {
						setUtente("cliente");
					});
				}}
			>
				Sono un Cliente
			</Button>
			<Button
				variant='avanti'
				className='w-full rounded-3xl py-[22px] text-lg mt-2'
				onClick={() => {
					animazioniImmagini(45, 5, window.innerHeight);
					//@ts-ignore
					div.current.classList.remove("animate-showElement");
					//@ts-ignore
					div.current.classList.add("animate-hideElement");

					sleep(900).then(() => {
						setUtente("produttore");
					});
				}}
			>
				Sono una Mensa
			</Button>
			<Button
				variant='indietro'
				className='w-full rounded-3xl py-[22px] text-lg mt-2'
				onClick={() => {
					animazioniImmagini(0, 15, window.innerHeight);

					//@ts-ignore
					div.current.classList.remove("animate-showElement");
					//@ts-ignore
					div.current.classList.add("animate-hideElement");
					//@ts-ignore
					imgAngolo.current.classList.remove("animate-showElement");
					//@ts-ignore
					imgAngolo.current.classList.add("animate-hideElement");

					sleep(900).then(() => {
						setLogin("?");
					});
				}}
			>
				Indietro
			</Button>
		</div>
	);
};

const Auth = ({ setLoggato }: { setLoggato: Function }) => {
	const [login, setLogin] = useLocalStorage("login", "?");

	//eslint-disable-next-line
	const [images, setImages] = useState([
		useRef(null),
		useRef(null),
		useRef(null),
		useRef(null),
		useRef(null),
	]);
	const divBenvenuto = useRef(null);
	const divBottoni = useRef(null);
	const inputs = useRef(null);

	const [id, setId] = useState(-1);

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
	const animazioneProduttore = (
		sopra: number,
		sotto: number,
		width: number
	) => {
		const generaProporzioni = (
			sopra: number,
			sotto: number,
			width: number,
			height: number
		) => {
			const rapportoProporzione = width / 1242;

			const proporzioneAltezza = 858 / height;

			const sopraHeight = sopra * rapportoProporzione;
			const sottoHeight = sotto * rapportoProporzione;
			const cerchio = 450 * rapportoProporzione;

			return {
				sopra: Math.round(sopraHeight),
				sotto: Math.round(sottoHeight),
				cerchio: Math.round(cerchio),
				// altezza: (proporzioneAltezza * Math.round(sopraHeight)) / 5,
				altezza: proporzioneAltezza,
			};
		};

		const proporzioni = generaProporzioni(
			sopra,
			sotto,
			window.innerWidth,
			window.innerHeight
		);

		//@ts-ignore
		images[2].current.style.top = `-${
			proporzioni.sopra * proporzioni.altezza
		}svh`;
		//@ts-ignore
		images[3].current.style.bottom = `-${proporzioni.sotto}svh`;
	};

	useEffect(() => {
		// if (window.innerWidth > 450 && window.innerWidth <= 1000) {
		// 	const generaProporzioni = (
		// 		sopra: number,
		// 		sotto: number,
		// 		width: number
		// 	) => {
		// 		return {
		// 			sopra: (sopra * width) / 450,
		// 			sotto: (sotto * width) / 450,
		// 		};
		// 	};

		// 	//con 450x811
		// 	const proporzioni = generaProporzioni(55, 15, window.innerWidth);
		// 	console.log(proporzioni);

		// 	//@ts-ignore
		// 	images[0].current.style.top = `-${proporzioni.sopra}svh`;
		// 	//@ts-ignore
		// 	images[1].current.style.bottom = `-${proporzioni.sotto}svh`;
		// 	//@ts-ignore
		// }

		if (window.innerWidth >= 450) {
			console.log("scuuuu");

			animazioneProduttore(90, 40, window.innerWidth);

			const generaProporzioni = (
				sopra: number,
				sotto: number,
				width: number
			) => {
				const rapportoProporzione = width / 1242;

				const sopraHeight = sopra * rapportoProporzione;
				const sottoHeight = sotto * rapportoProporzione;

				return {
					sopra: Math.round(sopraHeight),
					sotto: Math.round(sottoHeight),
				};
			};

			const proporzioni = generaProporzioni(16, 5, window.innerWidth);

			//@ts-ignore
			console.log(divBenvenuto.current.classList, proporzioni);

			//@ts-ignore
			divBenvenuto.current.classList.add("top-[" + proporzioni.sopra + "%]");
			//  = `${proporzioni.sopra}%`;
			//@ts-ignore
			divBenvenuto.current.classList.add(
				"left-[" + (proporzioni.sopra + 1) + "%]"
			);

			//@ts-ignore
			// divBenvenuto.current.style.top = `${proporzioni.sopra}%`;
			//@ts-ignore
			// divBenvenuto.current.style.left = `${proporzioni.sotto}%`;
		}
		//eslint-disable-next-line
	}, []);

	const btnBenvenuti = () => (
		<div className='h-[70%] w-[80%] flex flex-col justify-between items-center tel:h-full tel:w-full tel:justify-center'>
			<div
				className='flex flex-col items-center transition-[margin] duration-1000 ease-in-out animate-showElement tel:hidden'
				ref={divBenvenuto}
			>
				<p className='text-marrone text-5xl font-bold tracking-tight'>
					Benvenuto in Menshub
				</p>
				<p className='text-marrone text-xl w-full'>
					Il tuo amico per la tua mensa
				</p>
			</div>
			<div
				className='flex flex-col items-center w-full animate-showElement'
				ref={divBottoni}
			>
				<Button
					variant='avanti'
					className='p-[26px] text-lg w-[90%] rounded-[30px] mb-4 tel:w-3/4'
					onClick={() => {
						animazioniImmagini(45, 5, window.innerHeight);
						//@ts-ignore
						divBenvenuto.current.classList.add("mt-[-45svh]");
						//@ts-ignore
						divBottoni.current.classList.remove("animate-showElement");
						//@ts-ignore
						divBottoni.current.classList.add("animate-hideElement");

						sleep(900).then(() => {
							setLogin("1");
						});
					}}
				>
					Accedi
				</Button>
				<Button
					variant='indietro'
					className='p-[26px] text-lg w-[90%] rounded-[30px] tel:w-3/4'
					onClick={() => {
						animazioniImmagini(35, 0, window.innerHeight);
						//@ts-ignore
						divBenvenuto.current.classList.add("mt-[-45svh]");
						//@ts-ignore
						divBottoni.current.classList.remove("animate-showElement");
						//@ts-ignore
						divBottoni.current.classList.add("animate-hideElement");

						sleep(900).then(() => {
							setLogin("0");
						});
					}}
				>
					Registrati
				</Button>
			</div>
		</div>
	);

	return (
		<>
			{/* <div className='w-svw h-svh overflow-hidden absolute top-0 left-0 mobileProduttore:flex hidden'> */}
			<div className='w-svw h-svh overflow-hidden absolute top-0 left-0 flex tel:hidden'>
				<img
					src={imgSopra}
					alt=''
					className='absolute top-0 z-[-1] border-0 transition-[top] duration-1000 ease-in-out'
					ref={images[0]}
				/>
				<div className='h-full w-full flex justify-center items-center'>
					{login === "?" ? (
						btnBenvenuti()
					) : login === "1" ? (
						<Login
							setLoggato={setLoggato}
							setLogin={setLogin}
							animazioniImmagini={animazioniImmagini}
						/>
					) : (
						<Register
							animazioniImmagini={animazioniImmagini}
							setLogin={setLogin}
							id={id}
							setId={setId}
						/>
					)}
				</div>
				<img
					src={imgSotto}
					alt=''
					className='absolute bottom-[-15svh] z-[-2] transition-[bottom] duration-1000 ease-in-out'
					ref={images[1]}
				/>

				<Toaster richColors position='bottom-center' />
			</div>
			{/* <div className='w-svw h-svh overflow-hidden absolute top-0 left-0 mobileProduttore:hidden flex'> */}
			<div className='w-svw h-svh overflow-hidden absolute top-0 left-0 hidden tel:flex'>
				<img
					src={logopiccolo}
					alt='logo piccolo'
					className='absolute scale-[0.13] top-3 left-3 translate-x-[-43%] translate-y-[-43%] animate-showElement'
					width={400}
				/>
				<img
					src={loginTop}
					alt=''
					className='absolute top-[-90svh] z-[-1] border-0 transition-[top] duration-1000 ease-in-out'
					ref={images[2]}
				/>
				<div
					className='hidden absolute tel:flex flex-col items-center transition-[margin] duration-1000 ease-in-out animate-showElement'
					ref={divBenvenuto}
				>
					<p className='text-marrone text-7xl font-bold tracking-tight w-3/4'>
						Benvenuto in Menshub
					</p>
				</div>
				<div
					className='flex absolute justify-center items-center w-[400px] right-0 top-[15%] h-[520px]'
					ref={inputs}
				>
					{login === "?" ? (
						btnBenvenuti()
					) : login === "1" ? (
						<Login
							setLoggato={setLoggato}
							setLogin={setLogin}
							animazioniImmagini={animazioniImmagini}
						/>
					) : (
						<Register
							animazioniImmagini={animazioniImmagini}
							setLogin={setLogin}
							id={id}
							setId={setId}
						/>
					)}
				</div>
				<img
					src={loginCerchio}
					alt=''
					className='absolute top-[15%] right-0 z-[-2] transition-[bottom] duration-1000 ease-in-out'
					width={450}
					ref={images[4]}
				/>
				<img
					src={loginBottom}
					alt=''
					className='absolute bottom-[-40svh] z-[-2] transition-[bottom] duration-1000 ease-in-out'
					ref={images[3]}
				/>
				<Toaster richColors position='top-center' />
			</div>
		</>
	);
};

export default Auth;
