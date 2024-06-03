export function formatData(data: Date) {
  // Cria um objeto Date a partir da string de data fornecida
  const dataObj = new Date(data);

  // Extrai os componentes da data
  const ano = dataObj.getFullYear();
  const mes = String(dataObj.getMonth() + 1).padStart(2, "0"); // adiciona um zero à esquerda se necessário
  const dia = String(dataObj.getDate()).padStart(2, "0");
  const horas = String(dataObj.getHours()).padStart(2, "0");
  const minutos = String(dataObj.getMinutes()).padStart(2, "0");
  const segundos = String(dataObj.getSeconds()).padStart(2, "0");

  // Retorna a data formatada no formato desejado
  return `${ano}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
}
