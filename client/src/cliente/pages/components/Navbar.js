import imgHome from "../image/home.png";
import imgMenu from "../image/menu.png";
import imgOrders from "../image/orders.png";
import imgProfile from "../image/profile.png";
import { useNavigate } from "react-router-dom";

const Navbar = ({ page }) => {
	const navigate = useNavigate();

	function navigateHome() {
		navigate("/");
	}
	// function navigateSearch() {
	// 	navigate("/search");
	// }
	function navigateMenu() {
		navigate("/menu");
	}
	function navigateOrders() {
		navigate("/orders");
	}
	function navigateProfile() {
		navigate("/profile");
	}

	const BarrettaInBasso = () => {
		return <div style={css.barrettaInBasso}></div>;
	};

	return (
		<div style={css.navbar}>
			<div id='navbarHome' onClick={navigateHome} style={css.navbarDiv}>
				<img src={imgHome} alt='' style={css.navbarDivImg} />
				{page === "home" ? <BarrettaInBasso /> : ""}
			</div>
			<div id='navbarMenu' onClick={navigateMenu} style={css.navbarDiv}>
				<img src={imgMenu} alt='' style={css.navbarDivImg} />
				{page === "menu" ? <BarrettaInBasso /> : ""}
			</div>
			<div id='navbarOrders' onClick={navigateOrders} style={css.navbarDiv}>
				<img src={imgOrders} alt='' style={css.navbarDivImg} />
				{page === "orders" ? <BarrettaInBasso /> : ""}
			</div>
			<div id='navbarProfile' onClick={navigateProfile} style={css.navbarDiv}>
				<img src={imgProfile} alt='' style={css.navbarDivImg} />
				{page === "profile" ? <BarrettaInBasso /> : ""}
			</div>
		</div>
	);
};

export default Navbar;

//
//
//stili
//

const css = {
	navbar: {
		height: "10svh",
		width: "100%",
		backgroundColor: "#1a5d1a",
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	navbarDiv: {
		height: "80%",
		width: "25svw",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
	},
	navbarDivImg: {
		width: "40px",
		height: "40px",
		filter:
			"invert(83%) sepia(25%) saturate(962%) hue-rotate(353deg)brightness(103%) contrast(97%)",
	},
	barrettaInBasso: {
		position: "relative",
		width: "50%",
		height: "8%",
		borderRadius: "10px",
		backgroundColor: "black",
		filter:
			"invert(83%) sepia(25%) saturate(962%) hue-rotate(353deg)brightness(103%) contrast(97%)",
		margin: "3.5px",
	},
};
