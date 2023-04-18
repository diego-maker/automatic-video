//LIBS T
import express from 'express';

// controllers

import wikipediaSearch from '../source/controller/search-wikipedia-sentece.js';
import naturalLanguage from '../source/controller/language-terms.js';
import { createMasterVideo } from '../source/controller/create-video.js';
import searchImages from '../source/controller/search-images-google.js'

const router = express.Router();


router.post('/', async (req, res) => { //rota principal para criar o video
  try {

    const { idioma, busca } = req.body;


    const topicos = await wikipediaSearch(busca, idioma);

    
    if (topicos === false) {
      res.status(400).send({
        error: "Pesquisa não encontrada no wikipedia, tente outro termo de busca!"
      })
      return
    }


    const response = await createMasterVideo(idioma, topicos, busca);

    res.status(200).send({
      data: response
    })



  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Erro ao buscar informações na Wikipedia' });
  }

});


router.post('/ibm', async (req, res) => { //teste de envio ao waston natural-language-understanding
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

router.post('/wiki', async (req, res) => { //teste de busca no wikipedia
  try {
    const term = 'o que é';
    const subject = 'banana';
    
    wikipediaSearch(req,term, subject)
      .then((searchResults) => {
        res.send({data: searchResults});
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send({ error: 'Erro ao buscar informações no wiki', data: error });
      });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Erro ao buscar informações no wiki', data: error });
  }

});


router.get('/', (req, res) => { // teste de busca de imagens 

  searchImages('banana', 'pt').then((imageUrl) => {
    console.log(imageUrl);
    res.status(200).send({
      data: imageUrl
    })
    // Imprime a URL da imagem da banana em tamanho de pré-visualização
  });


})


router.get('/create-video', async (req, res) => { // teste de criação de video

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