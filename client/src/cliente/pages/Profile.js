import { useLoaderData, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Topbar from "./components/Topbar";

function Profile() {
	const data = useLoaderData();
	const navigate = useNavigate();

	if (!data) return <p>Caricamento</p>;

	const { hostname, refreshStorage } = data;

	let dati;

	if (localStorage.getItem("datiUtente") !== undefined) {
		dati = JSON.parse(localStorage.getItem("datiUtente"));
	}

	const disconnect = () => {
		localStorage.setItem("login", "no");
		localStorage.removeItem("datiUtente");
		localStorage.removeItem("cart");
		refreshStorage();
		navigate("/login");
	};

	return (
		<div className='page'>
			<Topbar titolo={"Ciao " + dati.nome} />
			<div className='container' style={css.containerProfileTmp}>
				<div onClick={disconnect} style={css.divDisconnetti}>
					<img src={hostname + "logout.png"} alt='' style={css.disconettiImg} />
					<p>Disconnettiti</p>
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

const css = {
	containerProfileTmp: {
		display: "flex",
		alignItems: "center",
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
