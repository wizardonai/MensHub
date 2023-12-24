import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../scripts/fetch";

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
		<div style={css.pageLogin}>
			<div style={css.schedaFormRegister}>
				<div style={css.divh1}>
					<h1>Registrati</h1>
				</div>
				<div style={css.formRegister} method='get'>
					<input
						type='text'
						placeholder='Nome'
						name='nome'
						ref={nome}
						style={css.formRegisterInput}
					/>
					<input
						type='text'
						placeholder='Cognome'
						name='cognome'
						ref={cognome}
						style={css.formRegisterInput}
					/>
					<input
						type='email'
						placeholder='Email'
						name='email'
						ref={email}
						style={css.formRegisterInput}
					/>
					<input
						type='password'
						placeholder='Password'
						name='password'
						ref={password}
						style={css.formRegisterInput}
					/>
					<input
						type='password'
						placeholder='Conferma password'
						name='password'
						ref={confermaPassword}
						style={css.formRegisterInput}
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
						onClick={submitLoginCliccato}
						style={
							!errore.presente
								? { ...css.formRegisterSubmit, marginTop: "15px" }
								: { ...css.formRegisterSubmit, marginTop: "0px" }
						}
					>
						Registrati
					</button>
				</div>
				<div
					style={css.linkRegister}
					onClick={() => {
						navigate("/login");
					}}
				>
					<p style={css.linkLoginP}>Hai già un account? Accedi!</p>
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;

//
//
// stili
//

const css = {
	pageLogin: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "100svw",
		height: "100svh",
		background: "#f5f5f5",
	},
	schedaFormRegister: {
		width: "80svw",
		height: "460px",
		maxWidth: "350px",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "space-evenly",
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
	formRegister: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		height: "70%",
	},
	formRegisterInput: {
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
	formRegisterSubmit: {
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
	linkRegister: {
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
