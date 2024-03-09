export const topbarH = 10;
export const navbarH = 10;

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
