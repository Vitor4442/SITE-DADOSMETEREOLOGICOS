const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

const basePath = 'C:\\Users\\josev\\OneDrive\\Área de Trabalho\\DASHBOARD PROJETO CNPQ';

const serviceAccountPath = path.join(basePath, 'projeto-6919f-firebase-adminsdk-fbsvc-5b90224c59.json');
const dadosJsonPath = path.join(basePath, 'planilha dados meteorológicos.json');

const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const firestore = admin.firestore();

function sanitizeDocId(id) {
  return id.replace(/[.#$/\[\]]/g, '').replace(/\s/g, '_');
}

async function salvarDados() {
  try {
    const rawData = fs.readFileSync(dadosJsonPath, 'utf8');
    const dados = JSON.parse(rawData);

    const regioesCollection = firestore.collection('regioes');

    for (const regiao in dados) {
      if (Object.hasOwnProperty.call(dados, regiao)) {
        const docId = sanitizeDocId(regiao);
        const docData = dados[regiao]; // array de objetos meteorológicos

        try {
          await regioesCollection.doc(docId).set({ dados: docData });
          console.log(`Região "${regiao}" salva com sucesso!`);
        } catch (error) {
          console.error(`Erro ao salvar região "${regiao}":`, error);
        }
      }
    }
  } catch (err) {
    console.error('Erro ao ler arquivo JSON:', err);
  }
}

salvarDados();
