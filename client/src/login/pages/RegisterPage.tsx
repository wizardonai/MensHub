import { useReducer, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../scripts/fetch";
import { styleMap } from "../../App";

import { useTheme } from "next-themes";

import { Button } from "../../shadcn/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../shadcn/Card";
import { Input } from "../../shadcn/Input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../shadcn/Select";

const RegisterPage = () => {
  const { resolvedTheme } = useTheme();
  const navigate = useNavigate();
  const [errore, setErrore] = useState({
    presente: false,
    messaggio: <></>,
  });

  const email = useRef(null);
  const password = useRef(null);
  const nome = useRef(null);
  const cognome = useRef(null);
  const confermaPassword = useRef(null);
  const emailMensa = useRef(null);
  const telefono = useRef(null);
  const [ruolo, setRuolo] = useState("");
  const nomeMensa = useRef(null);
  const indirizzo = useRef(null);
  const [mostraReg, setMostraReg] = useState(false);

  const submitRegisterCliccato = () => {
    setErrore({
      presente: false,
      messaggio: <></>,
    });

    // @ts-ignore
    const valueEmail = email.current.value;
    // @ts-ignore
    const valuePassword = password.current.value;
    // @ts-ignore
    const valueNome = nome.current.value;
    // @ts-ignore
    const valueCognome = cognome.current.value;
    // @ts-ignore
    const valueConfermaPassowrd = confermaPassword.current.value;

    let errore = false;

    if (
      valueEmail === "" ||
      valueNome === "" ||
      valueCognome === "" ||
      valuePassword === "" ||
      valueConfermaPassowrd === ""
    ) {
      setErrore((prev) => ({
        presente: true,
        messaggio: (
          <>
            <>Compilare tutti i campi!</>
            <br />
          </>
        ),
      }));
      errore = true;
    }

    if (valuePassword !== valueConfermaPassowrd) {
      setErrore((prev) => ({
        presente: true,
        messaggio: (
          <>
            {prev.messaggio} Password e conferma password devono corrispondere!{" "}
            <br />
          </>
        ),
      }));
      errore = true;
    }

    if (!errore) {
      registerUser({
        nome: valueNome,
        cognome: valueCognome,
        email: valueEmail,
        password: valuePassword,
        confirm_password: valueConfermaPassowrd,
        ruolo: ruolo,
      }).then((res) => {
        if (res !== "Registrazione avvenuta con successo") {
          setErrore((prev) => ({
            presente: true,
            messaggio: (
              <>
                {prev.messaggio} {res}
                <br />
              </>
            ),
          }));
          errore = true;
        } else {
          navigate("/login");
        }
      });
    }
  };

  //
  //
  // stili
  //
  const css: styleMap = {
    pageLogin: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100svw",
      minHeight: "100svh",
      background: "#f5f5f5",
      overflowY: "scroll",
    },
    card: {
      margin: "5%",
      width: "14svh",
      height: "14svh",
      background: resolvedTheme === "dark" ? "black" : "white",
      borderRadius: "10%",
      border: "1px solid lightgrey",
    },
  };

  return (
    <div style={css.pageLogin}>
      {ruolo === "" ? (
        <>
          <Card className=" w-[350px]">
            <CardHeader>
              <CardTitle>Come vuoi usare MensApp?</CardTitle>
              <CardDescription>Scegliere il tipo di accont.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <div
                  style={css.card}
                  onClick={() => {
                    setRuolo("consumatore");
                    setMostraReg(true);
                  }}
                >
                  <p>Cliente</p>
                </div>
                <div style={css.card} onClick={() => setRuolo("produttore")}>
                  <p>Produttore</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <div onClick={() => navigate("/login")}>Login</div>
              </Button>
            </CardFooter>
          </Card>
        </>
      ) : ruolo === "produttore" && !mostraReg ? (
        <div className="flex flex-col justify-between items-center my-5">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Registrazione Mensa</CardTitle>
              <CardDescription>Inserire i dati della mensa.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Input
                    id="nomeMensa"
                    placeholder="Nome mensa"
                    type="text"
                    defaultValue=""
                    ref={nomeMensa}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Input
                    id="indirizzo"
                    placeholder="Indirizzo"
                    type="text"
                    defaultValue=""
                    ref={indirizzo}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Input
                    id="emailMensa"
                    placeholder="Email di recapito"
                    type="email"
                    defaultValue=""
                    ref={emailMensa}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Input
                    id="telefono"
                    placeholder="Telefono"
                    type="number"
                    defaultValue=""
                    ref={telefono}
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <p
                  className={
                    "text-center" + resolvedTheme === "dark"
                      ? "text-white"
                      : "text-black"
                  }
                >
                  {errore.messaggio}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <div
                  onClick={() => {
                    setRuolo("");
                  }}
                >
                  Indietro
                </div>
              </Button>
              <Button asChild>
                <div
                  onClick={() => {
                    // @ts-ignore
                    const valueNomeMensa = nomeMensa.current.value;
                    // @ts-ignore
                    const valueIndirizzo = indirizzo.current.value;
                    // @ts-ignore
                    const valueEmailMensa = emailMensa.current.value;
                    // @ts-ignore
                    const valueTelefono = telefono.current.value;
                    if (
                      valueNomeMensa === "" ||
                      valueIndirizzo === "" ||
                      valueEmailMensa === "" ||
                      valueTelefono === ""
                    ) {
                      setErrore((prev) => ({
                        presente: true,
                        messaggio: (
                          <>
                            <>Compilare tutti i campi!</>
                            <br />
                          </>
                        ),
                      }));
                    } else {
                      setErrore((prev) => ({
                        presente: false,
                        messaggio: <></>,
                      }));
                      setMostraReg(true);
                    }
                  }}
                >
                  Continua
                </div>
              </Button>
            </CardFooter>
          </Card>
        </div>
      ) : null}

      {mostraReg ? (
        <div className="flex flex-col justify-between items-center my-5">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Registrati</CardTitle>
              <CardDescription>
                Inserire i dati per la registrazione.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  {/* <Label htmlFor='nome'>Nome</Label> */}
                  <Input
                    id="nome"
                    placeholder="Nome"
                    type="text"
                    defaultValue=""
                    ref={nome}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  {/* <Label htmlFor='cognome'>Cognome</Label> */}
                  <Input
                    id="cognome"
                    placeholder="Cognome"
                    type="text"
                    defaultValue=""
                    ref={cognome}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  {/* <Label htmlFor='email'>Email</Label> */}
                  <Input
                    id="email"
                    placeholder="Email"
                    type="email"
                    defaultValue=""
                    ref={email}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  {/* <Label htmlFor='password'>Password</Label> */}
                  <Input
                    id="password"
                    placeholder="Password"
                    type="password"
                    defaultValue=""
                    ref={password}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  {/* <Label htmlFor='confermaPassword'>Conferma password</Label> */}
                  <Input
                    id="confermaPassword"
                    placeholder="Conferma password"
                    type="password"
                    defaultValue=""
                    ref={confermaPassword}
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <p
                    className={
                      "text-center" + resolvedTheme === "dark"
                        ? "text-white"
                        : "text-black"
                    }
                  >
                    {errore.messaggio}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <div onClick={() => navigate("/login")}>Login</div>
              </Button>
              <Button asChild>
                <div onClick={submitRegisterCliccato}>Registrati</div>
              </Button>
            </CardFooter>
          </Card>
        </div>
      ) : null}
    </div>
  );
};

export default RegisterPage;
