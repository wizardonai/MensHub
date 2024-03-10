import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { Input } from "./shadcn/Input";

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
		<div className='w-full h-topbar'>
			<p className=''>{page}</p>
		</div>
	);
};

export const Container = ({ children }: { children: React.ReactNode }) => (
	<div className='w-full h-container'>{children}</div>
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
					HOME
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
					CART
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
					PROFILE
				</div>
			</div>
		</div>
	);
};

export const Searchbar = () => {
	const onChangeSearch = (e: any) => {};

	return (
		<div className='flex justify-center items-center'>
			<Input
				type='text'
				onChange={onChangeSearch}
				className='bg-biancoLatte w-[95%] h-14 rounded-l-[40px] clip-searchbar border-arancioneScuro border-[3px] pr-8'
			/>
		</div>
	);
};
