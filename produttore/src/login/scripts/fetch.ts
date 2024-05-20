import axios from "axios";
import { log } from "console";
import { sha256 } from "js-sha256";

const urlServer =
  (process.env.REACT_APP_HOSTNAME || "") +
  (process.env.REACT_APP_FETCH_PORT || "");

type datiReg = {
  nome: string;
  cognome: string;
  email: string;
  password: string;
  confirm_password: string;
  cliente: any;
  id_mensa: any;
};
type datiLog = {
  email: string;
  password: string;
};

export async function registerUser(dati: datiReg) {
  let data = JSON.stringify({
    ...dati,
    password: sha256.create().update(dati.password).hex(),
    confirm_password: sha256.create().update(dati.confirm_password).hex(),
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${urlServer}/register/user`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  let response;

  await axios
    .request(config)
    .then((res) => {
      response = res.data;
      console.log("Risposta " + response);
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
}

export async function loginUser(dati: datiLog) {
  let data = JSON.stringify({
    ...dati,
    password: sha256.create().update(dati.password).hex(),
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${urlServer}/login/user`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  let response;

  await axios
    .request(config)
    .then((res) => {
      response = res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
}

export async function getProdotti(token: { token: string }) {
  let response;

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${urlServer}/request/products`,
    headers: {
      Authorization: "Bearer " + token.token,
    },
  };

  await axios
    .request(config)
    .then((res) => {
      response = res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
}

//make a function that takes categories
export async function getCategorie(token: { token: string }) {
  let response;

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${urlServer}/request/categories`,
    headers: {
      Authorization: "Bearer " + token.token,
    },
  };

  await axios
    .request(config)
    .then((res) => {
      response = res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
}

export async function getAllergeni(token: { token: string }) {
  let response;

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${urlServer}/request/allergens`,
  };

  await axios
    .request(config)
    .then((res) => {
      response = res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
}

export async function addProdotto(token: string, dati: any) {
  let response;

  console.log("Token:" + token);

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${urlServer}/producer/add/product`,
    headers: {
      Authorization: "Bearer " + token,
    },
    data: dati,
  };

  await axios
    .request(config)
    .then((res) => {
      response = res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
}

export async function getOrdini(token: { token: string }) {
  let response;

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${urlServer}/producer/get/orders`,
    headers: {
      Authorization: "Bearer " + token.token,
    },
  };

  await axios
    .request(config)
    .then((res) => {
      response = res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
}

export async function getOrdine(token: { token: string }, id_ordine: number) {
  let response;

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${urlServer}/producer/get/order`,
    headers: {
      Authorization: "Bearer " + token.token,
    },
    data: new URLSearchParams({
      id_ordine: id_ordine.toString(),
    }),
  };

  await axios
    .request(config)
    .then((res) => {
      response = res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
}

export async function updateOrdine(
  token: string,
  id_ordine: number,
  stato_ordine: string
) {
  let response;

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${urlServer}/producer/change/order`,
    headers: {
      Authorization: "Bearer " + token,
    },
    data: new URLSearchParams({
      id_ordine: id_ordine.toString(),
      stato_ordine: stato_ordine,
    }),
  };

  await axios
    .request(config)
    .then((res) => {
      response = res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
}

export async function deleteOrdine(token: string, id_ordine: number) {
  let response;

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${urlServer}/producer/delete/order`,
    headers: {
      Authorization: "Bearer " + token,
    },
    data: new URLSearchParams({
      id_ordine: id_ordine.toString(),
    }),
  };

  await axios
    .request(config)
    .then((res) => {
      response = res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
}

export async function getInformazioniMensa(token: string) {
  let response;

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${urlServer}/request/mensa`,
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  await axios
    .request(config)
    .then((res) => {
      response = res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
}

export async function getTopProdotti(token: string, periodo: string) {
  let response;

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${urlServer}/producer/get/top10Products`,
    headers: {
      Authorization: "Bearer " + token,
    },
    data: new URLSearchParams({
      periodo: periodo.toString(),
    }),
  };

  await axios
    .request(config)
    .then((res) => {
      response = res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
}

export async function getStatMensa(token: string, periodo: string) {
  let response;

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${urlServer}/producer/get/stats`,
    headers: {
      Authorization: "Bearer " + token,
    },
    data: new URLSearchParams({
      periodo: periodo.toString(),
    }),
  };

  await axios
    .request(config)
    .then((res) => {
      response = res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
}

export async function getProdottiCompletati(token: string) {
  let response;

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${urlServer}/producer/get/orders/completed`,
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  await axios
    .request(config)
    .then((res) => {
      response = res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
}

export async function deleteMensa(token: string, password: string) {
  let response;

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${urlServer}/producer/delete/mensa`,
    headers: {
      Authorization: "Bearer " + token,
    },
    data: new URLSearchParams({
      password: password,
    }),
  };

  await axios
    .request(config)
    .then((res) => {
      response = res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
}
