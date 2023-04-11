//LIBS T
import express from 'express';
// controllers
import searchImages from '../source/controller/search-images.js';
import wikipediaTerms from '../source/controller/search-wikipedia.js';
import naturalLanguage from '../source/controller/language-terms.js';
import contexLanguage from '../source/controller/create-context.js';
import { createMasterVideo } from '../source/controller/create-video.js';

const router = express.Router();


router.post('/ibm', async (req, res) => {
  try {
    const language = await naturalLanguage(req.body.principal);

    res.status(200).send({
      pesquisa: `${req.body.principal}`,
      language: language
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Erro ao buscar informações na IBM' });
  }

});

router.post('/', async (req, res) => {
  try {

    const { principal, idioma } = req.body;

    const title = principal;
    const lang = idioma;
    const url = `https://${lang}.wikipedia.org/api/rest_v1/page/html/${title}`;

    const topicos = await wikipediaTerms(req);

    if (topicos === false) {
      res.status(400).send({
        error: "Pesquisa não encontrada no wikipedia, tente outro termo de busca!"
      })
      return
    }

    let topicosSanitize = topicos
      .filter((topicos) => {
        return (
          topicos.titulo == 'History' ||
          topicos.titulo == 'História'
        );
      })
      .map((topicos) => {
        return { titulo: `${topicos.titulo}`, conteudo: topicos.conteudo };
      });




    // const language = await naturalLanguage(url);

    // let images = await searchImages(title,idioma);

     const images = [
      'https://images.pexels.com/photos/351283/pexels-photo-351283.jpeg',
      'https://images.pexels.com/photos/1266446/pexels-photo-1266446.jpeg',
      'https://images.pexels.com/photos/1191548/pexels-photo-1191548.jpeg',
      'https://images.pexels.com/photos/709552/pexels-photo-709552.jpeg',
      'https://images.pexels.com/photos/2438/nature-forest-waves-trees.jpg'
    ]

    topicosSanitize[0].conteudo.shift();

    const response = await createMasterVideo(images, topicosSanitize);

    res.status(200).send({
      data: topicosSanitize
    })



  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Erro ao buscar informações na Wikipedia' });
  }

});




router.get('/', (req, res) => {

  searchImages('falsas bananas').then((imageUrl) => {
    console.log(imageUrl);
    res.status(200).send({
      data: imageUrl
    })
    // Imprime a URL da imagem da banana em tamanho de pré-visualização
  });


})


router.get('/create-video', async (req, res) => {

  let video = [
    'https://images.pexels.com/photos/5966630/pexels-photo-5966630.jpeg',
    'https://images.pexels.com/photos/16055440/pexels-photo-16055440.jpeg',
    'https://images.pexels.com/photos/15824258/pexels-photo-15824258.jpeg'
  ]

  const response = await createMasterVideo(video);

  res.status(200).send({
    data: response
  })

})



export default router;