import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../scripts/fetch";
import { styleMap } from "../../App";

import { useTheme } from "next-themes";

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
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../shadcn/Select";

const RegisterPage = () => {
	const navigate = useNavigate();
	const { resolvedTheme } = useTheme();

	const [errore, setErrore] = useState({
		presente: false,
		messaggio: <></>,
	});

	const email = useRef(null);
	const password = useRef(null);
	const nome = useRef(null);
	const cognome = useRef(null);
	const confermaPassword = useRef(null);

	const submitRegisterCliccato = () => {
		setErrore({
			presente: false,
			messaggio: <></>,
		});

		// @ts-ignore
		const valueEmail = email.current.value;
		// @ts-ignore
		const valuePassword = password.current.value;
		// @ts-ignore
		const valueNome = nome.current.value;
		// @ts-ignore
		const valueCognome = cognome.current.value;
		// @ts-ignore
		const valueConfermaPassowrd = confermaPassword.current.value;

		let errore = false;

		if (
			valueEmail === "" ||
			valueNome === "" ||
			valueCognome === "" ||
			valuePassword === "" ||
			valueConfermaPassowrd === ""
		) {
			setErrore((prev) => ({
				presente: true,
				messaggio: (
					<>
						<>Compilare tutti i campi!</>
						<br />
					</>
				),
			}));
			errore = true;
		}

		if (valuePassword !== valueConfermaPassowrd) {
			setErrore((prev) => ({
				presente: true,
				messaggio: (
					<>
						{prev.messaggio} Password e conferma password devono corrispondere!{" "}
						<br />
					</>
				),
			}));
			errore = true;
		}

		if (!errore) {
			registerUser({
				nome: valueNome,
				cognome: valueCognome,
				email: valueEmail,
				password: valuePassword,
				confirm_password: valueConfermaPassowrd,
			}).then((res) => {
				if (res !== "Registrazione avvenuta con successo") {
					setErrore((prev) => ({
						presente: true,
						messaggio: (
							<>
								{prev.messaggio} {res}
								<br />
							</>
						),
					}));
					errore = true;
				} else {
					navigate("/login");
				}
			});
		}
	};

	return (
		<div style={css.pageLogin}>
			<div className='flex flex-col justify-between items-center my-5'>
				<Card className='w-[350px]'>
					<CardHeader>
						<CardTitle>Registrati</CardTitle>
						<CardDescription>
							Inserire i dati per la registrazione.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className='grid w-full items-center gap-4'>
							<div className='flex flex-col space-y-1.5'>
								{/* <Label htmlFor='nome'>Nome</Label> */}
								<Input
									id='nome'
									placeholder='Nome'
									type='text'
									defaultValue=''
									ref={nome}
								/>
							</div>
							<div className='flex flex-col space-y-1.5'>
								{/* <Label htmlFor='cognome'>Cognome</Label> */}
								<Input
									id='cognome'
									placeholder='Cognome'
									type='text'
									defaultValue=''
									ref={cognome}
								/>
							</div>
							<div className='flex flex-col space-y-1.5'>
								{/* <Label htmlFor='email'>Email</Label> */}
								<Input
									id='email'
									placeholder='Email'
									type='email'
									defaultValue=''
									ref={email}
								/>
							</div>
							<div className='flex flex-col space-y-1.5'>
								{/* <Label htmlFor='password'>Password</Label> */}
								<Input
									id='password'
									placeholder='Password'
									type='password'
									defaultValue=''
									ref={password}
								/>
							</div>
							<div className='flex flex-col space-y-1.5'>
								{/* <Label htmlFor='confermaPassword'>Conferma password</Label> */}
								<Input
									id='confermaPassword'
									placeholder='Conferma password'
									type='password'
									defaultValue=''
									ref={confermaPassword}
								/>
							</div>
							<div className='flex flex-col space-y-1.5'>
								{/* <Label htmlFor='selectRuolo'>Ruolo</Label> */}
								<Select>
									<SelectTrigger className='w-[180px]' id='selectRuolo'>
										<SelectValue placeholder='Ruolo' />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectItem value='apple'>Consumatore</SelectItem>
											<SelectItem value='banana'>Produttore</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							</div>
							<div className='flex flex-col space-y-1.5'>
								<p
									className={
										"text-center" + resolvedTheme === "dark"
											? "text-white"
											: "text-black"
									}
								>
									{errore.messaggio}
								</p>
							</div>
						</div>
					</CardContent>
					<CardFooter className='flex justify-between'>
						<Button variant='outline' asChild>
							<div onClick={() => navigate("/login")}>Login</div>
						</Button>
						<Button asChild>
							<div onClick={submitRegisterCliccato}>Registrati</div>
						</Button>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
};

export default RegisterPage;

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
		minHeight: "100svh",
		background: "#f5f5f5",
		overflowY: "scroll",
	},
};
