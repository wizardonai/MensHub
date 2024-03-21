import { Container, Navbar, Topbar } from "../components/Components";
import topbarProfile from "../img/topbarProfile.png";
import datiUtente from "../img/datiUtente.png";
import mensaPrefe from "../img/mensaPrefe.png";
import riscattaCodice from "../img/riscattaCodice.png";
import cronologia from "../img/cronologia.png";
import disconnetti from "../img/disconnetti.png";
import { useNavigate } from "react-router-dom";

const Elementi = ({ setLoggato }: { setLoggato: Function }) => {
	const navigate = useNavigate();

	const pagine = [
		["dati utente", datiUtente],
		["mensa preferita", mensaPrefe],
		["riscatta codice", riscattaCodice],
		["cronologia acquisti", cronologia],
		["disconnetti", disconnetti],
	];

	const gestisciClick = (index: number) => {
		if (pagine[index][0] === "disconnetti") {
			localStorage.removeItem("cart");
			localStorage.removeItem("token");
			setLoggato(false);
		} else {
			navigate(`/profile/${pagine[index][0].replace(" ", "")}`);
		}
	};

	return pagine.map((item, index) => (
		<div
			className='w-[90%] h-[80px] flex flex-row justify-center items-center rounded-3xl bg-arancioneScuro mb-3'
			key={index}
			onClick={() => gestisciClick(index)}
		>
			<p className='text-marrone text-xl capitalize w-[80%] indent-5'>
				{item[0]}
			</p>
			<div className='w-[20%]'>
				<img src={item[1]} alt='' className='w-[40px] h-[40px]' />
			</div>
		</div>
	));
};

const Profile = ({ setLoggato }: { setLoggato: Function }) => {
	return (
		<>
			<div className='h-[150px] w-full flex justify-center items-center'>
				<img src={topbarProfile} alt='topbarProfile' />
			</div>
			<Container className='h-containerProfile w-full overflow-y-scroll'>
				<div className='w-full h-full flex items-center flex-col justify-center'>
					<Elementi setLoggato={setLoggato} />
				</div>
			</Container>
			<Navbar page='profile' />
		</>
	);
};

export default Profile;
