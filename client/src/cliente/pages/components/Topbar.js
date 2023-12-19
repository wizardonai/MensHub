import { useNavigate } from "react-router-dom";
import goBack from "../image/goBack.png";

const Topbar = ({ page, daDoveArrivo }) => {
	const navigate = useNavigate();

	return (
		<div style={css.topbar}>
			{page === "product" ? (
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
			{page}
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
		justifyContent: "center",
		alignItems: "center",
		height: "7svh",
		width: "100%",
		backgroundColor: "#1a5d1a",
		color: "#fbd85d",
		fontSize: "30px",
		textTransform: "uppercase",
	},
	imgTornaIndietro: {
		position: "absolute",
		top: "1.5svh",
		left: "1px",
		height: "4svh",
		width: "4svh",
		filter:
			"invert(77%) sepia(82%) saturate(313%) hue-rotate(354deg)brightness(98%) contrast(102%)",
	},
};
