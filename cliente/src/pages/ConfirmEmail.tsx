import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { confirmEmail } from "../scripts/fetch";
import { Button } from "../components/shadcn/Button";
import { toast } from "sonner";
import { Toaster } from "../components/shadcn/Sonner";

const ConfirmEmail = () => {
	const { token } = useParams<{ token: string }>();

	const [confermato, setConfermato] = useState(false);
	const [ok, setOk] = useState(false);
	const navigate = useNavigate();

	if (!token || token === "" || token === "undefined") {
		navigate("/login");
		return;
	}

	if (!confermato) {
		setConfermato(true);
		confirmEmail(token).then((res: any) => {
			if (res === "Email confermata") {
				setOk(true);
				return;
			}
			setOk(false);
			toast.error(res);
		});
	}

	return (
		<>
			<div className='flex flex-col w-full h-full animate-showElement justify-center items-center '>
				{ok ? (
					<div className='flex flex-col items-center justify-evenly h-1/2'>
						<p className='text-3xl text-marrone'>Email confermata</p>
						<p className='text-2xl text-marrone'>
							Ora puoi effettuare il login
						</p>
						<Button
							onClick={() => {
								localStorage.setItem("login", "1");
								navigate("/login");
							}}
							variant='avanti'
							className='p-8 text-2xl  rounded-lg mt-4'
						>
							Login
						</Button>
					</div>
				) : (
					"Caricamento..."
				)}
			</div>
			<Toaster richColors />
		</>
	);
};

export default ConfirmEmail;
