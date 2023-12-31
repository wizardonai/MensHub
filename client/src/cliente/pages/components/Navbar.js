import { useEffect, useState } from "react";
import imgHome from "../image/home.png";
import imgMenu from "../image/menu.png";
import imgOrders from "../image/orders.png";
import imgProfile from "../image/profile.png";
import { useNavigate } from "react-router-dom";
import { Colori } from "../../../App";

const Navbar = ({ page }) => {
	const navigate = useNavigate();

	const [spostamento, setSpostamento] = useState(0);

	function navigateHome() {
		navigate("/");
	}
	function navigateMenu() {
		navigate("/menu");
	}
	function navigateOrders() {
		navigate("/orders");
	}
	function navigateProfile() {
		navigate("/profile");
	}

	useEffect(() => {
		if (page === "home") {
			setSpostamento(0);
		} else if (page === "menu") {
			setSpostamento(25);
		} else if (page === "orders") {
			setSpostamento(50);
		} else if (page === "profile") {
			setSpostamento(75);
		}
	}, [page]);

	const BarrettaInBasso = () => {
		return <div style={css.barrettaInBasso}></div>;
	};

	//
	//
	//stili
	//
	const css = {
		navbar: {
			height: "8svh",
			width: "100%",
			display: "flex",
			flexDirection: "row",
			justifyContent: "center",
			alignItems: "center",
			borderTop: "1px solid " + Colori.primario,
		},
		navbarDiv: {
			height: "100%",
			width: "25svw",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			flexDirection: "column",
		},
		navbarDivImg: {
			width: "35px",
			height: "35px",
			filter: Colori.imgPrimario,
		},
		barrettaInBasso: {
			position: "absolute",
			bottom: "calc(8svh - 5px)",
			left: spostamento + 3.5 + "%",
			width: "18%",
			height: "5px",
			backgroundColor: Colori.primario,
		},
	};

	return (
		<div style={css.navbar} className='navbar'>
			<div id='navbarHome' onClick={navigateHome} style={css.navbarDiv}>
				<img src={imgHome} alt='' style={css.navbarDivImg} />
			</div>
			<div id='navbarMenu' onClick={navigateMenu} style={css.navbarDiv}>
				<img src={imgMenu} alt='' style={css.navbarDivImg} />
			</div>
			<div id='navbarOrders' onClick={navigateOrders} style={css.navbarDiv}>
				<img src={imgOrders} alt='' style={css.navbarDivImg} />
			</div>
			<div
				id='navbarProfile'
				onClick={navigateProfile}
				style={{ ...css.navbarDiv, borderRight: "none" }}
			>
				<img src={imgProfile} alt='' style={css.navbarDivImg} />
			</div>
			<BarrettaInBasso />
		</div>
	);
};

export default Navbar;
