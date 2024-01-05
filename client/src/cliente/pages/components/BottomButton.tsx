import { Colori } from "../../../App";
import { styleMap } from "../../../App";

const BottomButton = ({
	text,
	onClickFun,
	display,
}: {
	text: string;
	onClickFun: Function;
	display: string;
}) => {
	const css: styleMap = {
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
			fontWeight: "bold",
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
			<div
				style={css.pulsanteFixatoInBassoDiv}
				//@ts-ignore
				onClick={onClickFun}
			>
				{text}
			</div>
		</div>
	);
};

export default BottomButton;
