async function fetchDados() {
  try {
    const response = await fetch("/dados");
    const dados = await response.json();

    // Mapeia os dados para os arrays necessários
    const datas = dados.map(d => d.data);
    const temperaturas = dados.map(d => d.temperatura);
    const umidades = dados.map(d => d.umidade);
    const ventos = dados.map(d => d.vento);
    const precipitacao = dados.map(d => d.precipitacao);

    criarGrafico("graficoTemperatura", "Temperatura (°C)", datas, temperaturas, "red");
    criarGrafico("graficoUmidade", "Umidade (%)", datas, umidades, "blue");
    criarGrafico("graficoVento", "Vento (m/s)", datas, ventos, "green");
    criarGrafico("graficoPrecipitação", "HORÁRIO (mm)", datas, precipitacao, "orange")

  } catch (error) {
    console.error("Erro ao buscar dados:", error);
  }
}

function criarGrafico(id, titulo, labels, data, cor) {
  const ctx = document.getElementById(id).getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: titulo,
        data: data,
        borderColor: cor,
        backgroundColor: cor,
        fill: false,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

document.addEventListener("DOMContentLoaded", fetchDados);
