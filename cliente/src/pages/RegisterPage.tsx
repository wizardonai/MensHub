import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getMense, registerMensa, registerUser } from "../scripts/fetch";

import { Input } from "../components/shadcn/Input";
import { dataMensa, dataReg, mensa, sleep } from "../utils";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../components/shadcn/Select";

import { Label } from "../components/shadcn/Label";

import login_sopra from "../img/login_sopra.png";
import login_sotto from "../img/login_sotto.png";

const ContattiMensa = ({
	data,
	setData,
}: {
	data: dataMensa;
	setData: Function;
}) => {
	return (
		<div className='flex w-full items-center gap-4 flex-col'>
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
					Email
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
					Telefono
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
				data.regione
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
				data.provincia
		)
			.then((res) => res.json())
			.then((res) => {
				setComuni(res);
			});
	}, [data.provincia]);

	if (regioni.length === 0) {
		fetch("https://axqvoqvbfjpaamphztgd.functions.supabase.co/regioni")
			.then((res) => res.json())
			.then((res) => {
				setRegioni(res);
			});
	}

	return (
		<div className='flex  items-center gap-4 flex-col w-3/4'>
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
	imgSopra,
	imgSotto,
}: {
	setUtente: Function;
	imgSopra: React.MutableRefObject<null>;
	imgSotto: React.MutableRefObject<null>;
}) => {
	const navigate = useNavigate();

	const [pagina, setPagina] = useState(0);

	const div = useRef(null);

	const [error, setError] = useState("");
	const [data, setData] = useState({} as dataMensa);

	const elementi = [
		<ContattiMensa data={data} setData={setData} />,
		<IndirizzoMensa data={data} setData={setData} />,
	];

	return (
		<div
			className='flex flex-col justify-between items-center animate-showElement overflow-y-scroll w-3/4'
			ref={div}
		>
			{elementi[pagina]}
			<div className='flex flex-col'>
				<p className='text-red-500'>{error}</p>
			</div>
			<p
				onClick={() => navigate("/login")}
				className='text-marrone underline w-3/4'
			>
				Accedi
			</p>
			<div className='flex flex-row items-center justify-center w-3/4'>
				<button
					onClick={() => {
						if (pagina === 0) {
							//@ts-ignore
							div.current.attributes.class.value =
								//@ts-ignore
								div.current.attributes.class.value.replace(
									" animate-showElement",
									""
								);

							//@ts-ignore
							div.current.attributes.class.value += " animate-hideElement";

							sleep(500).then(() => {
								//@ts-ignore
								imgSopra.current.attributes.class.value =
									//@ts-ignore
									imgSopra.current.attributes.class.value.replace(
										" animate-suSopra",
										""
									);
								//@ts-ignore
								imgSotto.current.attributes.class.value =
									//@ts-ignore
									imgSotto.current.attributes.class.value.replace(
										" animate-giuSotto",
										""
									);
								//@ts-ignore
								imgSopra.current.attributes.class.value += " animate-giuSopra";
								//@ts-ignore
								imgSotto.current.attributes.class.value += " animate-suSotto";
							});

							sleep(900).then(() => {
								setUtente("?");
							});
						} else setPagina(0);
					}}
					className='w-1/2 bg-marrone p-2 text-biancoLatte rounded-3xl mt-1'
				>
					Indietro
				</button>
				<button
					// onClick={submitRegisterCliccato}
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
								setError("Compilare tutti i campi!");
								return;
							}
							setError("");
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
								setError("Compilare tutti i campi!");
								return;
							} else {
								setError("");
								registerMensa(data).then((res) => {
									if (typeof res === "string") {
										setError(res);
									} else {
										console.log(res);
									}
								});
							}
						}
					}}
				>
					{pagina === 0 ? "Avanti" : "Registra"}
				</button>
			</div>
		</div>
	);
};
const RegisterCliente = ({
	setUtente,
	imgSopra,
	imgSotto,
}: {
	setUtente: Function;
	imgSopra: React.MutableRefObject<null>;
	imgSotto: React.MutableRefObject<null>;
}) => {
	const navigate = useNavigate();

	const [error, setError] = useState("");

	const [data, setData] = useState({
		nome: "",
		cognome: "",
		email: "",
		password: "",
		confirm_password: "",
		id_mensa: -1,
		is_produttore: false,
	} as dataReg);

	const [mense, setMense] = useState([] as Array<mensa>);
	const div = useRef(null);

	if (mense.length === 0) {
		setMense([{ id: -1, indirizzo: "richiesto", nome: "richiesto" }]);
		getMense().then((res: any) => {
			setMense(res);
		});

		return <p>CARICAMENTO</p>;
	}

	const submitRegisterCliccato = () => {
		setError("");

		if (
			data.email === "" ||
			data.nome === "" ||
			data.cognome === "" ||
			data.password === "" ||
			data.confirm_password === "" ||
			data.id_mensa === -1
		) {
			setError("Compilare tutti i campi!");
			return;
		}

		if (data.password !== data.confirm_password) {
			setError("Password e conferma password devono corrispondere!");
			return;
		}

		registerUser(data).then((res) => {
			if (res !== "Registrazione avvenuta con successo") {
				setError(res + "");
			} else {
				navigate("/login");
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
				<div className='flex flex-col'>
					<Label
						htmlFor='selectMensa'
						className='text-marrone font-bold mb-0.5'
					>
						Seleziona la tua mensa
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
				<div className='flex flex-col'>
					<p className='text-red-500'>{error}</p>
				</div>
			</div>
			<p
				onClick={() => navigate("/login")}
				className='text-marrone underline w-full'
			>
				Accedi
			</p>
			<div className='flex flex-row items-center justify-center w-full'>
				<button
					onClick={() => {
						//@ts-ignore
						div.current.attributes.class.value =
							//@ts-ignore
							div.current.attributes.class.value.replace(
								" animate-showElement",
								""
							);

						//@ts-ignore
						div.current.attributes.class.value += " animate-hideElement";

						sleep(500).then(() => {
							//@ts-ignore
							imgSopra.current.attributes.class.value =
								//@ts-ignore
								imgSopra.current.attributes.class.value.replace(
									" animate-suSopra",
									""
								);
							//@ts-ignore
							imgSotto.current.attributes.class.value =
								//@ts-ignore
								imgSotto.current.attributes.class.value.replace(
									" animate-giuSotto",
									""
								);
							//@ts-ignore
							imgSopra.current.attributes.class.value += " animate-giuSopra";
							//@ts-ignore
							imgSotto.current.attributes.class.value += " animate-suSotto";
						});

						sleep(900).then(() => {
							setUtente("?");
						});
					}}
					className='w-1/2 bg-marrone p-2 text-biancoLatte rounded-3xl mt-1'
				>
					Indietro
				</button>
				<button
					onClick={submitRegisterCliccato}
					className='w-1/2 bg-marrone p-2 text-biancoLatte rounded-3xl mt-1'
				>
					Registrati
				</button>
			</div>
		</div>
	);
};

const SceltaUtente = ({
	setUtente,
	imgSopra,
	imgSotto,
}: {
	setUtente: Function;
	imgSopra: React.MutableRefObject<null>;
	imgSotto: React.MutableRefObject<null>;
}) => {
	const div = useRef(null);

	return (
		<div
			className='flex flex-col items-center justify-center animate-showElement'
			ref={div}
		>
			<div
				className='w-40 text-biancoLatte bg-marrone p-3 rounded-xl'
				onClick={() => {
					//@ts-ignore
					div.current.attributes.class.value =
						//@ts-ignore
						div.current.attributes.class.value.replace(
							" animate-showElement",
							""
						);
					//@ts-ignore
					imgSopra.current.attributes.class.value =
						//@ts-ignore
						imgSopra.current.attributes.class.value.replace(
							" animate-giuSopra",
							""
						);
					//@ts-ignore
					imgSotto.current.attributes.class.value =
						//@ts-ignore
						imgSotto.current.attributes.class.value.replace(
							" animate-suSotto",
							""
						);

					//@ts-ignore
					div.current.attributes.class.value += " animate-hideElement";

					//@ts-ignore
					imgSopra.current.attributes.class.value += " animate-suSopra";
					//@ts-ignore
					imgSotto.current.attributes.class.value += " animate-giuSotto";

					sleep(900).then(() => {
						setUtente("cliente");
					});
				}}
			>
				<p className='w-full text-center'>Sono un Cliente</p>
			</div>
			<div
				className='w-40 text-biancoLatte bg-marrone p-3 rounded-xl mt-2'
				onClick={() => {
					//@ts-ignore
					div.current.attributes.class.value =
						//@ts-ignore
						div.current.attributes.class.value.replace(
							" animate-showElement",
							""
						);
					//@ts-ignore
					imgSopra.current.attributes.class.value =
						//@ts-ignore
						imgSopra.current.attributes.class.value.replace(
							" animate-giuSopra",
							""
						);
					//@ts-ignore
					imgSotto.current.attributes.class.value =
						//@ts-ignore
						imgSotto.current.attributes.class.value.replace(
							" animate-suSotto",
							""
						);

					//@ts-ignore
					div.current.attributes.class.value += " animate-hideElement";

					//@ts-ignore
					imgSopra.current.attributes.class.value += " animate-suSopra";
					//@ts-ignore
					imgSotto.current.attributes.class.value += " animate-giuSotto";

					sleep(900).then(() => {
						setUtente("produttore");
					});
				}}
			>
				<p className='w-full text-center'>Sono una Mensa</p>
			</div>
		</div>
	);
};

const RegisterPage = () => {
	const [utente, setUtente] = useState("?");
	const imgSopra = useRef(null);
	const imgSotto = useRef(null);

	return (
		<div className='flex justify-center items-center w-svw h-svh m-0 p-0 flex-col overflow-hidden'>
			<img
				src={login_sopra}
				alt=''
				// className='absolute top-0 left-0'
				className='w-full h-[250px]'
				ref={imgSopra}
			/>
			<div className='flex justify-center items-center w-svw h-svh overflow-y-scroll flex-col'>
				{utente === "?" ? (
					<SceltaUtente
						setUtente={setUtente}
						imgSopra={imgSopra}
						imgSotto={imgSotto}
					/>
				) : utente === "cliente" ? (
					<RegisterCliente
						setUtente={setUtente}
						imgSopra={imgSopra}
						imgSotto={imgSotto}
					/>
				) : (
					<RegisterMensa
						setUtente={setUtente}
						imgSopra={imgSopra}
						imgSotto={imgSotto}
					/>
				)}
			</div>
			<img
				src={login_sotto}
				alt=''
				// className='absolute bottom-0 left-0'
				className='w-full h-[250px]'
				ref={imgSotto}
			/>
		</div>
	);
};

export default RegisterPage;
