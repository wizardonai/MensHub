import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Topbar from "./components/Topbar";

function Profile({ refreshStorage }) {
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
			<div className='container'>
				{dati.nome} {dati.cognome}
				<div
					onClick={disconnect}
					style={{ width: "100px", height: "100px", border: "1px solid black" }}
				>
					<p>Disconnettiti</p>
				</div>
			</div>
			<Navbar page='profile' />
		</div>
	);
}

export default Profile;
