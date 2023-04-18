import axios from "axios";


const searchImages = async (req, idioma,busca) => {

  let str = req;
  if (str.indexOf(" ") !== -1) {
    str = str.replace(/ /g, "%20");
  }
  const searchTerm = str;


  if (busca.indexOf(" ") !== -1) {
    busca = busca.replace(/ /g, "%20");
  }
  const searchTermPrincipal = busca;
 
  let apiUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=a2fec0f4d84354f38&q=${searchTermPrincipal}%20${searchTerm}&searchType=image&fileType=jpg&imgSize=xlarge&num=1`;
  let response = await axios.get(apiUrl);


  const pages = response.data.items[0].link;
 
 
return pages

};

export default searchImages;

