import axios from "axios";

const apiKey = process.env.APIKEY

const searchImages = async (req, idioma) => {

  console.log(req)
  let str = req;
  if (str.indexOf(" ") !== -1) {
    str = str.replace(/ /g, "%20");
  }
  const searchTerm = str;
  // console.log( term + ' ' + subject)
  let apiUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&q=${searchTerm}&searchType=image&fileType=jpg&imgSize=xlarge&num=1`;
  let response = await axios.get(apiUrl);


  const pages = response.data.items[0].link;
 
 
return pages

};

export default searchImages;

