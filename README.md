

<h1 align="center">
📄<br>Este é um projeto para realizar uma automação para criação de videos.
</h1>

## 📚 Ebook

>Com esse projeto é possível criar vídeos simples, com imagens, textos e áudio.
O conteúdo do vídeo tiramos do Wikipedia, no qual “limpamos” em tópicos para conseguir montar a rotina.
Com o conteúdo limpo é utilizado uma IA para abstrair keywords desses textos.
Por exemplo quando pesquisamos o termo “banana” no Wikipedia, teremos
Muitos textos na qual a IA usa para gerar as keywords, que usaremos para buscar as imagens e criar o texto mais natural
Um exemplo é que nesse retorno do conteúdo “banana” é tipos de bananas por exemplo banana da terra, banana maçã. Que usamos essas keywords para encontrar as imagens.


---
## Getting Started

Após clonar o projeto rodar esses dois comandos:

```bash
npm install
# and
npm start
```
Após isso vamos entender a estrutura do projeto e rotas que vcoê pode usar para testar localmente





- Rota `routes/webhook/ibm` POST ->  para analisar o conteúdo com a inteligência artificial da IBM  [natural-language-understanding](https://cloud.ibm.com/apidocs/natural-language-understanding)
- Rota `routes/webhook/` POST ->  para baixar o conteúdo do [wikipedia API](https://pt.wikipedia.org/wiki/Wikip%C3%A9dia:Central_de_pesquisas/Portal_de_dados/API)
- Rota `routes/webhook/` GET ->  para buscar imagens para usar no video [pexels](https://www.pexels.com/api/)
- Rota `routes/webhook/create-video` GET -> para gerar um video local utilizando [canvas](https://www.npmjs.com/package/canvas) e [ffmpeg](https://ffmpeg.org/)
- Rode [http://localhost:3000](http://localhost:3000) as requisições HTTP em seu postman ou API da sua preferência.

## ESSE PROJETO AINDA ESTA EM DESENVOLVIMENTO :)

