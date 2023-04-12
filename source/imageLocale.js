


const imageLocale = (locale) => { // DEFINE EM QUAL IDIOMA BUSCADO DAS IMAGENS
  // definindo objeto
  const data ={
    en:'en-US',
    pt:'pt-BR'
  }

  return data[locale]  // acessando a propriedade
}

export default imageLocale