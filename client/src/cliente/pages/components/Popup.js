const Popup = ({ text, show, setPopup }) => {
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

const css = {
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
