import { useEffect, useRef, useState } from "react";
import { hostnameProductor } from "../../App";
import { Input } from "../components/shadcn/Input";
import {
  addProdotto,
  changeProdotto,
  changeProdottoImmagine,
  deleteProdotto,
  getProdotti,
} from "../scripts/fetch";
import Filtri from "./Filtri";
import { Toaster } from "../components/shadcn/Sonner";
import { toast } from "sonner";

export default function Popup({
  setPopup,
  categorie,
  allergeni,
  prodotti,
  setProdotti,
  prodotto,
  categoria,
}: {
  setPopup: Function;
  categorie: any;
  allergeni: any;
  prodotti: any;
  setProdotti: Function;
  prodotto: any;
  categoria: any;
}): JSX.Element {
  const nome = useRef<HTMLInputElement>(null);
  const prezzo = useRef<HTMLInputElement>(null);
  const [filtro, setFiltro] = useState(categoria);
  const [allergeniScelti, setAllergeniScelti] = useState<any[]>([]);
  const descrizione = useRef<HTMLTextAreaElement>(null);
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const horizontalDivRef = useRef<HTMLDivElement>(null);
  const verticalDivRef = useRef<HTMLDivElement>(null);
  const [isHorizontalMouseDown, setIsHorizontalMouseDown] = useState(false);
  const [horizontalMouseDownX, setHorizontalMouseDownX] = useState(0);
  const [lastHorizontalMouseMoveX, setLastHorizontalMouseMoveX] = useState(0);
  const [isVerticalMouseDown, setIsVerticalMouseDown] = useState(false);
  const [verticalMouseDownY, setVerticalMouseDownY] = useState(0);
  const [lastVerticalMouseMoveY, setLastVerticalMouseMoveY] = useState(0);
  const [salvaImmagine, setSalvaImmagine] = useState(false);

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    if (prodotto) {
      nome.current!.value = prodotto.nome;
      prezzo.current!.value = prodotto.prezzo.toFixed(2);
      setFiltro(prodotto.categoria);
      descrizione.current!.value = prodotto.descrizione;
      setImageUrl(hostnameProductor + prodotto.indirizzo_img);

      setAllergeniScelti(prodotto.allergeni.split(","));
    } else {
      nome.current!.value = "";
      prezzo.current!.value = "";
      setFiltro(categoria);
      descrizione.current!.value = "";
      setImageUrl(null);
      setAllergeniScelti([]);
    }
  }, [prodotto]);

  const saveButton = () => {
    let nomeValue = "";
    if (nome.current) {
      nomeValue = nome.current.value;
    }
    const categoriaValue = filtro;

    let descrizioneValue = "";
    if (descrizione.current) {
      descrizioneValue = descrizione.current.value;
    }
    const allergeniValue = allergeniScelti;

    let prezzoValue = 0;
    if (prezzo.current) {
      prezzoValue = parseFloat(prezzo.current.value);
    }

    if (salvaImmagine === false) {
      if (
        nomeValue === "" ||
        categoriaValue === "" ||
        descrizioneValue === "" ||
        prezzoValue === 0
      ) {
        toast.error("Si prega di compilare tutti i campi.");
        return;
      }

      if (Number(prezzoValue) <= 0) {
        toast.error("Il prezzo deve essere maggiore di 0");
        return;
      }

      changeProdotto(
        localStorage.getItem("token") || "scu",
        prodotto.id,
        nomeValue,
        descrizioneValue,
        allergeniValue.join(","),
        prezzoValue,
        categoriaValue,
        1
      )
        .then((response) => {
          if (response === "Prodotto modificato") {
            getProdotti({ token: localStorage.getItem("token") || "scu" }).then(
              (res: any) => {
                if (res === "Token non valido") {
                  localStorage.removeItem("cart");
                  localStorage.removeItem("token");
                  localStorage.setItem("loggato", "false");
                } else {
                  setProdotti(res);
                }
              }
            );

            toast.success(response);
            setPopup(false);
          } else {
            toast.error("Errore nella modifica della pietanza");
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    } else {
      const immagineValue = image;
      if (
        nomeValue === "" ||
        categoriaValue === "" ||
        descrizioneValue === "" ||
        immagineValue === null ||
        prezzoValue === 0
      ) {
        toast.error("Si prega di compilare tutti i campi.");
        return;
      }

      if (Number(prezzoValue) <= 0) {
        toast.error("Il prezzo deve essere maggiore di 0");
        return;
      }

      // Aggiungi la pietanza
      const formData = new FormData();
      formData.append("id", prodotto.id);
      if (prezzoValue !== null)
        formData.append("prezzo", prezzoValue.toString());
      if (nomeValue !== null) formData.append("nome", nomeValue);
      formData.append("categoria", categoriaValue);
      if (descrizioneValue !== null)
        formData.append("descrizione", descrizioneValue);

      //allergeni seperati da virgola
      formData.append("allergeni", allergeniValue.join(","));
      formData.append("image", immagineValue);
      formData.append("disponibile", "1");

      changeProdottoImmagine(localStorage.getItem("token") || "scu", formData)
        .then((response) => {
          //estensione immagine
          const estensione = immagineValue.name.split(".").pop();
          if (response === "Prodotto modificato") {
            const tmp = prodotti.filter((item: any) => item.id !== prodotto.id);
            setProdotti(tmp);
            setProdotti([
              ...tmp,
              {
                id: prodotto.id,
                nome: nomeValue,
                prezzo: prezzoValue,
                categoria: categoriaValue,
                descrizione: descrizioneValue,
                allergeni: allergeniValue.join(","),
                indirizzo_img: "products/" + prodotto.id + "." + estensione,
              },
            ]);

            toast.success(response);
            setPopup(false);
          } else {
            toast.error("Errore nella modifica della pietanza");
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  };

  const submitButton = () => {
    let nomeValue = "";
    if (nome.current) {
      nomeValue = nome.current.value;
    }
    const categoriaValue = filtro;

    let descrizioneValue = "";
    if (descrizione.current) {
      descrizioneValue = descrizione.current.value;
    }
    const allergeniValue = allergeniScelti;
    const immagineValue = image;
    let prezzoValue = "";
    if (prezzo.current) {
      prezzoValue = prezzo.current.value;
    }

    if (
      nomeValue === "" ||
      categoriaValue === "" ||
      descrizioneValue === "" ||
      immagineValue === null ||
      prezzoValue === ""
    ) {
      toast.error("Si prega di compilare tutti i campi.");
      return;
    }

    if (Number(prezzoValue) <= 0) {
      toast.error("Il prezzo deve essere maggiore di 0");
      return;
    }

    // Aggiungi la pietanza
    const formData = new FormData();
    if (prezzoValue !== null) formData.append("prezzo", prezzoValue);
    if (nomeValue !== null) formData.append("nome", nomeValue);
    formData.append("categoria", categoriaValue);
    if (descrizioneValue !== null)
      formData.append("descrizione", descrizioneValue);

    //allergeni seperati da virgola
    formData.append("allergeni", allergeniValue.join(","));
    formData.append("image", immagineValue);
    formData.append("disponibile", "1");

    addProdotto(localStorage.getItem("token") || "scu", formData)
      .then((response) => {
        if (response === "Prodotto aggiunto con successo") {
          getProdotti({ token: localStorage.getItem("token") || "scu" }).then(
            (res: any) => {
              if (res === "Token non valido") {
                localStorage.removeItem("cart");
                localStorage.removeItem("token");
                localStorage.setItem("loggato", "false");
              } else {
                setProdotti(res);
              }
            }
          );

          toast.success(response);
          setPopup(false);
        } else {
          toast.error("Errore nell'aggiunta della pietanza");
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const handleAllergeni = (allergene: string) => {
    return () => {
      const index = allergeniScelti.indexOf(allergene);
      if (index === -1) {
        setAllergeniScelti([...allergeniScelti, allergene]);
      } else {
        setAllergeniScelti([
          ...allergeniScelti.slice(0, index),
          ...allergeniScelti.slice(index + 1),
        ]);
      }
    };
  };

  useEffect(() => {
    const handleHorizontalMouseMove = (event: MouseEvent) => {
      if (!isHorizontalMouseDown || !horizontalDivRef.current) return;

      const mouseX = event.clientX;
      const distance = mouseX - lastHorizontalMouseMoveX;
      horizontalDivRef.current.scrollLeft -= distance;

      setLastHorizontalMouseMoveX(mouseX);
    };

    const handleHorizontalMouseUp = () => {
      setIsHorizontalMouseDown(false);
    };

    document.addEventListener("mousemove", handleHorizontalMouseMove);
    document.addEventListener("mouseup", handleHorizontalMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleHorizontalMouseMove);
      document.removeEventListener("mouseup", handleHorizontalMouseUp);
    };
  }, [isHorizontalMouseDown, lastHorizontalMouseMoveX]);

  useEffect(() => {
    const handleVerticalMouseMove = (event: MouseEvent) => {
      if (!isVerticalMouseDown || !verticalDivRef.current) return;

      const mouseY = event.clientY;
      const distance = mouseY - lastVerticalMouseMoveY;
      verticalDivRef.current.scrollTop -= distance;

      setLastVerticalMouseMoveY(mouseY);
    };

    const handleVerticalMouseUp = () => {
      setIsVerticalMouseDown(false);
    };

    document.addEventListener("mousemove", handleVerticalMouseMove);
    document.addEventListener("mouseup", handleVerticalMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleVerticalMouseMove);
      document.removeEventListener("mouseup", handleVerticalMouseUp);
    };
  }, [isVerticalMouseDown, lastVerticalMouseMoveY]);

  const handleHorizontalMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setIsHorizontalMouseDown(true);
    setHorizontalMouseDownX(event.clientX);
    setLastHorizontalMouseMoveX(event.clientX);
  };

  const handleVerticalMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setIsVerticalMouseDown(true);
    setVerticalMouseDownY(event.clientY);
    setLastVerticalMouseMoveY(event.clientY);
  };

  const handleHorizontalWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (horizontalDivRef.current) {
      const scrollAmount = 1; // Puoi regolare la velocità di scrolling
      const scrollLeft =
        horizontalDivRef.current.scrollLeft + event.deltaY * scrollAmount;
      horizontalDivRef.current.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.warning("Si prega di selezionare solo file immagine.");
        return;
      }

      setImage(file);

      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        setImageUrl(imageUrl);
      };
      reader.readAsDataURL(file);
      setSalvaImmagine(true);
    }
  };

  return (
    <div
      className="fixed flex justify-center items-center inset-0 bg-slate-950 bg-opacity-20"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setPopup(false);
        }
      }}
    >
      <div className="bg-gialloSfondo w-[600px] h-[465px] shadow-lg rounded-2xl border-arancioneBordoHover border-[4px] ">
        <div className="flex justify-between">
          <div>
            <p className="font-bold text-xl pl-[15px] pt-[10px] select-none pointer-events-none text-marroneScuro">
              {prodotto ? "Modifica prodotto" : "Aggiungi una pietanza"}
            </p>
          </div>
          <button
            className="w-[30px] h-[30px] mr-[8px] mt-[8px] rounded-full flex items-center justify-center hover:cursor-pointer"
            onClick={() => setPopup(false)}
          >
            <img
              src={hostnameProductor + "x.png"}
              alt="close"
              className="w-[10px] h-[10px] transform transition-transform hover:scale-105 select-none pointer-events-none"
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(57%) sepia(5%) saturate(0%) hue-rotate(258deg) brightness(87%) contrast(94%)",
              }}
            />
          </button>
        </div>
        <div className="flex-col">
          <div className="flex pt-[10px]">
            <div className="w-1/2">
              <div className="pl-[15px]">
                <p className=" font-bold select-none pointer-events-none text-marroneScuro">
                  Nome
                </p>
                <Input
                  id="nome"
                  placeholder=""
                  type="text"
                  defaultValue=""
                  ref={nome}
                  className="w-[225px] mt-[5px] rounded-2xl border-[3px] border-arancioneChiaro  bg-gialloSfondo"
                />
              </div>
              <div className="pl-[15px] pt-[5px]">
                <p className=" font-bold select-none pointer-events-none text-marroneScuro">
                  Prezzo
                </p>
                <Input
                  id="prezzo"
                  placeholder=""
                  type="number"
                  defaultValue=""
                  ref={prezzo}
                  step="0.01"
                  min="0"
                  className="w-[75px] mt-[5px] rounded-2xl border-[3px] border-arancioneChiaro bg-gialloSfondo [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
              <div className="pl-[15px] pt-[5px]">
                <p className="font-bold select-none pointer-events-none text-marroneScuro">
                  Scegli la categoria
                </p>
                <div
                  className="flex overflow-auto w-[225px]"
                  style={{ scrollbarWidth: "none" }}
                  onMouseDown={handleHorizontalMouseDown}
                  onWheel={handleHorizontalWheel}
                  ref={horizontalDivRef}
                >
                  {filtro ? (
                    <div
                      className="bg-arancioneChiaro h-[25px] rounded-full inline-flex items-center px-3 mr-[10px] transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-arancioneBordo "
                      onClick={() => setFiltro("")}
                      id="divFiltro"
                    >
                      <img
                        className="w-[20px] ml-[-3px] mr-[3px] select-none pointer-events-none"
                        src={hostnameProductor + "filtri/" + filtro + ".webp"}
                      />
                      <p
                        className="capitalize text-[16px] select-none pointer-events-none text-marroneScuro"
                        id="filtroDaApplicare"
                      >
                        {filtro}
                      </p>
                    </div>
                  ) : (
                    <Filtri
                      filtro={filtro}
                      setFiltro={setFiltro}
                      categorie={categorie}
                      popup={true}
                      categorieFiltrate={categorie}
                    />
                  )}
                </div>
              </div>
              <div className="pl-[15px] pt-[5px]">
                <p className="font-bold select-none pointer-events-none text-marroneScuro">
                  Descrizione
                </p>
                <textarea
                  id="descrizione"
                  ref={descrizione}
                  rows={4}
                  cols={50}
                  className="w-[225px] h-[100px] mt-[5px] rounded-2xl px-[8px] border-[3px] border-arancioneChiaro bg-gialloSfondo overflow-auto"
                  style={{ scrollbarWidth: "none", resize: "none" }}
                />
              </div>
            </div>
            <div className="pl-[2svw] w-1/2">
              <div>
                <p className="font-bold select-none pointer-events-none text-marroneScuro">
                  Immagine
                </p>
                <div
                  onChange={handleImageChange}
                  className="w-[150px] h-[150px] mt-[5px] rounded-2xl flex justify-center items-center cursor-pointer transform transition-transform hover:scale-105 hover:bg-gialloSfondoHover"
                >
                  {imageUrl === null ? (
                    <div className="w-[150px] h-[150px] border-[3px] border-arancioneChiaro rounded-2xl flex justify-center items-center cursor-pointer">
                      <img
                        src={hostnameProductor + "plus.png"}
                        style={{
                          filter:
                            "invert(69%) sepia(59%) saturate(478%) hue-rotate(345deg) brightness(97%) contrast(85%)",
                          width: "60px",
                          height: "60px",
                          userSelect: "none",
                          pointerEvents: "none",
                        }}
                      />
                    </div>
                  ) : (
                    <div>
                      <img
                        src={imageUrl}
                        alt="Immagine caricata"
                        style={{
                          maxWidth: "100%",
                          maxHeight: "400px",
                          userSelect: "none",
                          pointerEvents: "none",
                        }}
                      />
                    </div>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-[100%] h-[100%] cursor-pointer fixed opacity-0"
                  />
                </div>
              </div>
              <div className="pt-[7px]">
                <p className="font-bold select-none pointer-events-none text-marroneScuro">
                  Allergeni
                </p>
                <div
                  className="flex overflow-auto w-[225px]"
                  style={{ scrollbarWidth: "none" }}
                >
                  <div
                    className="flex flex-wrap overflow-auto w-[225px] h-[120px]"
                    style={{ scrollbarWidth: "none" }}
                    onMouseDown={handleVerticalMouseDown}
                    ref={verticalDivRef}
                  >
                    {allergeni.map((allergene: any, index: number) => {
                      if (allergeniScelti.includes(allergene.nome)) {
                        return (
                          <div
                            key={index}
                            className="bg-verdeBordo h-[25px] rounded-full flex items-center px-3 mx-1 my-[2px] mr-[1%] transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-verdeBordoHover"
                            onClick={handleAllergeni(allergene.nome)}
                          >
                            <p className="capitalize text-[16px] select-none pointer-events-none text-gialloSfondo">
                              {allergene.nome}
                            </p>
                          </div>
                        );
                      } else {
                        return (
                          <div
                            key={index}
                            className="bg-arancioneChiaro h-[25px] rounded-full flex items-center px-3 mx-1 my-[2px] mr-[1%] transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-arancioneBordo"
                            onClick={handleAllergeni(allergene.nome)}
                          >
                            <p className="capitalize text-[16px] select-none pointer-events-none">
                              {allergene.nome}
                            </p>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            {prodotto ? (
              <>
                <div
                  style={{ backgroundColor: "#d24a3c" }}
                  className="w-[30px] h-[30px] flex justify-center rounded-full items-center my-[2px] mr-[2%] mt-[20px] transform transition-transform hover:scale-105 hover:cursor-pointer"
                  onClick={() => {
                    deleteProdotto(
                      localStorage.getItem("token") || "scu",
                      prodotto.id
                    )
                      .then((response) => {
                        if (response === "Prodotto eliminato") {
                          setProdotti(
                            prodotti.filter((p: any) => p.id !== prodotto.id)
                          );
                          toast.info(response);
                          setPopup(false);
                        } else {
                          toast.error(
                            "Errore nell'eliminazione della pietanza"
                          );
                        }
                      })
                      .catch((err: any) => {
                        console.log(err);
                      });
                  }}
                >
                  <img
                    src={hostnameProductor + "deleteBin.png"}
                    className="w-[18px] h-[18px]"
                    style={{
                      filter:
                        "brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(0%) hue-rotate(107deg) brightness(105%) contrast(102%)",
                    }}
                  />
                </div>
                <div
                  className="bg-verdeBordo h-[29px] rounded-full flex items-center px-8 py-[2px] mt-[20px] transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-verdeBordoHover"
                  id="divFiltro"
                  onClick={saveButton}
                >
                  <p
                    className="capitalize text-[16px] text-white select-none pointer-events-none"
                    id="filtroDaApplicare"
                  >
                    Salva
                  </p>
                </div>
              </>
            ) : (
              <div
                className="bg-verdeBordo h-[29px] rounded-full flex items-center px-8 py-[2px] mt-[20px] transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-verdeBordoHover"
                id="divFiltro"
                onClick={submitButton}
              >
                <p
                  className="capitalize text-[16px] text-white select-none pointer-events-none"
                  id="filtroDaApplicare"
                >
                  Aggiungi
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Toaster position="top-center" richColors />
    </div>
  );
}
