<h1 align="center">
📄<br>This is a project to perform automation for video creation..
</h1>

## 📚 About the project


>With this project, it's possible to create simple videos with images, text, and audio efficiently. The video's content is extracted from Wikipedia and organized into topics to make the process easier to follow. After organizing the content, an artificial intelligence is used to extract keywords from the text to search for images in the Google API.

>For example, when searching for the term "banana" on Wikipedia, the AI uses multiple texts to generate the keywords that will be used to search for images and create a more natural-sounding text. An example would be the returned content for the keyword "banana," which could include different types of bananas, such as plantains and apple bananas. We use these keywords to find the most relevant images for the video.

>In summary, this project enables the quick and efficient creation of videos using Wikipedia as a source of content and artificial intelligence to extract relevant keywords for creating text and searching for images.

---
## Getting Started

After cloning the project, run these two commands:

```bash
npm install
# and
npm start
```

## Generating the video.

Please use Insomnia or Postman to send a local request to the address http://localhost:3000/webhook. You must provide a JSON with the following structure, for example:


```
{
	"idioma":"pt",
	"busca":"pedro alvares cabral"
}
```

---

The "idioma" property is an important resource for Wikipedia as it allows the user to define the language that will be used to search for content. By selecting the desired language, the system will perform the search more efficiently and accurately, returning relevant information that conforms to the chosen language.


| code          | Language      |
| ------------- | ------------- |
|      pt       | Portuguese    |
|      en       | English       |
|      es       | Spanish       |

In the "Search" property, users can find specific content according to their interests. When it comes to a video, the "Search" property can be used to search for relevant keywords in the video's title, description, or tags, making it easier to discover and access specific content.

---

After that, let's understand the project structure and routes that you can use to test locally:

-Route routes/webhook/ POST -> create the main video.
-Route routes/webhook/ibm POST -> analyze the content with IBM's artificial intelligence [natural-language-understanding]((https://cloud.ibm.com/apidocs/natural-language-understanding))
-Route routes/webhook/wiki POST -> download content from [Wikipedia API](https://pt.wikipedia.org/wiki/Wikip%C3%A9dia:Central_de_pesquisas/Portal_de_dados/API).
-Route routes/webhook/ GET -> search for images to use in the video [Pexels](https://www.pexels.com/api/).
-Route routes/webhook/create-video GET -> generate a local video using [Canvas](https://www.npmjs.com/package/canvas) and [FFmpeg](https://ffmpeg.org/).
-Run http://localhost:3000 and use HTTP requests in your Postman or preferred API.

Remembering that it is essential to have two API Keys for the functioning of your video, which are:

[Google search](https://developers.google.com/custom-search/v1/introduction?hl=pt-br#identify_your_application_to_google_with_api_key), we use this API to search for images on Google Images, and the most interesting thing is that in this API we can customize to receive specific [parameters](https://developers.google.com/custom-search/v1/reference/rest/v1/cse/list?hl=pt-br) for image search.

[natural-language-understanding](https://cloud.ibm.com/apidocs/natural-language-understanding) This AI will help identify specific keywords in code snippets returned by Wikipedia, allowing for precise image searches and providing a more natural and intuitive experience when following the context of the video in each text segment. With the [DEMO](https://www.ibm.com/demos/live/natural-language-understanding/self-service/home), you can test by loading URLs or texts for the AI to analyze.


## Feel free to contribute to this project. :)
