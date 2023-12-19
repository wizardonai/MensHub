import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Topbar from "./components/Topbar";
import { useState } from "react";

function Profile({ refreshStorage }) {
	const navigate = useNavigate();

	const [dati, setDati] = useState(
		JSON.parse(localStorage.getItem("datiUtente"))
	);

	const disconnect = () => {
		localStorage.setItem("login", "no");
		refreshStorage();
		navigate("/login");
	};

	return (
		<div className='page'>
			<Topbar page='profile' />
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
