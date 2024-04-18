import axios from "axios";

const url = "http://localhost:6969";

export async function getProdotti(token: { token: string }) {
  let response;

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${url}/request/products`,
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
