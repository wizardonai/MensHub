import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Topbar from "./components/Topbar";

function Profile({ refreshStorage, hostname }) {
	const navigate = useNavigate();

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
		width: "150px",
		padding: "15px",
		borderRadius: "15px",
		fontSize: "20px",
		display: "flex",
		justifyContent: "space-between",
	},
	disconettiImg: {
		filter:
			"invert(94%) sepia(100%) saturate(0%) hue-rotate(146deg) brightness(105%) contrast(106%)",
		width: "20px",
	},
};
