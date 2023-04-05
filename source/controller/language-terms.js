import axios from "axios";


const naturalLanguage = async (terms) => {
  const apiKey = process.env.URL;
  let  url = process.env.URL;

  url = `${url}/v1/analyze?version=2022-04-07`;

  const data = {
    url: terms,
    features: {
      entities: {
        emotion: true,
        sentiment: true,
        limit: 1
      },
      keywords: {
        emotion: true,
        sentiment: true,
        limit: 1
      },
      concepts: {
        limit: 1
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
  console.log(response.data);
})
.catch(error => {
  console.log(error);
});

}


export default naturalLanguage;