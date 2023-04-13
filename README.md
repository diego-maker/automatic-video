

<h1 align="center">
📄<br>Este é um projeto para realizar uma automação para criação de videos.
</h1>

## 📚 Sobre o projeto

>Com este projeto, é possível criar vídeos simples, com imagens, textos e áudio de forma eficiente. O conteúdo do vídeo é extraído da Wikipedia, e é organizado em tópicos para tornar a rotina mais fácil de ser seguida. Após a organização do conteúdo, uma inteligência artificial é utilizada para extrair palavras-chave desses textos.

>Por exemplo, ao pesquisar o termo "banana" na Wikipedia, a IA usa muitos textos para gerar as palavras-chave que serão usadas para buscar imagens e criar um texto mais natural. Um exemplo seria o retorno de conteúdo para a palavra-chave "banana", que poderia incluir diferentes tipos de bananas, como banana-da-terra e banana-maçã. Usamos essas palavras-chave para encontrar as imagens mais relevantes para o vídeo.

>Em resumo, este projeto permite criar vídeos de forma rápida e eficiente, usando a Wikipedia como fonte de conteúdo e uma inteligência artificial para extrair palavras-chave relevantes para a criação do texto e a busca de imagens.


---
## Getting Started

Após clonar o projeto rodar esses dois comandos:

```bash
npm install
# and
npm start
```

## Gerando o video

Utilize o Insomnia ou o Postman para enviar a requisição local no endereço `http://localhost:3000/webhook`
Você deve fornecer um json com a seguinte estrutura por exemplo:

```
{
	"idioma":"pt",
	"busca":"pedro alvares cabral"
}
```
---
Na propriedade "Idioma" é um recurso importante para o Wikipedia, pois permite definir o idioma que será utilizado na busca do conteúdo. Ao selecionar o idioma desejado, o sistema irá realizar a busca de forma mais eficiente e precisa, retornando informações relevantes e em conformidade com a língua escolhida.

| código        | Idioma        |
| ------------- | ------------- |
|      pt       | Portugês      |
|      en       | Inglês        |
|      es       | Espanhol      |

Na propriedade "Busca" é um recurso utilizado que permite aos usuários encontrar conteúdos específicos de acordo com seus interesses. Quando se trata de um vídeo, a propriedade "Busca" pode ser usada para procurar palavras-chave relevantes no título, descrição ou tags do vídeo, facilitando a descoberta e o acesso a conteúdos específicos.

---
Após isso vamos entender a estrutura do projeto e rotas que vcoê pode usar para testar localmente

- Rota `routes/webhook/` POST ->  criar o video principal 
- Rota `routes/webhook/ibm` POST ->  analisar o conteúdo com a inteligência artificial da IBM  [natural-language-understanding](https://cloud.ibm.com/apidocs/natural-language-understanding)
- Rota `routes/webhook/wiki` POST ->  baixar o conteúdo do [wikipedia API](https://pt.wikipedia.org/wiki/Wikip%C3%A9dia:Central_de_pesquisas/Portal_de_dados/API)
- Rota `routes/webhook/` GET ->  buscar imagens para usar no video [pexels](https://www.pexels.com/api/)
- Rota `routes/webhook/create-video` GET -> gerar um video local utilizando [canvas](https://www.npmjs.com/package/canvas) e [ffmpeg](https://ffmpeg.org/)
- Rode [http://localhost:3000](http://localhost:3000) as requisições HTTP em seu postman ou API da sua preferência.

Lembrando é imprescindível ter duas APIs KEYs para funcionamento do seu video que são:

[Google search](https://developers.google.com/custom-search/v1/introduction?hl=pt-br#identify_your_application_to_google_with_api_key), usamos essa API para buscar no google images, o mais interessante é que nessa API podemos personalizar para receber [parâmetros](https://developers.google.com/custom-search/v1/reference/rest/v1/cse/list?hl=pt-br) especificos de busca de imagens

[natural-language-understanding](https://cloud.ibm.com/apidocs/natural-language-understanding) Esta inteligência artificial ajudará a identificar chaves específicas em trechos de códigos retornado pelo wikipedia, permitindo a busca de imagens precisas e proporcionando uma experiência mais natural e intuitiva ao acompanhar o contexto do vídeo em cada segmento de texto, com o [DEMO](https://www.ibm.com/demos/live/natural-language-understanding/self-service/home) você pode testar carregando URL ou Textos para a IA analisar 


## Fique à vontade para contribuir com esse projeto. :)

