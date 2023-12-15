import "./css/LoginPage.css";
import { useState } from "react";
import { useRef } from "react";

const LoginPage = () => {
	const [errore, setErrore] = useState({
		presente: false,
		messaggio: <></>,
	});

	const email = useRef(null);
	const password = useRef(null);

	const submitLoginCliccato = () => {
		setErrore({
			presente: false,
			messaggio: <></>,
		});

		const valueEmail = email.current.value;
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
			//mando i dati al server
		}
	};

	return (
		<div className='pageLogin'>
			<div className='schedaForm'>
				<div id='divh1'>
					<h1>Login</h1>
				</div>
				<div id='formLogin' method='get'>
					<input type='email' placeholder='Email' name='email' ref={email} />
					<input
						type='password'
						placeholder='Password'
						name='password'
						ref={password}
					/>
					<div
						className='errore'
						style={errore.presente ? { display: "flex" } : { display: "none" }}
					>
						<p className='messaggioErrore'>{errore.messaggio}</p>
					</div>
					<button id='submit' onClick={submitLoginCliccato}>
						Login
					</button>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
