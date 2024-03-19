import { Container, Navbar, Topbar } from "../components/Components";
import topbarProfile from "../img/topbarProfile.svg";

const Profile = ({ setLoggato }: { setLoggato: Function }) => {
	return (
		<>
			<div className='h-[150px] w-full flex justify-center items-center'>
				<img src={topbarProfile} alt='topbarProfile' />
			</div>
			<Container className='h-containerProfile w-full overflow-y-scroll'>
				<p>AAAA</p>
			</Container>
			<Navbar page='profile' />
		</>
	);
};

export default Profile;
