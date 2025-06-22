// Aguarda o carregamento da página
window.addEventListener("DOMContentLoaded", async () => {
  try {
    const resposta = await fetch("http://localhost:3000/medias");
    const medias = await resposta.json();

    // Preenche os elementos HTML com as médias
    document.querySelector(".info_total-temp").textContent = `Média total ${medias.mediaTemperatura}°C`;
    document.querySelector(".info_total-vento").textContent = `Média total ${medias.mediaVento} m/s`;
    document.querySelector(".info_total-umid").textContent = `Média total ${medias.mediaUmidade}%`;
    document.querySelector(".info_total-preci").textContent = `Média total ${medias.mediaPrecipitacao} mm`;

    // Oculta o loading após carregar
    document.querySelector(".loading").style.display = "none";
  } catch (erro) {
    console.error("Erro ao buscar médias:", erro);
    document.querySelector(".loading").style.display = "none";
  }
});
