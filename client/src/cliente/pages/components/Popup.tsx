import { styleMap } from "../../../App";

const Popup = ({
	text,
	show,
	setPopup,
}: {
	text: string;
	show: boolean;
	setPopup: Function;
}) => {
	return (
		<div
			style={
				show ? css.divSopraPopUp : { ...css.divSopraPopUp, display: "none" }
			}
			onClick={() => {
				setPopup(false);
				console.log("falso");
			}}
		>
			<div
				style={
					show
						? { ...css.popup, display: "flex" }
						: { ...css.popup, display: "none" }
				}
				className='popup'
			>
				<p>{text}</p>
			</div>
		</div>
	);
};

export default Popup;

const css: styleMap = {
	popup: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#222",
		color: "white",
		height: "35svw",
		width: "55svw",
		position: "absolute",
		top: "50%",
		left: "50%",
		margin: "-17.5svw 0 0 -27.5svw",
		fontSize: "7svw",
		borderRadius: "15px",
		textAlign: "center",
	},
};
