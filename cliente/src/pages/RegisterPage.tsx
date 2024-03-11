import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../scripts/fetch";

import { Button } from "../components/shadcn/Button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../components/shadcn/Card";
import { Input } from "../components/shadcn/Input";
import { dataReg } from "../utils";

const RegisterPage = () => {
	const navigate = useNavigate();

	const [error, setError] = useState("");

	const [data, setData] = useState({
		nome: "",
		cognome: "",
		email: "",
		password: "",
		confirm_password: "",
		id_mensa: 1,
		is_produttore: false,
	} as dataReg);

	const submitRegisterCliccato = () => {
		setError("");

		if (
			data.email === "" ||
			data.nome === "" ||
			data.cognome === "" ||
			data.password === "" ||
			data.confirm_password === ""
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
		<div className='flex justify-center items-center w-svw min-h-svh overflow-y-scroll'>
			<div className='flex flex-col justify-between items-center my-5'>
				<Card className='w-[350px]'>
					<CardHeader>
						<CardTitle>Registrati</CardTitle>
						<CardDescription>
							Inserire i data per la registrazione.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className='grid w-full items-center gap-4'>
							<div className='flex flex-col space-y-1.5'>
								<Input
									id='nome'
									placeholder='Nome'
									type='text'
									onChange={(e) => {
										setData({ ...data, nome: e.target.value });
									}}
								/>
							</div>
							<div className='flex flex-col space-y-1.5'>
								<Input
									id='cognome'
									placeholder='Cognome'
									type='text'
									onChange={(e) => {
										setData({ ...data, cognome: e.target.value });
									}}
								/>
							</div>
							<div className='flex flex-col space-y-1.5'>
								<Input
									id='email'
									placeholder='Email'
									type='email'
									onChange={(e) => {
										setData({ ...data, email: e.target.value });
									}}
								/>
							</div>
							<div className='flex flex-col space-y-1.5'>
								<Input
									id='password'
									placeholder='Password'
									type='password'
									onChange={(e) => {
										setData({ ...data, password: e.target.value });
									}}
								/>
							</div>
							<div className='flex flex-col space-y-1.5'>
								<Input
									id='confermaPassword'
									placeholder='Conferma password'
									type='password'
									onChange={(e) => {
										setData({ ...data, confirm_password: e.target.value });
									}}
								/>
							</div>
							<div className='flex flex-col space-y-1.5'>
								<p>{error}</p>
							</div>
						</div>
					</CardContent>
					<CardFooter className='flex justify-between'>
						<Button variant='outline' onClick={() => navigate("/login")}>
							Login
						</Button>
						<Button onClick={submitRegisterCliccato}>Registrati</Button>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
};

export default RegisterPage;
