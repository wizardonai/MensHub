import { useNavigate } from "react-router-dom";
import { useRef } from "react";

export const Topbar = ({ page, name }: { page: string; name: string }) => {
	if (page === "home") {
		return (
			<div className='w-full h-topbar flex flex-col items-center justify-center'>
				<p className='text-4xl text-marrone w-[93%]'>
					Ciao, <span className='font-bold'>{name}</span>
				</p>
				<p className='w-[91%] text-marroncino'>Cosa vuoi mangiare?</p>
			</div>
		);
	}

	return (
		<div className='w-full h-topbar flex flex-col items-center justify-center'>
			<p className='text-4xl text-marrone w-[93%] font-bold capitalize'>
				{page}
			</p>
		</div>
	);
};

export const Container = ({ children }: { children: React.ReactNode }) => (
	<div className='w-full h-container overflow-y-scroll'>{children}</div>
);

export const Navbar = ({ page }: { page: string }) => {
	const navigate = useNavigate();

	const buttons = {
		home: useRef(null),
		cart: useRef(null),
		profile: useRef(null),
	};

	return (
		<div className='w-full h-navbar flex flex-row justify-evenly items-center'>
			<div className='w-[85%] h-full flex flex-row justify-evenly items-center'>
				<div
					className={`h-[85%] bg-marrone rounded-[28px] flex justify-center items-center ${
						page === "home" ? "w-[45%]" : "w-[22.5%]"
					}`}
					ref={buttons.home}
					onClick={(e) => {
						if (page !== "home") navigate("/home");
					}}
				>
					<p className='text-white text-xl'>HOME</p>
				</div>
				<div
					className={`h-[85%] bg-marrone rounded-[28px] flex justify-center items-center ${
						page === "cart" ? "w-[45%]" : "w-[22.5%]"
					}`}
					ref={buttons.cart}
					onClick={(e) => {
						if (page !== "cart") navigate("/cart");
					}}
				>
					<p className='text-white text-xl'>CART</p>
				</div>
				<div
					className={`h-[85%] bg-marrone rounded-[28px] flex justify-center items-center ${
						page === "profile" ? "w-[45%]" : "w-[22.5%]"
					}`}
					ref={buttons.profile}
					onClick={(e) => {
						if (page !== "profile") navigate("/profile");
					}}
				>
					<p className='text-white text-xl'>PROF</p>
				</div>
			</div>
		</div>
	);
};
