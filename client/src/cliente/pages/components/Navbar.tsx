import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styleMap } from "../../../App";
import { useTheme } from "next-themes";
import { coloreBlu, filterBlu, hostnameImg } from "src/cliente/utils";

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
			borderColor: "var(--foreground)",
			background: "var(--background)",
			boxShadow:
				resolvedTheme === "light"
					? "3px 3px 17px -3px rgba(0, 0, 0, 0.30)"
					: "3px 3px 17px -3px rgba(255, 255, 255, 0.1)",
			border:
				resolvedTheme === "light" ? "0" : "1px solid rgba(255, 255, 255, 0.1)",
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
					: filterBlu,
		},
		barrettaInBasso: {
			borderRadius: "2px",
			position: "absolute",
			bottom: "calc(8svh - 5px)",
			left: spostamento + 3.5 + "%",
			width: "18%",
			height: "5px",
			background: resolvedTheme === "dark" ? "#fff" : coloreBlu,
		},
	};

	const BarrettaInBasso = () => {
		return <div style={css.barrettaInBasso}></div>;
	};

	return (
		<div style={css.navbar} className='navbar'>
			<div id='navbarHome' onClick={navigateHome} style={css.navbarDiv}>
				<img src={hostnameImg + "home.png"} alt='' style={css.navbarDivImg} />
			</div>
			<div id='navbarMenu' onClick={navigateMenu} style={css.navbarDiv}>
				<img src={hostnameImg + "menu.png"} alt='' style={css.navbarDivImg} />
			</div>
			<div id='navbarOrders' onClick={navigateOrders} style={css.navbarDiv}>
				<img src={hostnameImg + "orders.png"} alt='' style={css.navbarDivImg} />
			</div>
			<div
				id='navbarProfile'
				onClick={navigateProfile}
				style={{ ...css.navbarDiv, borderRight: "none" }}
			>
				<img
					src={hostnameImg + "profile.png"}
					alt=''
					style={css.navbarDivImg}
				/>
			</div>
			<BarrettaInBasso />
		</div>
	);
};

export default Navbar;
