import '../css/Navbar.css'
import imgHome from '../image/home.png';
import imgSearch from '../image/search.png';
import imgMenu from '../image/menu.png';
import imgOrders from '../image/orders.png';
import imgProfile from '../image/profile.png';

function Navbar()
{
    return (
        <div className='navbar'>
            <div id="navbarHome"><img src={imgHome} alt='' /></div>
            <div id="navbarSearch"><img src={imgSearch} alt='' /></div>
            <div id="navbarMenu"><img src={imgMenu} alt='' /></div>
            <div id="navbarOrders"><img src={imgOrders} alt='' /></div>
            <div id="navbarProfile"><img src={imgProfile} alt='' /></div>
        </div>
    );
}

export default Navbar;