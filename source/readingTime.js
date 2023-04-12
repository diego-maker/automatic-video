
const reandingTime = (texto) =>{  // DEFINIMOS O TEMPO DE LEITURA DE CADA TRECHO DE TEXTO

  // Estimar a velocidade de leitura em palavras por minuto
  const velocidadeDeLeitura = 250;
  // Contar o número de palavras no texto
  const numeroDePalavras = texto.trim().split(/\s+/).length;
  // Calcular o tempo estimado em segundos
  const tempoEstimado = Math.round((numeroDePalavras / velocidadeDeLeitura) * 60);
  return tempoEstimado;
}


export default reandingTime