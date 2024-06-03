import { useLoaderData } from "react-router-dom";
import { Container, Navbar } from "../components/Components";
import { prodotto, prodottoCarrello, urlImg } from "../../utils";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "../components/shadcn/Carousel";
import { LazyLoadImage } from "react-lazy-load-image-component";

import imgSopra from "../img/sopra_benvenuto.png";
import imgSotto from "../img/sotto_login.png";
import { Button } from "../components/shadcn/Button";
import { useEffect, useRef, useState } from "react";

const Product = ({
	carrello,
	setCarrello,
	setLoggato,
}: {
	carrello: Array<prodottoCarrello>;
	setCarrello: Function;
	setLoggato: Function;
}) => {
	const tmp: any = useLoaderData();

	const [images, setImages] = useState([useRef(null), useRef(null)]);

	useEffect(() => {
		animazioniImmagini(18, 15, 844);
	}, []);

	if (localStorage.getItem("loggato") !== '"cliente"') {
		setLoggato("?");
		return;
	}

	if (!tmp)
		return (
			<div className='w-full h-full flex justify-center items-center bg-white'>
				<iframe
					src='https://giphy.com/embed/8Ajc7LGGMYssG3Xwlm'
					width='300'
					height='300'
					className='giphy-embed'
					allowFullScreen
					title='caricamento'
				></iframe>
			</div>
		);
	const product: prodotto = tmp;

	const animazioniImmagini = (sopra: number, sotto: number, height: number) => {
		const generaProporzioni = (
			sopra: number,
			sotto: number,
			height: number
		) => {
			const rapportoProporzione1 = 844 / height;
			const rapportoProporzione2 = height / 844;

			const sopraHeight = sopra * rapportoProporzione1;
			const sottoHeight = sotto * rapportoProporzione2;
			return {
				sopra: Math.ceil(sopraHeight / 5) * 5,
				sotto: Math.ceil(sottoHeight / 5) * 5,
			};
		};

		const proporzioni = generaProporzioni(sopra, sotto, window.innerHeight);

		//@ts-ignore
		images[0].current.style.top = `-${proporzioni.sopra + 2}svh`;
		//@ts-ignore
		images[1].current.style.bottom = `-${proporzioni.sotto + 2}svh`;
	};

	return (
		<>
			<div className='h-full w-full overflow-hidden absolute top-0 left-0 tel:hidden'>
				<img
					src={imgSopra}
					alt=''
					className='absolute z-[-1]'
					ref={images[0]}
				/>
				<Container className='h-containerProduct py-14'>
					<div className='flex flex-col items-center h-full justify-evenly'>
						<p className='text-marrone text-3xl font-bold'>{product.nome}</p>
						<LazyLoadImage
							src={urlImg + product.indirizzo_img}
							alt={product.nome}
							className='w-[65%]'
						/>
						<p className='text-2xl text-marrone'>
							{product.prezzo.toFixed(2)}€
						</p>
						<div className='w-full flex justify-center items-center'>
							<Carousel className='bg-arancioneScuro text-marrone rounded-2xl w-3/4 h-[130px] max-w-xs border border-marrone'>
								<CarouselContent>
									<CarouselItem>
										<div className='h-[130px] flex flex-col justify-center items-center'>
											<p className='w-3/4 text-center'>{product.descrizione}</p>
										</div>
									</CarouselItem>
									<CarouselItem>
										<div className='h-[130px] flex flex-col justify-center items-center'>
											<p className='w-3/4 text-center mb-3 font-bold text-xl'>
												Allergeni:
											</p>
											<p className='w-3/4 text-center'>{product.allergeni}</p>
										</div>
									</CarouselItem>
								</CarouselContent>
								<CarouselPrevious />
								<CarouselNext />
							</Carousel>
						</div>
					</div>
				</Container>
				<Navbar
					page={"Aggiungi-" + product.id}
					product={product}
					carrello={carrello}
					setCarrello={setCarrello}
				/>
				<img
					src={imgSotto}
					alt=''
					className='absolute z-[-1]'
					ref={images[1]}
				/>
			</div>
			<div className='h-svh w-svw hidden justify-center items-center tel:flex flex-col'>
				<p className='text-marrone text-2xl w-full text-center'>
					Dispositivo non supportato! <br />
					Per una esperienza migliore, utilizza un dispositivo mobile
				</p>
				<Button
					className='mt-2 text-xl p-5'
					variant='avanti'
					onClick={() => {
						localStorage.clear();
						setLoggato(false);
					}}
				>
					Disconnettiti
				</Button>
			</div>
		</>
	);
};

export default Product;
