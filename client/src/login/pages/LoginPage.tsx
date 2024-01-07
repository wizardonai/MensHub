import { useState, useRef } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

import { loginUser } from "../scripts/fetch";
import { styleMap } from "../../App";

//shadcn
import { Button } from "../../shadcn/Button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../../shadcn/Card";
import { Input } from "../../shadcn/Input";
import { Label } from "../../shadcn/Label";

type dataLoader = {
	refreshStorage: Function;
};

const LoginPage = () => {
	const dataIniziale: any = useLoaderData();
	const navigate = useNavigate();

	const [errore, setErrore] = useState({
		presente: false,
		messaggio: <></>,
	});
	const email = useRef(null);
	const password = useRef(null);

	if (!dataIniziale) return <p>Caricamento</p>;

	let data: dataLoader = dataIniziale;
	const { refreshStorage } = data;

	const submitLoginCliccato = () => {
		setErrore({
			presente: false,
			messaggio: <></>,
		});

		// @ts-ignore
		const valueEmail = email.current.value;
		// @ts-ignore
		const valuePassword = password.current.value;

		let errore = false;

		if (valueEmail === "") {
			setErrore((prev) => ({
				presente: true,
				messaggio: (
					<>
						<>Inserire l'email!</>
						<br />
					</>
				),
			}));
			errore = true;
		}

		if (valuePassword === "") {
			setErrore((prev) => ({
				presente: true,
				messaggio: (
					<>
						{prev.messaggio} Inserire la password! <br />
					</>
				),
			}));
			errore = true;
		}

		if (!errore) {
			loginUser({ email: valueEmail, password: valuePassword }).then((res) => {
				if (typeof res === "string") {
					setErrore((prev) => ({
						presente: true,
						messaggio: (
							<>
								{prev.messaggio} {res} <br />
							</>
						),
					}));
					errore = true;
				} else {
					localStorage.setItem("login", "cliente");
					localStorage.setItem("datiUtente", JSON.stringify(res));
					localStorage.setItem("cart", JSON.stringify([]));
					refreshStorage();
					navigate("/home");
				}
			});
		}
	};

	return (
		<div style={css.pageLogin}>
			{/*
			<div style={css.schedaFormLogin}>
				<div style={css.schedaFormDivh1}>
					<p style={css.titoloForm}>Login</p>
				</div>
				<div style={css.formLogin}>
					<input
						type='email'
						placeholder='Email'
						name='email'
						ref={email}
						style={css.formLoginInput}
					/>
					<input
						type='password'
						placeholder='Password'
						name='password'
						ref={password}
						style={css.formLoginInput}
					/>
					<div
						style={
							errore.presente
								? { ...css.errore, display: "flex" }
								: { ...css.errore, display: "none" }
						}
					>
						<p style={css.messaggioErrore}>{errore.messaggio}</p>
					</div>
					<button
						id='submit'
						onClick={submitLoginCliccato}
						style={
							!errore.presente
								? { ...css.formLoginSubmit, marginTop: "15px" }
								: { ...css.formLoginSubmit, marginTop: "0px" }
						}
					>
						Login
					</button>
				</div>
				<div
					style={css.linkLogin}
					onClick={() => {
						navigate("/register");
					}}
				>
					<p style={css.linkLoginP}>Non hai un account? Registrati!</p>
				</div>
			</div>
				*/}
			<div className='flex flex-col justify-between items-center'>
				<Card className='w-[350px]'>
					<CardHeader>
						<CardTitle>Login</CardTitle>
						<CardDescription>Inserire i dati di accesso.</CardDescription>
					</CardHeader>
					<CardContent>
						<div className='grid w-full items-center gap-4'>
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='email'>Email</Label>
								<Input
									id='email'
									placeholder='Email'
									type='email'
									defaultValue=''
									ref={email}
								/>
							</div>
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='password'>Password</Label>
								<Input
									id='password'
									placeholder='Password'
									type='password'
									defaultValue=''
									ref={password}
								/>
							</div>
							<div className='flex flex-col space-y-1.5'>
								<p className='text-center text-white'>{errore.messaggio}</p>
							</div>
						</div>
					</CardContent>
					<CardFooter className='flex justify-between'>
						<Button variant='outline' asChild>
							<div onClick={() => navigate("/register")}>Registrati</div>
						</Button>
						<Button asChild>
							<div onClick={submitLoginCliccato}>Login</div>
						</Button>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
};

export default LoginPage;

//
//
// stili
//

const css: styleMap = {
	pageLogin: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",

		width: "100svw",
		height: "100svh",
		background: "#f5f5f5",
	},
	schedaFormLogin: {
		width: "80svw",
		height: "350px",
		maxWidth: "350px",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: "28px",
		background: "#f5f5f5",
		boxShadow: "12px 12px 24px #c5c5c5, -12px -12px 24px #fbfbfb",
	},
	schedaFormDivh1: {
		textAlign: "center",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "20%",
		marginTop: "15px",
	},
	titoloForm: {
		fontSize: "34px",
		fontWeight: "bold",
	},
	formLogin: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		height: "70%",
	},
	formLoginInput: {
		margin: "0 0 5px 0",
		textAlign: "center",
		fontSize: "20px",
		padding: "5px",
		borderRadius: "15px",
		outline: "none",
		border: "2px solid black",
		width: "90%",
		height: "25px",
	},
	formLoginSubmit: {
		textAlign: "center",
		fontSize: "20px",
		padding: "5px",
		borderRadius: "15px",
		outline: "none",
		color: "black",
		fontWeight: "bold",
		width: "50%",
		height: "50px",
		border: "2px solid black",
		background: "rgb(245, 245, 245)",
	},
	errore: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		width: "90%",
		margin: "15px 0 5px 0",
	},
	messaggioErrore: {
		color: "red",
		fontWeight: "bold",
		textAlign: "center",
		width: "100%",
	},
	linkLogin: {
		height: "5%",
		marginBottom: "10px",
		fontSize: "17px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	linkLoginP: {
		color: "black",
		textDecoration: "underline",
	},
};
