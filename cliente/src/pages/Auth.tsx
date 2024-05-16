import { useLocalStorage } from "usehooks-ts";

import imgSopra from "../img/sopra_benvenuto.png";
import imgSotto from "../img/sotto_login.png";
import { Button } from "../components/shadcn/Button";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dataLog, dataMensa, dataReg, mensa, sleep } from "../utils";
import {
	getMense,
	loginUser,
	registerMensa,
	registerUser,
	sendEmail,
} from "../scripts/fetch";
import { Label } from "../components/shadcn/Label";
import { Input } from "../components/shadcn/Input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../components/shadcn/Select";
import { Toaster } from "../components/shadcn/Sonner";
import { toast } from "sonner";

import logopiccolo from "../img/logoPiccolo.png";

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
	const navigate = useNavigate();
	const [pwdDimenticata, setPwdDimenticata] = useState(false);

	const [data, setData] = useState({
		email: "",
		password: "",
	} as dataLog);

	const div = useRef(null);
	const div2 = useRef(null);
	const imgAngolo = useRef(null);

	const submitLoginCliccato = () => {
		if (data.email === "" || data.password === "") {
			toast.error("Compilare tutti i campi!");
			return;
		}

		loginUser(data).then((res: any) => {
			if (typeof res === "string") {
				toast.error(res);
				return;
			} else {
				localStorage.setItem("token", res.token);
				console.log(res.cliente);

				if (res.cliente + "" === "1") {
					localStorage.setItem("cart", JSON.stringify([]));
					setLoggato("cliente");
				} else {
					setLoggato("produttore");
				}
			}
		});
	};

	useEffect(() => {
		animazioniImmagini(45, 5, window.innerHeight);
	}, []);

	return (
		<>
			<img
				src={logopiccolo}
				alt='SCU'
				className='absolute scale-[0.13] top-3 right-3 translate-x-[43%] translate-y-[-43%] animate-showElement'
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
								{" "}
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
							<div className='flex flex-col mt-1'>
								<p
									className='text-marrone text-base underline'
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

						//chiamata al server
						sendEmail(email).then((res) => {
							if (res === "Email inviata con successo")
								toast.info("Email inviata! (controlla spam)");
							else toast.error(res);
						});
					}}
					className='w-1/2 rounded-3xl'
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
				alt='SCU'
				className='absolute scale-[0.13] top-3 right-3 translate-x-[43%] translate-y-[-43%] animate-showElement'
				ref={imgAngolo}
			/>
			<div
				className='flex flex-col justify-center items-center h-full animate-showElement'
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
			<div className='flex flex-col'>
				<Label htmlFor='nome' className='text-marrone font-bold mb-0.5'>
					Nome Mensa
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
				<Label htmlFor='email' className='text-marrone font-bold mb-0.5'>
					Email di contatto
				</Label>
				<Input
					id='email'
					type='text'
					onChange={(e) => {
						setData({ ...data, email: e.target.value });
					}}
					className='bg-biancoLatte rounded-3xl border-0 shadow-lg focus:outline-none focus:ring-transparent text-marrone'
					defaultValue={data.email}
				/>
			</div>
			<div className='flex flex-col'>
				<Label htmlFor='telefono' className='text-marrone font-bold mb-0.5'>
					Telefono di contatto
				</Label>
				<Input
					id='email'
					type='telefono'
					onChange={(e) => {
						setData({ ...data, telefono: e.target.value });
					}}
					className='bg-biancoLatte rounded-3xl border-0 shadow-lg focus:outline-none focus:ring-transparent text-marrone'
					defaultValue={data.telefono}
				/>
			</div>
		</div>
	);
};
const IndirizzoMensa = ({
	data,
	setData,
}: {
	data: dataMensa;
	setData: Function;
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
				setRegioni(res);
			});
	}

	return (
		<div className='flex  items-center gap-4 flex-col w-full animate-showFast'>
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

	const elementi = [
		<ContattiMensa data={data} setData={setData} />,
		<IndirizzoMensa data={data} setData={setData} />,
	];

	useEffect(() => {
		animazioniImmagini(40, 0, window.innerHeight);
	}, []);

	return (
		<div
			className='flex flex-col justify-between items-center animate-showElement overflow-y-scroll w-[85%]'
			ref={div}
		>
			{elementi[pagina]}
			<div className='flex flex-row items-center justify-center w-full mt-2'>
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
						} else setPagina(0);
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
								data.telefono === ""
							) {
								toast.error("Compilare tutti i campi!");
								return;
							}
							setPagina(1);
						} else if (pagina === 1) {
							if (
								data.regione === undefined ||
								data.provincia === undefined ||
								data.comune === undefined ||
								data.cap === undefined ||
								data.indirizzo === undefined ||
								data.regione === "" ||
								data.provincia === "" ||
								data.comune === "" ||
								data.indirizzo === ""
							) {
								toast.error("Compilare tutti i campi!");
								return;
							} else {
								registerMensa(data).then((res) => {
									if (typeof res === "string") {
										toast.error(res);
									} else {
										setId(res);
										setLogin(0);
										setUtente("cliente");
									}
								});
							}
						}
					}}
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
}: {
	setUtente: Function;
	animazioniImmagini: Function;
	setLogin: Function;
	id_mensa: number;
}) => {
	const navigate = useNavigate();

	const [error, setError] = useState("");

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

	if (mense.length === 0) {
		setMense([{ id: -1, indirizzo: "richiesto", nome: "richiesto" }]);
		getMense().then((res: any) => {
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

		return <p>CARICAMENTO</p>;
	}

	const submitRegisterCliccato = () => {
		if (
			data.email === "" ||
			data.nome === "" ||
			data.cognome === "" ||
			data.password === "" ||
			data.confirm_password === "" ||
			data.id_mensa === -1
		) {
			toast.error("Compilare tutti i campi!");
			return;
		}

		if (data.password !== data.confirm_password) {
			toast.error("Password e conferma password devono corrispondere!");
			return;
		}

		registerUser(data).then((res) => {
			if (res !== "Registrazione avvenuta con successo") {
				toast.error(res + "");
			} else {
				toast.info(res + "\nReinderizzamento al login...");

				sleep(1000).then(() => {
					animazioniImmagini(45, 5, window.innerHeight);

					//@ts-ignore
					div.current.classList.remove("animate-showElement");
					//@ts-ignore
					div.current.classList.add("animate-hideElement");
					sleep(1500).then(() => {
						setLogin("1");
					});
				});
			}
		});
	};

	return (
		<div
			className='flex flex-col justify-between items-center animate-showElement overflow-y-scroll'
			ref={div}
		>
			<div className='grid w-full items-center gap-4'>
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
					/>
				</div>
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
								console.log(e);
								setData({ ...data, id_mensa: e });
							}}
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
			</div>
			<div className='flex flex-row items-center justify-center w-full mt-3'>
				<Button
					variant='indietro'
					onClick={() => {
						animazioniImmagini(35, 0, window.innerHeight);

						//@ts-ignore
						div.current.classList.remove("animate-showElement");
						//@ts-ignore
						div.current.classList.add("animate-hideElement");

						sleep(900).then(() => {
							setUtente("?");
						});
					}}
					className='w-1/2 rounded-3xl mt-1 mr-1'
				>
					Indietro
				</Button>
				<Button
					variant='avanti'
					onClick={submitRegisterCliccato}
					className='w-1/2 rounded-3xl mt-1'
				>
					Registrati
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
					animazioniImmagini(55, 15, window.innerHeight);

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
					animazioniImmagini(40, 0, window.innerHeight);
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

	const [images, setImages] = useState([useRef(null), useRef(null)]);
	const divBenvenuto = useRef(null);
	const divBottoni = useRef(null);

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

	const btnBenvenuti = () => (
		<div className='h-[70%] w-[80%] flex flex-col justify-between items-center'>
			<div
				className='flex flex-col items-center transition-[margin] duration-1000 ease-in-out animate-showElement'
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
					className='p-[26px] text-lg w-[90%] rounded-[30px] mb-4'
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
					className='p-[26px] text-lg w-[90%] rounded-[30px]'
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
		<div className='w-svw h-svh overflow-hidden absolute top-0 left-0'>
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
			<Toaster richColors />
		</div>
	);
};

export default Auth;
