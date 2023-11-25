import "../css/Topbar.css";
import goBack from "../image/goBack.png";

const Topbar = ({ page, setLista, lista }) => {
	return (
		<div id='topbar' style={{ textTransform: "uppercase" }}>
			{page === "menu" && !lista ? (
				<img
					src={goBack}
					alt=''
					id='imgTornaIndietro'
					onClick={() => setLista(true)}
				/>
			) : (
				""
			)}
			{page}
		</div>
	);
};

export default Topbar;
