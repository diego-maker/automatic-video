


const imageLocale = (locale) => {
  // definindo objeto
  const data ={
    en:'en-US',
    pt:'pt-BR'
  }

  return data[locale]  // acessando a propriedade
}

export default imageLocale