# SITE-DADOSMETEREOLOGICOS

# Dashboard Meteorológico - Projeto CNPq

## Descrição
Este projeto é um dashboard meteorológico desenvolvido como parte de uma iniciativa do CNPq, com o objetivo de apresentar dados meteorológicos coletados em diferentes regiões, como Taubaté, São Luiz e Natal. O dashboard exibe informações em tempo real sobre temperatura, umidade relativa do ar, velocidade do vento e precipitação, com médias diárias e históricos dos últimos 6 dias.

A aplicação web é construída utilizando HTML, CSS e JavaScript, com integração ao Firebase para armazenamento e gerenciamento de dados. O layout é responsivo, garantindo uma boa experiência em dispositivos móveis e desktops. O dashboard permite a visualização de gráficos históricos e a seleção de diferentes cidades para análise detalhada dos dados meteorológicos.

## Funcionalidades
- **Exibição de Dados em Tempo Real**: Apresenta médias diárias de temperatura (°C), umidade relativa (%), velocidade do vento (m/s) e precipitação total (mm).
- **Históricos de 6 Dias**: Gráficos interativos mostrando a evolução dos parâmetros meteorológicos nos últimos 6 dias.
- **Seleção de Cidades**: Interface para alternar entre dados de diferentes cidades (Taubaté, São Luiz, Natal).
- **Integração com Firebase**: Utiliza Firebase para armazenamento seguro e recuperação eficiente dos dados meteorológicos.
- **Design Responsivo**: Interface amigável e adaptável para diferentes dispositivos.
- **Navegação Simples**: Links para as seções "Home" e "Sobre Nós", com informações sobre o projeto e links para redes sociais.

## Estrutura do Projeto
- **index.html**: Arquivo principal da interface do dashboard, contendo a estrutura HTML com seções para exibição de dados, gráficos e navegação.
- **projeto-6919f-firebase-adminsdk-fbsvc-5b90224c59.json**: Arquivo de configuração do Firebase para autenticação e conexão com o banco de dados.
- **planilha dados meteorológicos.json**: Banco de dados com informações meteorológicas coletadas, incluindo temperatura, umidade, vento e precipitação para a região de Taubaté.

## Tecnologias Utilizadas
- **HTML5**: Estruturação do conteúdo da página.
- **CSS3**: Estilização e design responsivo.
- **JavaScript**: Lógica para manipulação de dados e renderização de gráficos.
- **Firebase**: Banco de dados em tempo real para armazenamento e gerenciamento dos dados meteorológicos.
- **Chart.js** (ou similar, se implementado): Para visualização de gráficos históricos.

## Como Executar
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/projeto-cnpq-meteorologia.git
