import { useLoaderData, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Topbar from "./components/Topbar";
import { styleMap, hostname } from "../../App";
import { ModeToggle } from "src/shadcn/Modetoggle";
import { useEffect, useState } from "react";
import { getProfilo } from "../scripts/fetch";

export type typeProfilo = {
	cognome: string;
	email: string;
	exp: number;
	iat: number;
	id: number;
	nome: string;
};

function Profile() {
	const data: any = useLoaderData();
	const navigate = useNavigate();
	const [dati, setDati] = useState({ nome: "caricamento" } as typeProfilo);

	useEffect(() => {
		getProfilo(JSON.parse(localStorage.getItem("token") || "{}").token).then(
			(res: any) => {
				if (res.name === "TokenExpiredError") disconnect();
				else setDati(res);
			}
		);
	}, []);

	if (!data) return <p>Caricamento</p>;

	const { refreshStorage } = data;

	const disconnect = () => {
		localStorage.setItem("login", "no");
		localStorage.removeItem("token");
		localStorage.removeItem("cart");
		refreshStorage();
		navigate("/login");
	};

	return (
		<div className='page'>
			<Topbar titolo={"Ciao " + dati.nome} daDoveArrivo='' />
			<div
				className='containerPage  overflow-y-scroll'
				style={css.containerProfileTmp}
			>
				<div style={css.divElemento}>
					<p>Dati personali</p>
				</div>
				<div style={css.divElemento}>
					<p>Mensa preferita</p>
				</div>
				<div style={css.divElemento}>
					<p>Riscatta codice</p>
				</div>
				<div style={css.divElemento}>
					<p>Cronologia acquisti</p>
				</div>
				<div style={css.divElemento}>
					<p>Aspetto</p>
					<ModeToggle />
				</div>
				<div onClick={disconnect} style={css.divElemento}>
					<img src={hostname + "logout.png"} alt='' style={css.disconettiImg} />
					<p>Logout</p>
				</div>
				<div style={css.divElemento} className='mb-5'>
					<p>Elimina account</p>
				</div>
			</div>
			<Navbar page='profile' />
		</div>
	);
}

export default Profile;

//
//
// stili
//

const css: styleMap = {
	containerProfileTmp: {
		display: "flex",
		alignItems: "center",
		flexDirection: "column",
	},
	disconettiImg: {
		/*filter:
			"invert(94%) sepia(100%) saturate(0%) hue-rotate(146deg) brightness(105%) contrast(106%)",*/
		width: "20px",
		height: "20px",
	},
	divElemento: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		padding: "5px",
		height: "30svh",
		borderRadius: "11px",
		width: "90svw",
		marginTop: "20px",
		boxShadow:
			//resolvedTheme === "light"
			//?
			"3px 3px 17px -3px rgba(0, 0, 0, 0.30)",
		//: "3px 3px 17px -3px rgba(255, 255, 255, 0.1)",
	},
};
