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
		getProfilo(JSON.parse(localStorage.getItem("token") as string).token).then(
			(res: typeProfilo) => {
				setDati(res);
			}
		);
	}, []);

	if (!data) return <p>Caricamento</p>;

	const { refreshStorage } = data;

	const disconnect = () => {
		localStorage.setItem("login", "no");
		localStorage.removeItem("datiUtente");
		localStorage.removeItem("cart");
		refreshStorage();
		navigate("/login");
	};

	return (
		<div className='page'>
			<Topbar titolo={"Ciao " + dati.nome} daDoveArrivo='' />
			<div className='containerPage' style={css.containerProfileTmp}>
				<div onClick={disconnect} style={css.divDisconnetti} className='ml-4'>
					<img src={hostname + "logout.png"} alt='' style={css.disconettiImg} />
					<p>Disconnettiti</p>
				</div>
				<div className='w-[100px] flex flex-row items-center justify-evenly mt-8 ml-4'>
					<p>Tema: </p>
					<ModeToggle />
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
		alignItems: "flex-start",
		flexDirection: "column",
	},
	divDisconnetti: {
		backgroundColor: "#ff0000",
		color: "white",
		fontWeight: "bold",
		width: "170px",
		height: "60px",
		borderRadius: "15px",
		fontSize: "20px",
		display: "flex",
		justifyContent: "space-evenly",
		alignItems: "center",
	},
	disconettiImg: {
		filter:
			"invert(94%) sepia(100%) saturate(0%) hue-rotate(146deg) brightness(105%) contrast(106%)",
		width: "20px",
		height: "20px",
	},
};
