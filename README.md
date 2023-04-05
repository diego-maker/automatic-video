

<h1 align="center">
📄<br>Este é um projeto para realizar uma automação para criação de videos.
</h1>

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

