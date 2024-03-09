import { useState } from "react";
import { Container, Navbar, Topbar } from "../components/Components";
import { Button } from "../components/shadcn/Button";
import { getProfilo } from "../scripts/fetch";
import { typeProfilo } from "../utils";

const Homepage = () => {
	const [username, setUsername] = useState("");

	if (username === "") {
		getProfilo(
			JSON.parse(localStorage.getItem("token") || "{}").token || ""
		).then((res: any) => {
			setUsername(res.nome);
		});

		return <p>CARICAMENTO</p>;
	}

	return (
		<>
			<Topbar page='home' name={username} />
			<Container>
				<p>AAAA</p>
			</Container>
			<Navbar page='home' />
		</>
	);
};

export default Homepage;
