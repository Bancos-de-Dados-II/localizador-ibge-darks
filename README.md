# 🗺️ Localizador IBGE (IBGE + QGIS + PostgreSQL)

Este projeto permite ao usuário selecionar um estado e município do Brasil para visualizar seu contorno geográfico renderizado em SVG. Os dados dos estados e municípios são obtidos da API oficial do IBGE, e os dados geoespaciais (viewBox e paths SVG) são gerados com base em arquivos shapefiles manipulados no QGIS e armazenados em um banco de dados PostgreSQL.

---

## ⚙️ Tecnologias utilizadas

- **Frontend**: HTML5, CSS, JavaScript 
- **Backend**: Node.js + Express + Sequelize
- **Banco de Dados**: PostgreSQL com extensão PostGIS
- **GIS**: QGIS para manipulação de shapefiles
- **API Externa**: [IBGE - Localidades](https://servicodados.ibge.gov.br/api/docs/localidades)

---

## 🧠 Funcionalidades

- Carregamento dinâmico dos estados e municípios do Brasil.
- Consulta ao banco de dados para obter os caminhos vetoriais (`path`) do estado e município.
- Renderização do mapa vetorial com `viewBox` adequado usando SVG.
- Integração entre IBGE, backend Node.js e banco espacial via PostGIS.

---

## 🔧 Pré-requisitos

1. **QGIS Instalado** (para manipular os arquivos vetoriais).
2. **PostgreSQL com a extensão PostGIS ativada**.
3. Banco de dados populado com os arquivos vetoriais (importados via QGIS).
4. Tem uma função SQL criada no banco de dados PostgreSQL, que retorna os seguintes dados:
   - `viewBox`: limites geográficos
   - `path_estado`: geometria do estado em SVG
   - `path_municipio`: geometria do município em SVG
5. **Node.js e npm** – Ambiente de execução JavaScript e gerenciador de pacotes.
6. **Git** – Utilizado para clonar o repositório do projeto (opcional, mas recomendado).


---
