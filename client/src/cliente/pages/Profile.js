import Navbar from "./components/Navbar";
import Topbar from "./components/Topbar";

function Profile() {
	return (
		<div className='page'>
			<Topbar page='profile' />
			<div className='container'></div>
			<Navbar page='profile' />
		</div>
	);
}

export default Profile;
