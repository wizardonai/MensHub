import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styleMap } from "../../../App";
import { hostname } from "../../../App";
import { useTheme } from "next-themes";

const Navbar = ({ page }: { page: string }) => {
	const navigate = useNavigate();
	const { resolvedTheme } = useTheme();

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

	//
	//
	//stili
	//
	const css: styleMap = {
		navbar: {
			height: "8svh",
			width: "100%",
			display: "flex",
			flexDirection: "row",
			justifyContent: "center",
			alignItems: "center",
			//borderTop: "1px solid",
			borderColor: "var(--foreground)",
			background: "var(--background)",
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
			filter:
				resolvedTheme === "dark"
					? "invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg) brightness(102%) contrast(102%)"
					: "",
		},
		barrettaInBasso: {
			borderRadius: "2px",
			position: "absolute",
			bottom: "calc(8svh - 5px)",
			left: spostamento + 3.5 + "%",
			width: "18%",
			height: "5px",
			background: resolvedTheme === "dark" ? "#fff" : "#000",
		},
	};

	const BarrettaInBasso = () => {
		return <div style={css.barrettaInBasso}></div>;
	};

	return (
		<div style={css.navbar} className='navbar'>
			<div id='navbarHome' onClick={navigateHome} style={css.navbarDiv}>
				<img src={hostname + "home.png"} alt='' style={css.navbarDivImg} />
			</div>
			<div id='navbarMenu' onClick={navigateMenu} style={css.navbarDiv}>
				<img src={hostname + "menu.png"} alt='' style={css.navbarDivImg} />
			</div>
			<div id='navbarOrders' onClick={navigateOrders} style={css.navbarDiv}>
				<img src={hostname + "orders.png"} alt='' style={css.navbarDivImg} />
			</div>
			<div
				id='navbarProfile'
				onClick={navigateProfile}
				style={{ ...css.navbarDiv, borderRight: "none" }}
			>
				<img src={hostname + "profile.png"} alt='' style={css.navbarDivImg} />
			</div>
			<BarrettaInBasso />
		</div>
	);
};

export default Navbar;
