import { useNavigate } from "react-router-dom";
import "../css/Topbar.css";
import goBack from "../image/goBack.png";

const Topbar = ({ page, setLista, lista, daDoveArrivo }) => {
	const navigate = useNavigate();

	return (
		<div id='topbar' style={{ textTransform: "uppercase" }}>
			{page === "menu" && !lista ? (
				<img
					src={goBack}
					alt=''
					id='imgTornaIndietro'
					onClick={() => {
						setLista(true);
						if (daDoveArrivo === "home") {
							navigate("/");
						} else if (daDoveArrivo === "search") {
							navigate("/search");
						}
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
