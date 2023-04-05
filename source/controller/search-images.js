import axios from "axios";
const apiKey = process.env.IMAGE_KEY;


const searchImages = async (searchTerm) => { //recebe o termo para buscar a imagem principal

  const url = `https://api.pexels.com/v1/search?query=${searchTerm}&per_page=3`;
  const headers = { Authorization: `${apiKey}` };
  
  try {
    const response = await axios.get(url, { headers });
    if (response.status === 200) {
      const image = response.data; // Obter a primeira imagem retornada na pesquisa
      return image; // Retornar a URL da imagem em tamanho de pré-visualização
    }
  } catch (error) {
    console.error(error);
  }


}


export default searchImages