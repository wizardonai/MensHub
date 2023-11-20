import "../css/Navbar.css";
import imgHome from "../image/home.png";
import imgSearch from "../image/search.png";
import imgMenu from "../image/menu.png";
import imgOrders from "../image/orders.png";
import imgProfile from "../image/profile.png";
import { useNavigate } from "react-router-dom";

const Navbar = ({ page }) => {
	const navigate = useNavigate();

	function navigateHome() {
		navigate("/");
	}
	function navigateSearch() {
		navigate("/search");
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

	const BarrettaInBasso = () => {
		return <div id='barrettaInBasso'></div>;
	};

	return (
		<div className='navbar'>
			<div id='navbarHome' onClick={navigateHome}>
				<img src={imgHome} alt='' />
				{page === "home" ? <BarrettaInBasso /> : ""}
			</div>
			<div id='navbarSearch' onClick={navigateSearch}>
				<img src={imgSearch} alt='' />
				{page === "search" ? <BarrettaInBasso /> : ""}
			</div>
			<div id='navbarMenu' onClick={navigateMenu}>
				<img src={imgMenu} alt='' />
				{page === "menu" ? <BarrettaInBasso /> : ""}
			</div>
			<div id='navbarOrders' onClick={navigateOrders}>
				<img src={imgOrders} alt='' />
				{page === "orders" ? <BarrettaInBasso /> : ""}
			</div>
			<div id='navbarProfile' onClick={navigateProfile}>
				<img src={imgProfile} alt='' />
				{page === "profile" ? <BarrettaInBasso /> : ""}
			</div>
		</div>
	);
};

export default Navbar;
