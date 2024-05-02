import { useParams } from "react-router-dom";
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
import { LazyLoadImage } from "react-lazy-load-image-component";

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
      JSON.parse(localStorage.getItem("token") || '{"token": "scu"}').token,
    ).then((res: any) => {
      setCronologia(res);
    });

    return <p>caricamento</p>;
  }

  console.log(cronologia);

  const generaRighe = () => {
    return cronologia.map((item: ordine, index: number) => {
      if (item.stato_ordine === "attivo") return <div key={index}></div>;

      return (
        <SectionToggleItem
          key={index}
          value={item.id_ordine + ""}
          className="border-0 bg-biancoLatte rounded-3xl"
        >
          <SectionToggleTrigger className="bg-arancioneScuro rounded-2xl flex flex-row justify-between items-center px-4 no-underline h-[70px]">
            <div key={index} className="w-full text-marrone text-lg">
              {item.data.slice(0, 10).split("-").reverse().join("/")}
            </div>
          </SectionToggleTrigger>
          <SectionToggleContent className="bg-biancoLatte border-0 p-0 rounded-3xl">
            <div>
              {item.prodotti.map((item2: any) => {
                const elemento = products.filter(
                  (product) => product.id === item2.id,
                )[0];

                return (
                  <div
                    className="w-full h-[80px] flex flex-row justify-start items-center rounded-3xl"
                    key={elemento.id}
                  >
                    <LazyLoadImage
                      src={urlImg + elemento.indirizzo_img}
                      alt={elemento.nome}
                      className="w-[70px] h-[70px] ml-2"
                    />
                    <div
                      className="w-3/4 flex flex-col items-center pl-1"
                      id=""
                    >
                      <p
                        id=""
                        className=" text-marrone w-full whitespace-nowrap overflow-hidden overflow-ellipsis"
                      >
                        {elemento.nome}
                      </p>
                      <p id="" className=" text-marrone w-full">
                        {elemento.prezzo.toFixed(2)}€
                      </p>
                    </div>
                    <p className="w-1/4 text-center">{item2.quantita}</p>
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
      <Topbar name="" page="Cronologia" />
      <Container>
        <div className="w-full flex flex-col items-center justify-center">
          <SectionToggle type="single" collapsible className="w-3/4">
            {typeof cronologia === "string" ? (
              <p>NESSUN ORDINE!</p>
            ) : (
              generaRighe()
            )}
          </SectionToggle>
        </div>
      </Container>
      <Navbar page="Cronologia" />
    </>
  );
};

const ProfilePages = ({
  datiUtente,
  products,
}: {
  datiUtente: typeProfilo;
  products: Array<prodotto>;
}) => {
  const { page } = useParams<{ page: string }>();

  const pagine = ["cronologiaacquisti"];

  if (!page) return <p>CARICAMENTO</p>;

  switch (page) {
    case pagine[0]:
      return <CronologiaAcquistiPage products={products} />;
    default:
      return <p>PAGINA NON TROVATA!</p>;
  }
};

export default ProfilePages;