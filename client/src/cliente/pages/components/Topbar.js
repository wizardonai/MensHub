import { useNavigate } from "react-router-dom";
import goBack from "../image/goBack.png";

const Topbar = ({ daDoveArrivo, titolo }) => {
	const navigate = useNavigate();

	return (
		<div style={css.topbar}>
			{titolo === "product" ? (
				<img
					src={goBack}
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

//
//
// stili
//

const css = {
	topbar: {
		display: "flex",
		justifyContent: "flex-start",
		alignItems: "center",
		height: "10svh",
		width: "100%",
		// backgroundColor: "#1a5d1a",
		// color: "#fbd85d",
	},
	titolo: {
		fontSize: "45px",
		textTransform: "capitalize",
		marginLeft: "20px",
		fontWeight: "500",
	},
	imgTornaIndietro: {
		// position: "absolute",
		// top: "1.5svh",
		// left: "1px",
		height: "4svh",
		width: "4svh",
		marginLeft: "5px",
		// filter:
		// 	"invert(77%) sepia(82%) saturate(313%) hue-rotate(354deg)brightness(98%) contrast(102%)",
	},
	titoloIndietro: {
		fontSize: "27px",
	},
};
