import cheerio from 'cheerio';


const sanitizeTerms = (terms) => { // LIMPAR O CONTEÚDO DO WIKIPEDIA E RETORNAR EM TÓPICOS

  // faça o processamento necessário com a resposta da API do Wikipedia aqui
  const html = terms;
  const $ = cheerio.load(html);

  
  // Seleciona todos os elementos <style> e <script> e os remove do HTML
  $('style, script').remove();

  
  // Seleciona o conteúdo do corpo da página
  const conteudo = $('body').html();


  let cleanData = conteudo.replace(/<section\b[^>]*>(.*?)<\/section>/gi, '');

  // Remover todos os atributos HTML
  cleanData = cleanData.replace(/<[a-z][^>]*>/gi, (match) => {
    return match.replace(/(\w+)=['"]([^'"]*)['"]/gi, '');
  });

  let topicos = [];

  cleanData = cleanData.split('h2')


  const regex = /(<([^>]+)>|\n|&nbsp;|• L&nbsp;|&quot;|\")/gi;
  let cleanText = cleanData[0].replace(regex, "");
  
  const separadores = /\[\d+\]/; // Expressão regular que identifica os separadores `[32],[33],[34],[35],[36]`

  cleanText = cleanText.replace(regex, "");
  cleanText = cleanText.split(separadores);
  cleanText = cleanText.filter(trecho => trecho.trim());
  // cleanText = cleanText.replace(/^Main article:\s+/i, "");


  $('h2').each((index, element) => {
    let conteudoTopico = $(element).nextUntil('h2').map((index, el) => $(el).html()).get().join('');
    conteudoTopico = conteudoTopico.replace(regex, "");
    conteudoTopico = conteudoTopico.split(separadores);
    conteudoTopico = conteudoTopico.filter(trecho => trecho.trim());

    topicos.push({
      titulo: $(element).text(),
      conteudo: conteudoTopico
    });
  });

  topicos.unshift({
    titulo: 'Principal',
    conteudo: cleanText
  });

  return topicos
}

export default sanitizeTerms