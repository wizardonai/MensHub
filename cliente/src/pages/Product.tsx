import { useLoaderData } from "react-router-dom";
import { Container, Navbar } from "../components/Components";
import { prodotto, urlImg } from "../utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/shadcn/Carousel";

const Product = () => {
  const tmp: any = useLoaderData();

  if (!tmp) return <p>CARICAMENTS</p>;
  const product: prodotto = tmp;

  return (
    <>
      <Container className="h-containerProduct py-14">
        <div className="flex flex-col items-center h-full justify-evenly">
          <p className="text-marrone text-3xl font-bold">{product.nome}</p>
          <img
            src={urlImg + product.indirizzo_img}
            alt={product.nome}
            className="w-[65%]"
          />
          <p className="text-2xl">{product.prezzo.toFixed(2)}€</p>
          <div className="w-full flex justify-center items-center">
            <Carousel className="bg-arancioneScuro text-marrone rounded-2xl w-3/4 h-[130px] max-w-xs">
              <CarouselContent>
                <CarouselItem>
                  <div className="h-[130px] flex flex-col justify-center items-center">
                    <p className="w-3/4 text-center">{product.descrizione}</p>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="h-[130px] flex flex-col justify-center items-center">
                    <p className="w-3/4 text-center mb-3 font-bold text-xl">
                      Allergeni:
                    </p>
                    <p className="w-3/4 text-center">{product.allergeni}</p>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </Container>
      <Navbar page={"Aggiungi al carrello-" + product.id} product={product} />
    </>
  );
};

export default Product;
