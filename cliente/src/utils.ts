import { Color, Solver, hexToRgb } from "./scripts/filterGenerator";

export const urlImg = (process.env.REACT_APP_URL || "") + "/image/";

export type Nullable<T> = T | null;

export type dataLog = {
	email: string;
	password: string;
};
export type dataReg = {
	nome: string;
	cognome: string;
	email: string;
	password: string;
	confirm_password: string;
	cliente: boolean;
	id_mensa: any;
};
export type dataMensa = {
	nome: string;
	email: string;
	telefono: string;
	regione: string;
	provincia: string;
	comune: string;
	cap: number;
	indirizzo: string;
};

export type typeProfilo = {
	cognome: string;
	email: string;
	exp: number;
	iat: number;
	id: number;
	id_mensa: number;
	nome: string;
};
export type ordine = {
	data: string;
	id_ordine: number;
	prodotti: Array<{
		id: number;
		quantita: number;
	}>;
	stato_ordine: string;
};

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
type quantita = { quantita: number };
export type prodottoCarrello = prodotto & quantita;

export type mensa = {
	id: number;
	indirizzo: string;
	nome: string;
};

export function getFilter(hex: string) {
	let rgb: number[] = [];
	rgb = hexToRgb(hex) || [255, 255, 255];

	let result: {
		values: any;
		loss: number;
		filter: string;
	} = {
		loss: 100,
		values: "a",
		filter: "a",
	};

	while (result.loss >= 1) {
		const color = new Color(rgb[0], rgb[1], rgb[2]);
		const solver = new Solver(color);
		result = solver.solve();
	}

	return result.filter.replace("filter: ", "").replace(";", "");
}

export const sleep = (delay: any) =>
	new Promise((resolve) => setTimeout(resolve, delay));
