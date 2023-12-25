import { useNavigate } from "react-router-dom";

const ListElement = ({ item, daDoveArrivo }) => {
	const navigate = useNavigate();

	return (
		<div
			style={css.elemento}
			onClick={() => {
				navigate("/product/" + item.id + "?daDoveArrivo=" + daDoveArrivo);
			}}
		>
			<div style={css.divImmagineElemento}>
				<img
					src={item.indirizzoImg}
					alt=''
					style={css.divImmagineElementoImg}
				/>
			</div>
			<div style={css.divNomeElemento}>
				<p style={css.nomeElemento}>{item.nome}</p>
			</div>
		</div>
	);
};

const css = {
	elemento: {
		margin: "10px",
		width: "35svw",
		height: "50svw",
		maxWidth: "140px",
		maxHeight: "200px",
		display: "flex",
		flexDirection: "column",
		borderRadius: "15px",
		boxShadow: "3px 3px 17px -3px rgba(0, 0, 0, 0.56)",
	},
	divImmagineElemento: {
		width: "35svw",
		height: "35svw",
		maxHeight: "140px",
		maxWidth: "140px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	divImmagineElementoImg: {
		width: "90%",
		height: "90%",
		borderRadius: "15px",
	},
	divNomeElemento: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: "15svw",
	},
	nomeElemento: {
		textAlign: "center",
		fontSize: "18px",
		fontWeight: "bold",
		textTransform: "capitalize",
	},
};

export default ListElement;
