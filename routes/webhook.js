//LIBS T
import express from 'express';
// controllers
import searchImages from '../source/controller/search-images.js';
import wikipediaTerms from '../source/controller/search-wikipedia.js';
import naturalLanguage from '../source/controller/language-terms.js';
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
    const topicos = await wikipediaTerms(req);

    const topicosSanitize = topicos
      .filter((topicos) => {
        return (
          topicos.titulo == 'Principal' ||
          topicos.titulo == 'Características' ||
          topicos.titulo == 'História'
        );
      })
      .map((topicos) => {
        return { titulo: `${topicos.titulo}`, conteudo: topicos.conteudo };
      });
 
    topicosSanitize.forEach((element,index)=>{

      if(element.titulo == 'Principal' ){
        console.log(element.conteudo)
      }
    })

  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Erro ao buscar informações na Wikipedia' });
  }

});



router.get('/', (req, res) => {

  searchImages('banana-pão').then((imageUrl) => {
    console.log(imageUrl);
    res.status(200).send({
      data: imageUrl
    })
    // Imprime a URL da imagem da banana em tamanho de pré-visualização
  });


})


router.get('/create-video', async (req, res) => {

  const response = await createMasterVideo('kias');

  res.status(200).send({
    data: response
  })

})



export default router;