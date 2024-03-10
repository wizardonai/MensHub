import { Container, Navbar, Searchbar, Topbar } from "../components/Components";

const Homepage = ({ username }: { username: string }) => {
	return (
		<>
			<Topbar page='home' name={username} />
			<Container>
				<Searchbar />
			</Container>
			<Navbar page='home' />
		</>
	);
};

export default Homepage;
