import { useLoaderData, useParams } from "react-router-dom";
import { ordine, prodotto, typeProfilo, urlImg } from "../utils";
import { useState } from "react";
import { getCronologia } from "../scripts/fetch";
import { Container, Navbar, Topbar } from "../components/Components";
import {
	SectionToggle,
	SectionToggleContent,
	SectionToggleItem,
	SectionToggleTrigger,
} from "../components/shadcn/SectionToggle";
import { JsxElement } from "typescript";

const DatiUtentePage = () => {
	return <p>dati utente</p>;
};
const MensaPreferitaPage = () => {
	return <p>mensa preferita</p>;
};
const RiscattaCodicePage = () => {
	return <p>riscatta codice</p>;
};
const CronologiaAcquistiPage = ({
	products,
}: {
	products: Array<prodotto>;
}) => {
	const [chiesto, setChiesto] = useState(false);
	const [cronologia, setCronologia] = useState([] as Array<ordine>);

	if (!chiesto && cronologia.length === 0) {
		setChiesto(true);
		//fetch cronologia
		getCronologia(
			JSON.parse(localStorage.getItem("token") || '{"token": "scu"}')
		).then((res: any) => {
			setCronologia(res);
			console.log(res);
		});
	}

	const generaRighe = () => {
		return cronologia.map((item: ordine, index: number) => (
			<SectionToggleItem key={index} value={item.id_ordine + ""}>
				<SectionToggleTrigger>
					<div
						key={index}
						className='flex flex-col justify-center items-center'
					>
						{item.data.slice(0, 10).split("-").reverse().join("/")}
					</div>
				</SectionToggleTrigger>
				<SectionToggleContent>
					<div>
						{item.prodotti.map((item: any, index) => {
							const elemento = products.filter(
								(product) => product.id === item.id
							)[0];

							return (
								<div
									className='w-full h-[80px] flex flex-row justify-start items-center rounded-3xl bg-arancioneScuro mb-3'
									key={elemento.id}
								>
									<img
										src={urlImg + elemento.indirizzo_img}
										alt={elemento.nome}
										className='w-[70px] h-[70px] ml-2'
									/>
									<div className='w-3/4 flex flex-col items-center pl-1' id=''>
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
									<p className='w-1/4 text-center'>{item.quantita}</p>
								</div>
							);
						})}
					</div>
				</SectionToggleContent>
			</SectionToggleItem>
		));
	};

	return (
		<>
			<Topbar name='' page='Cronologia' />
			<Container>
				<div className='w-full flex flex-col items-center justify-center'>
					<SectionToggle type='single' collapsible className='w-3/4'>
						{generaRighe()}
					</SectionToggle>
				</div>
			</Container>
			<Navbar page='profile' />
		</>
	);
};
const DisconnettiPage = () => {
	return <p>disconnetti</p>;
};

const ProfilePages = ({
	datiUtente,
	products,
}: {
	datiUtente: typeProfilo;
	products: Array<prodotto>;
}) => {
	const { page } = useParams<{ page: string }>();

	const pagine = [
		"datiutente",
		"mensapreferita",
		"riscattacodice",
		"cronologiaacquisti",
		"disconnetti",
	];

	if (!page) return <p>CARICAMENTO</p>;

	switch (page) {
		case pagine[0]:
			return <DatiUtentePage />;
		case pagine[1]:
			return <MensaPreferitaPage />;
		case pagine[2]:
			return <RiscattaCodicePage />;
		case pagine[3]:
			return <CronologiaAcquistiPage products={products} />;
		case pagine[4]:
			return <DisconnettiPage />;
		default:
			return <p>PAGINA NON TROVATA!</p>;
	}
};

export default ProfilePages;
