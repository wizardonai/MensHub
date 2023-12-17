import { useRef, useState } from "react";
import "./css/RegisterPage.css";
import { registerUser } from "../scripts/fetch";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
	const navigate = useNavigate();

	const [errore, setErrore] = useState({
		presente: false,
		messaggio: <></>,
	});

	const email = useRef(null);
	const password = useRef(null);
	const nome = useRef(null);
	const cognome = useRef(null);
	const confermaPassword = useRef(null);

	const submitLoginCliccato = () => {
		setErrore({
			presente: false,
			messaggio: <></>,
		});

		const valueEmail = email.current.value;
		const valuePassword = password.current.value;
		const valueNome = nome.current.value;
		const valueCognome = cognome.current.value;
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
		<div className='pageLogin'>
			<div id='schedaFormRegister'>
				<div id='divh1'>
					<h1>Registrati</h1>
				</div>
				<div id='formRegister' method='get'>
					<input type='text' placeholder='Nome' name='nome' ref={nome} />
					<input
						type='text'
						placeholder='Cognome'
						name='cognome'
						ref={cognome}
					/>
					<input type='email' placeholder='Email' name='email' ref={email} />
					<input
						type='password'
						placeholder='Password'
						name='password'
						ref={password}
					/>
					<input
						type='password'
						placeholder='Conferma password'
						name='password'
						ref={confermaPassword}
					/>
					<div
						className='errore'
						style={errore.presente ? { display: "flex" } : { display: "none" }}
					>
						<p className='messaggioErrore'>{errore.messaggio}</p>
					</div>
					<button
						id='submit'
						onClick={submitLoginCliccato}
						style={
							!errore.presente ? { marginTop: "15px" } : { marginTop: "0px" }
						}
					>
						Registrati
					</button>
				</div>
				<div id='linkRegister'>
					<a href='/login'>Hai già un account? Loggati!</a>
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;
