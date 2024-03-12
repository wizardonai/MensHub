import { Color, Solver, hexToRgb } from "./scripts/filterGenerator";

export const urlImg =
	(process.env.REACT_APP_HOSTNAME || "") +
	(process.env.REACT_APP_PORT || "") +
	"/image/";

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
	is_produttore: boolean;
	id_mensa: any;
};
export type typeProfilo = {
	cognome: string;
	email: string;
	exp: number;
	iat: number;
	id: number;
	nome: string;
};
export type Nullable<T> = T | null;
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

export function getFilter(resolvedTheme: string, hex: Nullable<string>) {
	let rgb: number[] = [];
	if (hex !== null) {
		rgb = hexToRgb(hex) || [255, 255, 255];
	} else {
		rgb =
			resolvedTheme === "dark"
				? hexToRgb("#fff") || [255, 255, 255]
				: hexToRgb("#000") || [255, 255, 255];
	}

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
