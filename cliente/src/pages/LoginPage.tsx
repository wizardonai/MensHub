import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../scripts/fetch";

//shadcn
import { Input } from "../components/shadcn/Input";
import { Nullable, dataLog, sleep } from "../utils";
import { Label } from "../components/shadcn/Label";

import login_sopra from "../img/login_sopra.png";
import login_sotto from "../img/login_sotto.png";

const LoginPage = ({ setLoggato }: { setLoggato: Function }) => {
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

	return (
		<div className='flex justify-center items-center w-svw h-svh m-0 p-0 flex-col'>
			<img src={login_sopra} alt='' className='w-full h-[30%]' />

			<div
				className='flex flex-col justify-center items-center h-[40%]'
				ref={div}
			>
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
						<p
							className='text-marrone text-sm underline'
							onClick={() => {
								//@ts-ignore
								div.current.attributes.class.value += " animate-hideElement";
								sleep(900).then(() => {
									//@ts-ignore
									div.current.attributes.class.value =
										//@ts-ignore
										div.current.attributes.class.value.replace(
											" animate-hideElement",
											""
										);
									navigate("/register");
								});
							}}
						>
							Registrati
						</p>
					</div>
					<div className='flex flex-col space-y-1.5'>
						<p>{error}</p>
					</div>
				</div>
				<button
					onClick={submitLoginCliccato}
					className='w-3/4 bg-marrone p-2 text-biancoLatte rounded-3xl'
				>
					Accedi
				</button>
			</div>
			<img src={login_sotto} alt='' className='w-full h-[30%]' />
		</div>
	);
};

export default LoginPage;
