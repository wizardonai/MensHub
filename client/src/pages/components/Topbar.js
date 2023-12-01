import { useNavigate } from "react-router-dom";
import "../css/Topbar.css";
import goBack from "../image/goBack.png";

const Topbar = ({ page, daDoveArrivo }) => {
	const navigate = useNavigate();

	return (
		<div id='topbar' style={{ textTransform: "uppercase" }}>
			{page === "product" ? (
				<img
					src={goBack}
					alt=''
					id='imgTornaIndietro'
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
