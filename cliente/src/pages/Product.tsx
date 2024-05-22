import { useLoaderData } from "react-router-dom";
import { Container, Navbar } from "../components/Components";
import { prodotto, prodottoCarrello, urlImg } from "../utils";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "../components/shadcn/Carousel";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Product = ({ carrello, setCarrello }: { carrello: Array<prodottoCarrello>, setCarrello: Function }) => {
	const tmp: any = useLoaderData();

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

	return (
		<>
			<Container className='h-containerProduct py-14'>
				<div className='flex flex-col items-center h-full justify-evenly'>
					<p className='text-marrone text-3xl font-bold'>{product.nome}</p>
					<LazyLoadImage
						src={urlImg + product.indirizzo_img}
						alt={product.nome}
						className='w-[65%]'
					/>
					<p className='text-2xl'>{product.prezzo.toFixed(2)}€</p>
					<div className='w-full flex justify-center items-center'>
						<Carousel className='bg-arancioneScuro text-marrone rounded-2xl w-3/4 h-[130px] max-w-xs'>
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
			<Navbar page={"Aggiungi al carrello-" + product.id} product={product} carrello={carrello} setCarrello={setCarrello} />
		</>
	);
};

export default Product;
