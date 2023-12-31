import { Colori } from "../../../App";

const BottomButton = ({ text, onClickFun, display }) => {
	const css = {
		pulsanteFixatoInBasso: {
			backgroundColor: "transparent",
			height: "40px",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			flexDirection: "row",
			width: "100%",
			borderRadius: "15px",
			position: "absolute",
			bottom: "calc(10svh)",
		},
		pulsanteFixatoInBassoDiv: {
			height: "100%",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			// border: "2px solid black",
			fontWeight: "bold",
			// backgroundColor: "#222",
			backgroundColor: Colori.primario,
			color: "#fff",
			fontSize: "16px",
			textTransform: "uppercase",
			width: "60%",
			borderRadius: "15px",
		},
	};

	return (
		<div
			style={
				display === "none"
					? { ...css.pulsanteFixatoInBasso, display: "none" }
					: css.pulsanteFixatoInBasso
			}
		>
			<div style={css.pulsanteFixatoInBassoDiv} onClick={onClickFun}>
				{text}
			</div>
		</div>
	);
};

export default BottomButton;
