import axios from "axios";

const wikipediaSearch = async (req, idioma) => {

  let str = req;
  if (str.indexOf(" ") !== -1) {
    str = str.replace(/ /g, "%20");
  }
  const searchTerm = str;
  // console.log( term + ' ' + subject)
  let apiUrl = `https://${idioma}.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${searchTerm}&redirects=1`; [
   // Lista conteúdos relacionado a um termo de busca 
  let response = await axios.get(apiUrl);


  const pages = response.data.query;
  let pageId;
  let content;

  if (pages.search[0] != undefined) {
    pageId = pages.search[0].pageid;

  } else {
    return false
  }

  apiUrl = `https://${idioma}.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&pageids=${pageId}&explaintext=1`;
  // se existir o conteudo vai retornar o primeiro da lista
  response = await axios.get(apiUrl);

  content  = response.data.query.pages[pageId].extract;

  content = content.split('.')

  return content

};

export default wikipediaSearch;

