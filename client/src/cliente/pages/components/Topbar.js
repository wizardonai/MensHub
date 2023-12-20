import { useNavigate } from "react-router-dom";
import goBack from "../image/goBack.png";

const Topbar = ({ daDoveArrivo, titolo }) => {
	const navigate = useNavigate();

	return (
		<div style={css.topbar} className='topbar'>
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
			"invert(8%) sepia(19%) saturate(0%) hue-rotate(264deg) brightness(92%) contrast(86%)",
	},
	titoloIndietro: {
		fontSize: "27px",
	},
};
