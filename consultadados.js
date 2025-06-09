var admin = require("firebase-admin");

//criar servidor express para enviar dados
const express = require ("express");
const app = express();
const port = 3000;

// Carregando a chave de serviço corretamente
var serviceAccount = require("C:\\Users\\josev\\OneDrive\\Área de Trabalho\\DASHBOARD PROJETO CNPQ\\projeto-6919f-firebase-adminsdk-fbsvc-5b90224c59.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://projeto-6919f-default-rtdb.firebaseio.com"
});

// Firestore
const db = admin.firestore();

app.use(express.static('static'))

//faz a requisição para os dados do firebase
app.get("/dados", async function testarConexao(req, res) {

  const datas = [];
  const umidades = [];
  const temperatura = [];
  const ventos = [];

  // Obtém o documento
  const snapshot = await db.collection("regioes").doc("Região_Taubaté").get();

  if (!snapshot.exists) {
    return res.status(400).json({error: "Nenhum documento encontrado!"});
  }

  // Extrai os dados do documento
  const data = snapshot.data();
  const dados = data.dados || [];
  
  // Verifica se o campo "dados" existe e é um array
  if (data.dados && Array.isArray(data.dados)) {
    data.dados.forEach(entry => {
      if (entry['DATA:'] && entry['UMIDADE RELATIVA DO AR, HORARIA (%)'] && entry['TEMPERATURA DO AR - BULBO SECO, HORARIA (°C)'] && entry['VENTO, VELOCIDADE HORARIA (m/s)']) {
        datas.push(entry['DATA:']); // Adiciona a data ao array
        umidades.push(entry['UMIDADE RELATIVA DO AR, HORARIA (%)']); // Adiciona a umidade ao array
        temperatura.push(entry['TEMPERATURA DO AR - BULBO SECO, HORARIA (°C)']);
        ventos.push(entry['VENTO, VELOCIDADE HORARIA (m/s)']);
      }
    });
  } else {
    console.error("'dados' não encontrado ou não é um array!");
  }

   res.json({ datas, umidades, temperatura, ventos });
   
});

//inicia o servidor 
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});


