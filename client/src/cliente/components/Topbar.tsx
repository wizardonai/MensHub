import { useNavigate } from "react-router-dom";
import { styleMap } from "../../App";
import { useTheme } from "next-themes";
import { colori, getFilter, hostnameImg } from "src/cliente/utils";

const Topbar = ({
	daDoveArrivo,
	titolo,
}: {
	daDoveArrivo: string;
	titolo: string;
}) => {
	const navigate = useNavigate();
	const { resolvedTheme } = useTheme();

	const css: styleMap = {
		topbar: {
			display: "flex",
			//justifyContent: "flex-start",
			alignItems: "center",
			height: "10svh",
			width: "100%",
		},
		titolo: {
			fontSize: "45px",
			textTransform: "capitalize",
			marginLeft: "20px",
			fontWeight: "500",
			color: colori.foreground,
		},
		imgTornaIndietro: {
			height: "25px",
			width: "25px",
			marginLeft: "5px",
			filter:
				resolvedTheme === "light" ? "" : getFilter(resolvedTheme || "", null),
		},
		titoloIndietro: {
			fontSize: "27px",
		},
	};

	return (
		<div style={css.topbar} className='topbar'>
			{titolo === "product" ? (
				<img
					src={hostnameImg + "goBack.png"}
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
