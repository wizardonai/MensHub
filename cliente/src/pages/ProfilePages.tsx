import { useLoaderData } from "react-router-dom";
import { typeProfilo } from "../utils";
import { useEffect } from "react";

const DatiUtentePage = () => {
	return <p>dati utente</p>;
};
const MensaPreferitaPage = () => {
	return <p>mensa preferita</p>;
};
const RiscattaCodicePage = () => {
	return <p>riscatta codice</p>;
};
const CronologiaAcquistiPage = () => {
	return <p>cronologia acquisti</p>;
};
const DisconnettiPage = () => {
	return <p>disconnetti</p>;
};

const ProfilePages = () => {
	const page: any = useLoaderData();
	const pagine = [
		"datiutente",
		"mensapreferita",
		"riscattacodice",
		"cronologiaacquisti",
		"disconnetti",
	];

	if (!page) return <p>CARICAMENTO</p>;

	switch (page) {
		case pagine[0]:
			return <DatiUtentePage />;
		case pagine[1]:
			return <MensaPreferitaPage />;
		case pagine[2]:
			return <RiscattaCodicePage />;
		case pagine[3]:
			return <CronologiaAcquistiPage />;
		case pagine[4]:
			return <DisconnettiPage />;
		default:
			return <p>PAGINA NON TROVATA!</p>;
	}
};

export default ProfilePages;
