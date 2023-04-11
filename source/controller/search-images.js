import axios from "axios";
import imageLocale from "../imageLocale.js";

// const apiKey = process.env.IMAGE_KEY;



const searchImages = async (searchTerm,local) => { //recebe o termo para buscar a imagem principal

  const locale = imageLocale(local)
  
  const url = `https://api.pexels.com/v1/search?query=${searchTerm}&per_page=3&locale=${locale}`;
  const headers = { Authorization: `${apiKey}` };
  let images = []
  try {
    const response = await axios.get(url, { headers });
    if (response.status === 200) {
      const image = response.data; // Obter a primeira imagem retornada na pesquisa
   
      images[0] = image.photos[0].src.original;
      images[1] = image.photos[1].src.original;
      images[2] = image.photos[2].src.original;

      return images // Retornar a URL da imagem em tamanho de pré-visualização
    }
  } catch (error) {
    console.error(error);
  }


}


export default searchImages