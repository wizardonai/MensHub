import { useNavigate } from "react-router-dom";
import { prodotto } from "../Homepage";
import { styleMap } from "../../../App";
import { useTheme } from "next-themes";

type parametri = {
	item: prodotto;
	daDoveArrivo: string;
	index: number;
};

const ListElement = ({ item, daDoveArrivo, index }: parametri) => {
	const navigate = useNavigate();
	const { resolvedTheme } = useTheme();

	const css: styleMap = {
		elemento: {
			margin: "10px 0",
			height: "180px",
			width: "180px",
			minWidth: "180px",
			display: "flex",
			flexDirection: "column",
			borderRadius: "15px",
			boxShadow:
				resolvedTheme === "light"
					? "3px 3px 17px -3px rgba(0, 0, 0, 0.56)"
					: "3px 3px 17px -3px rgba(255, 255, 255, 0.1)",
			border:
				resolvedTheme === "light" ? "0" : "1px solid rgba(255, 255, 255, 0.1)",
		},
		divImmagineElemento: {
			height: "145px",
			//height: "40svw",
			//maxHeight: "140px",
			width: "100%",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
		},
		divImmagineElementoImg: {
			width: "145px",
			height: "145px",
			borderRadius: "15px",
		},
		divNomeElemento: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			width: "100%",
			height: "25px",
		},
		nomeElemento: {
			textAlign: "center",
			fontSize: "18px",
			fontWeight: "bold",
			textTransform: "capitalize",
			textOverflow: "ellipsis",
			width: "85%",
			height: "100%",
			whiteSpace: "nowrap",
			overflow: "hidden",
		},
	};

	return (
		<div
			style={css.elemento}
			onClick={() => {
				navigate("/product/" + item.id + "?daDoveArrivo=" + daDoveArrivo);
			}}
			key={index}
		>
			<div style={css.divImmagineElemento}>
				<img
					src={item.indirizzo_img}
					alt=''
					style={css.divImmagineElementoImg}
				/>
			</div>
			<div style={css.divNomeElemento}>
				<p style={css.nomeElemento}>{item.nome}</p>
			</div>
		</div>
	);
};

export default ListElement;
