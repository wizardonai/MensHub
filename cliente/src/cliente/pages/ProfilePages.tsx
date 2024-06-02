import { useNavigate, useParams } from "react-router-dom";
import { ordine, prodotto, typeProfilo, urlImg } from "../../utils";
import { useEffect, useState } from "react";
import { getCronologia } from "../scripts/fetch";
import { Container, Navbar, Topbar } from "../components/Components";
import {
	SectionToggle,
	SectionToggleContent,
	SectionToggleItem,
	SectionToggleTrigger,
} from "../components/shadcn/SectionToggle";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { toast } from "sonner";
import { Toaster } from "../components/shadcn/Sonner";
import { Button } from "../components/shadcn/Button";

const CronologiaAcquistiPage = ({
	products,
	setLoggato,
	setDatiUtente,
	setProducts,
}: // apriUltimoAcquisto,
// setApriUltimoAcquisto,
{
	products: Array<prodotto>;
	setLoggato: Function;
	setDatiUtente: Function;
	setProducts: Function;
	// apriUltimoAcquisto: boolean;
	// setApriUltimoAcquisto: Function;
}) => {
	const [chiesto, setChiesto] = useState(false);
	const [cronologia, setCronologia] = useState([] as Array<ordine>);

	// useEffect(() => {
	// 	setApriUltimoAcquisto(false);
	// }, []);

	if (localStorage.getItem("loggato") !== '"cliente"') {
		setLoggato("?");
		return;
	}

	if (!chiesto && cronologia.length === 0) {
		setChiesto(true);
		//fetch cronologia
		getCronologia(localStorage.getItem("token") || "scu").then((res: any) => {
			if (!res) {
				toast.error("Errore nel caricamento della cronologia");
				return;
			}
			if (res === "Token non valido") {
				setLoggato(false);
				return;
			}
			if (res === "Mensa preferita cancellata") {
				localStorage.removeItem("cart");
				localStorage.removeItem("token");
				setDatiUtente({} as typeProfilo);
				setProducts([]);
				setLoggato("false");
			}
			if (typeof res !== "string" && res.length > 0) {
				setCronologia(res);
			} else setCronologia([]);
		});

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
	}

	const generaRighe = () => {
		// console.log(apriUltimoAcquisto);

		return cronologia.map((item: ordine, index: number) => {
			return (
				<SectionToggleItem
					key={index}
					value={item.id_ordine + ""}
					className='border-0 bg-biancoLatte rounded-3xl mb-2 w-full'
				>
					<SectionToggleTrigger className='bg-arancioneScuro rounded-2xl flex flex-row justify-between items-center px-4 no-underline h-[70px]'>
						<p className='text-marrone'>#{item.id_ordine}</p>
						<div key={index} className='w-full text-marrone text-lg'>
							{item.data.slice(0, 10).split("-").reverse().join("/")}
						</div>
					</SectionToggleTrigger>
					<SectionToggleContent className='bg-biancoLatte border-0 p-0 rounded-3xl'>
						<div>
							{item.prodotti.map((item2: any) => {
								const elemento = products.filter(
									(product) => product.id === item2.id
								)[0];

								return (
									<div
										className='w-full h-[80px] flex flex-row justify-start items-center rounded-3xl'
										key={elemento.id}
									>
										<LazyLoadImage
											src={urlImg + elemento.indirizzo_img}
											alt={elemento.nome}
											className='w-[70px] h-[70px] ml-2'
										/>
										<div
											className='w-3/4 flex flex-col items-center pl-1'
											id=''
										>
											<p
												id=''
												className=' text-marrone w-full whitespace-nowrap overflow-hidden overflow-ellipsis'
											>
												{elemento.nome}
											</p>
											<p id='' className=' text-marrone w-full'>
												{elemento.prezzo.toFixed(2)}€
											</p>
										</div>
										<p className='w-1/4 text-center'>{item2.quantita}</p>
									</div>
								);
							})}
						</div>
					</SectionToggleContent>
				</SectionToggleItem>
			);
		});
	};

	return (
		<>
			<div className='h-svh w-svw tel:hidden'>
				<Topbar name='' page='Cronologia' />
				<Container>
					<div className='w-full flex flex-col items-center justify-center'>
						{typeof cronologia === "string" || cronologia.length === 0 ? (
							<p>NESSUN ORDINE!</p>
						) : (
							<SectionToggle
								type='single'
								collapsible
								className='w-3/4'
								defaultValue={
									cronologia.length > 0 ? cronologia[0].id_ordine + "" : ""
								}
							>
								{generaRighe()}
							</SectionToggle>
						)}
					</div>
				</Container>
				<Toaster richColors />
				<Navbar page='Cronologia' />
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
			<Toaster richColors />
		</>
	);
};

const ProfilePages = ({
	products,
	setLoggato,
	setDatiUtente,
	setProducts,
}: // apriUltimoAcquisto,
// setApriUltimoAcquisto,
{
	products: Array<prodotto>;
	setLoggato: Function;
	setDatiUtente: Function;
	setProducts: Function;
	// apriUltimoAcquisto: boolean;
	// setApriUltimoAcquisto: Function;
}) => {
	const { page } = useParams<{ page: string }>();

	const pagine = ["cronologiaacquisti"];

	if (!page) return <p>CARICAMENTO</p>;

	switch (page) {
		case pagine[0]:
			return (
				<CronologiaAcquistiPage
					products={products}
					setLoggato={setLoggato}
					setDatiUtente={setDatiUtente}
					setProducts={setProducts}
					// setApriUltimoAcquisto={setApriUltimoAcquisto}
					// apriUltimoAcquisto={apriUltimoAcquisto}
				/>
			);
		default:
			return <p>PAGINA NON TROVATA!</p>;
	}
};

export default ProfilePages;
