import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

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
		<div style={css.pageLogin}>
			<div style={css.schedaFormLogin}>
				<div style={css.divh1}>
					<h1>Login</h1>
				</div>
				<div style={css.formLogin} method='get'>
					<input
						type='email'
						placeholder='Email'
						name='email'
						ref={email}
						style={css.formLoginInput}
					/>
					<input
						type='password'
						placeholder='Password'
						name='password'
						ref={password}
						style={css.formLoginInput}
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
						id='submit'
						onClick={submitLoginCliccato}
						style={
							!errore.presente
								? { ...css.formLoginSubmit, marginTop: "15px" }
								: { ...css.formLoginSubmit, marginTop: "0px" }
						}
					>
						Login
					</button>
				</div>
				<div
					style={css.linkLogin}
					onClick={() => {
						navigate("/register");
					}}
				>
					<p>Non hai un account? Registrati!</p>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;

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
	schedaFormLogin: {
		width: "80svw",
		height: "350px",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
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
	formLogin: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		height: "70%",
	},
	formLoginInput: {
		margin: "0 0 5px 0",
		textAlign: "center",
		fontSize: "20px",
		padding: "5px",
		borderRadius: "15px",
		outline: "none",
		border: "1px solid darkgray",
		width: "90%",
		height: "25px",
	},
	formLoginSubmit: {
		textAlign: "center",
		fontSize: "20px",
		padding: "5px",
		borderRadius: "15px",
		outline: "none",
		backgroundColor: "green",
		color: "white",
		border: "0",
		width: "50%",
		height: "50px",
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
	linkLogin: {
		height: "5%",
		marginBottom: "10px",
		fontSize: "17px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
};
