import '../css/Navbar.css'
import imgHome from '../image/home.png';
import imgSearch from '../image/search.png';
import imgMenu from '../image/menu.png';
import imgOrders from '../image/orders.png';
import imgProfile from '../image/profile.png';
import { useNavigate } from 'react-router-dom';

function Navbar()
{
    const navigate = useNavigate();

    function navigateHome()
    {
        navigate('/');
    }
    function navigateSearch()
    {
        navigate('/search');
    }
    function navigateMenu()
    {
        navigate('/menu');
    }
    function navigateOrders()
    {
        navigate('/orders');
    }
    function navigateProfile()
    {
        navigate('/profile');
    }

    return (
        <div className='navbar'>
            <div id="navbarHome" onClick={navigateHome}><img src={imgHome} alt='' /></div>
            <div id="navbarSearch" onClick={navigateSearch}><img src={imgSearch} alt='' /></div>
            <div id="navbarMenu" onClick={navigateMenu}><img src={imgMenu} alt='' /></div>
            <div id="navbarOrders" onClick={navigateOrders}><img src={imgOrders} alt='' /></div>
            <div id="navbarProfile" onClick={navigateProfile}><img src={imgProfile} alt='' /></div>
        </div>
    );
}

export default Navbar;