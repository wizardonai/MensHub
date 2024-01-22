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
import { useTheme } from "next-themes";

type dataLoader = {
	refreshStorage: Function;
};

const LoginPage = () => {
	const dataIniziale: any = useLoaderData();
	const navigate = useNavigate();
	const { resolvedTheme } = useTheme();

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
					localStorage.setItem("token", JSON.stringify(res));
					localStorage.setItem("cart", JSON.stringify([]));
					refreshStorage();
					navigate("/home");
				}
			});
		}
	};

	const css: styleMap = {
		pageLogin: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",

			width: "100svw",
			height: "100svh",
			// background: "#f5f5f5",
			margin: "0",
			padding: "0",
			backgroundColor: "var(--background)",
			// background: 'transparent url("http://172.20.10.7:6969/image/sfondo.png")',
		},
	};

	return (
		<div style={css.pageLogin}>
			<div className='flex flex-col justify-center items-center'>
				<Card className='w-[350px]'>
					<CardHeader>
						<CardTitle>Login</CardTitle>
						<CardDescription>Inserire i dati di accesso.</CardDescription>
					</CardHeader>
					<CardContent>
						<div className='grid w-full items-center gap-4'>
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
