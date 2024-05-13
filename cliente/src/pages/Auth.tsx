import { useLocalStorage } from "usehooks-ts";

import imgSopra from "../img/sopra_benvenuto.png";
import imgSotto from "../img/sotto_login.png";
import { Button } from "../components/shadcn/Button";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dataLog, sleep } from "../utils";
import { loginUser } from "../scripts/fetch";
import { Label } from "@radix-ui/react-label";
import { Input } from "../components/shadcn/Input";
import { RegisterCliente, RegisterMensa, SceltaUtente } from "./RegisterPage";

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

	const [error, setError] = useState("");

	const [data, setData] = useState({
		email: "",
		password: "",
	} as dataLog);

	const div = useRef(null);

	const submitLoginCliccato = () => {
		setError("");

		if (data.email === "" || data.password === "") {
			setError("Compilare tutti i campi!");
			return;
		}

		if (!error) {
			loginUser(data).then((res: any) => {
				if (typeof res === "string") {
					setError(res);
					return;
				} else {
					localStorage.setItem("token", res.token);
					localStorage.setItem("cart", JSON.stringify([]));
					setLoggato(true);
				}
			});
		}
	};

	useEffect(() => {
		animazioniImmagini(45, 5, window.innerHeight);
	}, []);

	return (
		<div className='flex flex-col justify-center items-center h-full' ref={div}>
			<div className='grid w-full items-center gap-4'>
				<div className='flex flex-col space-y-1.5'>
					<Label htmlFor='email' className='text-marrone font-bold'>
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
				<div className='flex flex-col space-y-1.5'>
					<Label htmlFor='password' className='text-marrone font-bold'>
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
				<div className='flex flex-col space-y-1.5'>
					<p
						className='text-marrone text-sm underline'
						onClick={() => navigate("/")}
					>
						Password dimenticata?
					</p>
				</div>
				<div className='flex flex-col space-y-1.5'>
					<p className='text-red'>{error}</p>
				</div>
			</div>
			<div className='flex flex-row w-full'>
				<Button
					variant='indietro'
					className='w-1/2 rounded-3xl mr-1'
					onClick={() => {
						animazioniImmagini(0, 15, window.innerHeight);

						//@ts-ignore
						div.current.classList.add("animate-hideElement");

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
	);
};
const Register = ({
	animazioniImmagini,
	setLogin,
}: {
	animazioniImmagini: Function;
	setLogin: Function;
}) => {
	const [utente, setUtente] = useState("?");
	const div = useRef(null);

	return (
		<div
			className='flex flex-col justify-center items-center h-full animate-showElement'
			ref={div}
		>
			{utente === "?" ? (
				<SceltaUtente
					setUtente={setUtente}
					setLogin={setLogin}
					animazioniImmagini={animazioniImmagini}
				/>
			) : utente === "cliente" ? (
				<RegisterCliente
					setUtente={setUtente}
					animazioniImmagini={animazioniImmagini}
				/>
			) : (
				<RegisterMensa setUtente={setUtente} />
			)}
			{/* <div className='flex flex-row w-full'>
				<Button
					variant='indietro'
					className='w-1/2 rounded-3xl mr-1'
					onClick={() => {
						animazioniImmagini(0, 15, window.innerHeight);

						//@ts-ignore
						div.current.classList.remove("animate-showElement");
						//@ts-ignore
						div.current.classList.add("animate-hideElement");

						sleep(900).then(() => {
							setLogin("?");
						});
					}}
				>
					Indietro
				</Button>
				<button className='w-1/2 bg-marrone p-2 text-biancoLatte rounded-3xl'>
					Accedi
				</button>
			</div> */}
		</div>
	);
};

const Auth = ({ setLoggato }: { setLoggato: Function }) => {
	const [login, setLogin] = useLocalStorage("login", "?");

	const [images, setImages] = useState([useRef(null), useRef(null)]);
	const divBenvenuto = useRef(null);
	const divBottoni = useRef(null);

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
				<p className='text-marrone text-5xl font-bold'>Benvenuto in Menshub</p>
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
						animazioniImmagini(45, 5, window.innerHeight);
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
					/>
				)}
			</div>
			<img
				src={imgSotto}
				alt=''
				className='absolute bottom-[-15svh] z-[-2] transition-[bottom] duration-1000 ease-in-out'
				ref={images[1]}
			/>
		</div>
	);
};

export default Auth;
