export const hostnameImg =
	(process.env.REACT_APP_HOSTNAME || "") +
	(process.env.REACT_APP_IMG_PORT || "") +
	"/image/";

//cose blu
export const coloreBlu = "#30618c";
export const filterBlu =
	"invert(34%) sepia(22%) saturate(1453%) hue-rotate(166deg) brightness(91%) contrast(84%)";

//cose rosa
export const coloreRosa = "#fee9d8";

export const sleep = (delay: number) =>
	new Promise((resolve) => setTimeout(resolve, delay));
