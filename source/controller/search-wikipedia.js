import axios from "axios";
import sanitizeTerms from '../helper.js';

const wikipediaTerms = async (data)  => { // BUSCA O CONTEÚDO DO VIDEO NO WIKIPEDIA GENERICAMENTE, ESSA FUNÇÃO DESABILITEI 

  const { principal, idioma } = data.body;


  const title = principal;
  const lang = idioma;
  const url = `https://${lang}.wikipedia.org/api/rest_v1/page/html/${title}`; 

  return axios.get(url)
    .then(response => {
      // console.log(response.data)
      const topicos = sanitizeTerms(response.data);
      return topicos;
    })
    .catch(error => {
      return false;
    });
}

export default wikipediaTerms;
