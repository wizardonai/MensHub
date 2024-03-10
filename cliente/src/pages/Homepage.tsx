import { useLoaderData } from "react-router-dom";
import { Container, Navbar, Topbar } from "../components/Components";
import { ReactNode, useState } from "react";
import { prodotto } from "../utils";
import { useLocalStorage } from "usehooks-ts";
import { Input } from "../components/shadcn/Input";

import searchImg from "../img/search.png";

const Listone = ({
	filteredProducts,
}: {
	filteredProducts: Array<prodotto>;
}) => {
	return filteredProducts.map((item) => {
		return <div className='h-[50px] w-full text-center'>{item.nome}</div>;
	});
};
const Filtri = ({
	products,
	filteredProducts,
	setFilteredProducts,
}: {
	products: Array<prodotto>;
	filteredProducts: Array<prodotto>;
	setFilteredProducts: Function;
}) => {
	return (
		<div className='h-[50px] overflow-x-scroll flex flex-row items-center flex-nowrap p-[1svw]'>
			<div className='w-[140px] h-[40px] rounded-xl'>Pizza</div>
			<div className='w-[140px] h-[40px] rounded-xl'>Pizza</div>
			<div className='w-[140px] h-[40px] rounded-xl'>Pizza</div>
			<div className='w-[140px] h-[40px] rounded-xl'>Pizza</div>
			<div className='w-[140px] h-[40px] rounded-xl'>Pizza</div>
		</div>
	);
};

const Searchbar = ({
	products,
	filteredProducts,
	setFilteredProducts,
}: {
	products: Array<prodotto>;
	filteredProducts: Array<prodotto>;
	setFilteredProducts: Function;
}) => {
	const filteredProductsDef = filteredProducts;

	const onChangeSearch = (e: any) => {
		const strSrc = e.target.value.toLowerCase();

		if (strSrc.length > 0) {
			let lista: Array<prodotto> = [];

			products.forEach((item) => {
				let arr = item.nome.toLowerCase().split(" ");

				let trovato = false;

				arr.forEach((item) => {
					if (item.toLowerCase().slice(0, strSrc.length) === strSrc) {
						trovato = true;
					} else {
						trovato = false;
					}
				});

				if (trovato) {
					lista.push(item);
				}
			});

			setFilteredProducts(lista);
		} else {
			setFilteredProducts(products);
		}
	};

	return (
		<div className='flex justify-center items-center'>
			<div className='flex justify-center items-center w-[280px]'>
				<Input
					type='text'
					onChange={onChangeSearch}
					className='bg-biancoLatte h-[53px] rounded-l-[40px] rounded-r-none clip-searchbar border-arancioneScuro border-[3px] pr-6 w-full focus-visible:ring-0 focus-visible:ring-offset-0'
				/>
				<div className='h-[58px] w-[3px] bg-arancioneScuro rotate-[32.10deg] relative right-[20px]'></div>
			</div>
			<div className='h-[53px] w-[80px] bg-arancioneScuro clip-searchbtn ml-[-10px] flex justify-end items-center'>
				<img
					src={searchImg}
					alt=''
					className='w-[35px] h[35px] mr-[15px] rotate-[80deg]'
					style={{
						filter:
							"invert(21%) sepia(5%) saturate(3444%) hue-rotate(312deg) brightness(93%) contrast(91%)",
					}}
				/>
			</div>
		</div>
	);
};

const Homepage = ({ username }: { username: string }) => {
	const produtcs: any = useLoaderData();
	const [assegnato, setAssegnato] = useState(false);
	const [filteredProducts, setFilteredProducts] = useState(
		[] as Array<prodotto>
	);

	if (!produtcs) {
		return <p>CARICAMENTO</p>;
	}

	if (!assegnato) {
		setFilteredProducts(produtcs);
		setAssegnato(true);
	}

	return (
		<>
			<Topbar page='home' name={username} />
			<Container>
				<Searchbar
					products={produtcs}
					filteredProducts={filteredProducts}
					setFilteredProducts={setFilteredProducts}
				/>
				<Filtri
					products={produtcs}
					filteredProducts={filteredProducts}
					setFilteredProducts={setFilteredProducts}
				/>
				{/*@ts-ignore*/}
				<Listone filteredProducts={filteredProducts} />
			</Container>
			<Navbar page='home' />
		</>
	);
};

export default Homepage;
