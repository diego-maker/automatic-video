import axios from "axios";


const contexLanguage = async (terms) => { // BUSCA O CONTEXTO DE CADA IMAGEM
  // const apiKey = process.env.URL;
  // let  url = process.env.URL;


  url = `${url}/v1/analyze?version=2022-04-07`;

  const data = {
    text: terms,
    features: {
      entities:{
        limit:1
      }
    }
  };


return axios({
  method: 'POST',
  url: url,
  auth: {
    username: 'apikey',
    password: apiKey
  },
  headers: {
    'Content-Type': 'application/json'
  },
  data: data
})
.then(response => {
  return response.data;
})
.catch(error => {
  return error;
});

}


export default contexLanguage;