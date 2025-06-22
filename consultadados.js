var admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const port = 3000;

// Carrega a chave do Firebase
var serviceAccount = require("C:\\Users\\josev\\OneDrive\\Área de Trabalho\\DASHBOARD PROJETO CNPQ\\projeto-6919f-firebase-adminsdk-fbsvc-5b90224c59.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://projeto-6919f-default-rtdb.firebaseio.com"
});

const db = admin.firestore();
app.use(express.static('static'));

// Rota para buscar os dados do Firestore
app.get("/dados", async function (req, res) {
  try {
    const snapshot = await db.collection("regioes").doc("Região_Taubaté").get();

    if (!snapshot.exists) {
      return res.status(400).json({ error: "Nenhum documento encontrado!" });
    }

    const data = snapshot.data();
    const dados = data.dados || [];

    // Validação e formatação dos dados
    const dadosFormatados = Array.isArray(dados)
      ? dados
          .filter(entry =>
            entry['DATA:'] &&
            entry['UMIDADE RELATIVA DO AR, HORARIA (%)'] &&
            entry['TEMPERATURA DO AR - BULBO SECO, HORARIA (°C)'] &&
            entry['VENTO, VELOCIDADE HORARIA (m/s)'] &&
            entry['PRECIPITAÇÃO TOTAL, HORÁRIO (mm)']
          )
          .map(entry => ({
            data: entry['DATA:'],
            umidade: entry['UMIDADE RELATIVA DO AR, HORARIA (%)'],
            temperatura: entry['TEMPERATURA DO AR - BULBO SECO, HORARIA (°C)'],
            vento: entry['VENTO, VELOCIDADE HORARIA (m/s)'],
            precipitacao: entry['PRECIPITAÇÃO TOTAL, HORÁRIO (mm)']
          }))
      : [];
      
    console.log("Dados formatados:", dadosFormatados);
    res.json(dadosFormatados);
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    res.status(500).json({ error: "Erro ao buscar dados do Firebase" });
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

function calcularMedias(dados) {
  if (!Array.isArray(dados) || dados.length === 0) return {};

  let somaUmidade = 0;
  let somaTemperatura = 0;
  let somaVento = 0;
  let somaPrecipitacao = 0;

  dados.forEach(entry => {
    somaUmidade += parseFloat(entry.umidade);
    somaTemperatura += parseFloat(entry.temperatura);
    somaVento += parseFloat(entry.vento);
    somaPrecipitacao += parseFloat(entry.precipitacao);
  });

  const total = dados.length;

  return {
    mediaUmidade: (somaUmidade / total).toFixed(2),
    mediaTemperatura: (somaTemperatura / total).toFixed(2),
    mediaVento: (somaVento / total).toFixed(2),
    mediaPrecipitacao: (somaPrecipitacao / total).toFixed(2)
  };
}

app.get("/medias", async function (req, res) {
  try {
    const snapshot = await db.collection("regioes").doc("Região_Taubaté").get();

    if (!snapshot.exists) {
      return res.status(400).json({ error: "Nenhum documento encontrado!" });
    }

    const data = snapshot.data();
    const dados = data.dados || [];

    const dadosValidos = Array.isArray(dados)
      ? dados
          .filter(entry =>
            entry['DATA:'] &&
            entry['UMIDADE RELATIVA DO AR, HORARIA (%)'] &&
            entry['TEMPERATURA DO AR - BULBO SECO, HORARIA (°C)'] &&
            entry['VENTO, VELOCIDADE HORARIA (m/s)'] &&
            entry['PRECIPITAÇÃO TOTAL, HORÁRIO (mm)']
          )
          .map(entry => ({
            data: entry['DATA:'],
            umidade: entry['UMIDADE RELATIVA DO AR, HORARIA (%)'],
            temperatura: entry['TEMPERATURA DO AR - BULBO SECO, HORARIA (°C)'],
            vento: entry['VENTO, VELOCIDADE HORARIA (m/s)'],
            precipitacao: entry['PRECIPITAÇÃO TOTAL, HORÁRIO (mm)']
          }))
      : [];

    const medias = calcularMedias(dadosValidos);

    console.log("Médias calculadas:", medias);
    res.json(medias);
  } catch (error) {
    console.error("Erro ao calcular médias:", error);
    res.status(500).json({ error: "Erro ao calcular médias do Firebase" });
  }
});
