import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../scripts/fetch";

//shadcn
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
import { dataLog } from "../utils";

const LoginPage = ({ setLoggato }: { setLoggato: Function }) => {
	const navigate = useNavigate();

	const [error, setError] = useState("");

	const [data, setData] = useState({
		email: "",
		password: "",
	} as dataLog);

	const submitLoginCliccato = () => {
		setError("");

		if (data.email === "" || data.password === "") {
			setError("Compilare tutti i campi!");
			return;
		}

		if (!error) {
			loginUser(data).then((res) => {
				if (typeof res === "string") {
					setError(res);
					return;
				} else {
					// localStorage.setItem("loggato", "true");
					localStorage.setItem("token", JSON.stringify(res));
					localStorage.setItem("cart", JSON.stringify([]));
					setLoggato(true);

					window.dispatchEvent(new Event("storage"));
					// navigate("/home");
				}
			});
		}
	};

	return (
		<div className='flex justify-center items-center w-svw h-svh m-0 p-0'>
			<div className='flex flex-col justify-center items-center'>
				<Card className='w-[350px]'>
					<CardHeader>
						<CardTitle>Login</CardTitle>
						<CardDescription>Inserire i data di accesso.</CardDescription>
					</CardHeader>
					<CardContent>
						<div className='grid w-full items-center gap-4'>
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
								<p>{error}</p>
							</div>
						</div>
					</CardContent>
					<CardFooter className='flex justify-between'>
						<Button variant='outline' onClick={() => navigate("/register")}>
							Registrati
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
