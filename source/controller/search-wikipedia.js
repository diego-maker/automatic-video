import axios from "axios";
import sanitizeTerms from '../helper.js';

const wikipediaTerms = async (data)  => {

  const { principal, idioma } = data.body;


  const title = principal;
  const lang = idioma;
  const url = `https://${lang}.wikipedia.org/api/rest_v1/page/html/${title}`;

  return axios.get(url)
    .then(response => {
      const topicos = sanitizeTerms(response.data);
      return topicos;
    })
    .catch(error => {
      throw error;
    });
}

export default wikipediaTerms;