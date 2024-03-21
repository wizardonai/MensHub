import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import topbarProfile from "../img/topbarProfile.png";
import { cn } from "./shadcn/utils";

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

export const Container = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => (
	<div className={cn("w-full h-container overflow-y-scroll", className)}>
		{children}
	</div>
);

export const Navbar = ({ page }: { page: string }) => {
	const navigate = useNavigate();

	const buttons = {
		home: useRef(null),
		cart: useRef(null),
		profile: useRef(null),
	};

	const [height, setHeight] = useState(0);

	useEffect(() => {
		let h = window.screen.height - 20;
		setHeight(h / 10 - 20);
	});

	return (
		<div className='w-full h-navbar flex flex-row justify-evenly items-center'>
			<div className='w-[90%] h-full flex flex-row justify-evenly items-center'>
				<div
					className={`bg-marrone flex justify-center items-center`}
					style={{
						width: page === "home" ? height * 3 + "px" : height + "px",
						borderRadius: page === "home" ? "28px" : "50%",
						height: height + "px",
					}}
					ref={buttons.home}
					onClick={(e) => {
						if (page !== "home") navigate("/home");
					}}
				>
					{page === "home" ? <p className='text-white text-xl'>HOME</p> : ""}
				</div>
				<div
					className={`h-[85%] bg-marrone rounded-[28px] flex justify-center items-center`}
					style={{
						width: page === "cart" ? height * 3 + "px" : height + "px",
						borderRadius: page === "cart" ? "28px" : "50%",
						height: height + "px",
					}}
					ref={buttons.cart}
					onClick={(e) => {
						if (page !== "cart") navigate("/cart");
					}}
				>
					{page === "cart" ? (
						<p className='text-white text-xl'>CARRELLO</p>
					) : (
						""
					)}
				</div>
				<div
					className={`h-[85%] bg-marrone rounded-[28px] flex justify-center items-center`}
					style={{
						width: page === "profile" ? height * 3 + "px" : height + "px",
						borderRadius: page === "profile" ? "28px" : "50%",
						height: height + "px",
					}}
					ref={buttons.profile}
					onClick={(e) => {
						if (page !== "profile") navigate("/profile");
					}}
				>
					{page === "profile" ? (
						<p className='text-white text-xl'>PROFILO</p>
					) : (
						""
					)}
				</div>
			</div>
		</div>
	);
};
