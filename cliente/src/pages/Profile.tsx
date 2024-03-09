import { Container, Navbar, Topbar } from "../components/Components";

const Profile = ({ setLoggato }: { setLoggato: Function }) => {
	return (
		<>
			<Topbar page='home' name='' />
			<Container>
				<p>AAAA</p>
			</Container>
			<Navbar page='profile' />
		</>
	);
};

export default Profile;
