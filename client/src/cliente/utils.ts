export const hostnameImg =
	(process.env.REACT_APP_HOSTNAME || "") +
	(process.env.REACT_APP_PORT || "") +
	"/image/";

//cose blu
export const coloreBlu = "#30618c";
export const filterBlu =
	"invert(34%) sepia(22%) saturate(1453%) hue-rotate(166deg) brightness(91%) contrast(84%)";

//cose rosa
export const coloreRosa = "#fee9d8";

export const sleep = (delay: number) =>
	new Promise((resolve) => setTimeout(resolve, delay));

export type prodotto = {
	allergeni: string;
	categoria: string;
	descrizione: string;
	disponibile: number;
	fd: number;
	id: number;
	id_mensa: number;
	indirizzo_img: string;
	nacq: number;
	nome: string;
	prezzo: number;
};
export type typeProfilo = {
	cognome: string;
	email: string;
	exp: number;
	iat: number;
	id: number;
	nome: string;
};
