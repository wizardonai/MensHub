import "./css/LoginPage.css";
import { useState, useTransition } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { loginUser } from "../scripts/fetch";

const LoginPage = ({ refreshStorage }) => {
	const navigate = useNavigate();

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
					refreshStorage();
					navigate("/home");
				}
			});
		}
	};

	return (
		<div className='pageLogin'>
			<div id='schedaFormLogin'>
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
					<button
						id='submit'
						onClick={submitLoginCliccato}
						style={
							!errore.presente ? { marginTop: "15px" } : { marginTop: "0px" }
						}
					>
						Login
					</button>
				</div>
				<div id='linkLogin'>
					<a href='/register'>Non hai un account? Registrati!</a>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
