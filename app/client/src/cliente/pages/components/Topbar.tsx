import { useNavigate } from "react-router-dom";
import { styleMap } from "../../../App";
import { hostname } from "../../../App";
import { useTheme } from "next-themes";

const Topbar = ({
	daDoveArrivo,
	titolo,
}: {
	daDoveArrivo: string;
	titolo: string;
}) => {
	const navigate = useNavigate();
	const { resolvedTheme } = useTheme();

	//
	//
	// stili
	//

	const css: styleMap = {
		topbar: {
			display: "flex",
			justifyContent: "flex-start",
			alignItems: "center",
			height: "10svh",
			width: "100%",
			background: "var(--background)",
		},
		titolo: {
			fontSize: "45px",
			textTransform: "capitalize",
			marginLeft: "20px",
			fontWeight: "500",
		},
		imgTornaIndietro: {
			height: "25px",
			width: "25px",
			marginLeft: "5px",
			filter:
				resolvedTheme === "light"
					? ""
					: "invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg) brightness(102%) contrast(102%)",
		},
		titoloIndietro: {
			fontSize: "27px",
		},
	};

	return (
		<div style={css.topbar} className='topbar'>
			{titolo === "product" ? (
				<img
					src={hostname + "goBack.png"}
					alt=''
					style={css.imgTornaIndietro}
					onClick={() => {
						navigate("/" + daDoveArrivo);
					}}
				/>
			) : (
				""
			)}
			{titolo !== "product" ? (
				<p style={css.titolo}>{titolo}</p>
			) : (
				<p
					style={css.titoloIndietro}
					onClick={() => {
						navigate("/" + daDoveArrivo);
					}}
				>
					{daDoveArrivo}
				</p>
			)}
		</div>
	);
};

export default Topbar;
