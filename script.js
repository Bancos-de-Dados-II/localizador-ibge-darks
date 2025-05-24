document.addEventListener("DOMContentLoaded", () => {
  const estadoSelect = document.getElementById("estado");
  const municipioSelect = document.getElementById("municipio");

  // Função para carregar estados
  async function carregarEstados() {
    try {
      const res = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome");
      const estados = await res.json();

      estados.forEach(uf => {
        const option = document.createElement("option");
        option.value = uf.sigla;
        option.textContent = uf.nome;
        estadoSelect.appendChild(option);
      });
    } catch (erro) {
      console.error("Erro ao carregar os estados:", erro);
    }
  }
  
  // Função para carregar municípios de um estado
  async function carregarMunicipios(uf) {
    municipioSelect.disabled = true;

    try {
      const res = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
      const municipios = await res.json();

      municipios.forEach(cidade => {
        const opt = document.createElement("option");
        opt.value = cidade.nome;
        opt.textContent = cidade.nome;
        municipioSelect.appendChild(opt);
      });

      municipioSelect.disabled = false;
    } catch (erro) {
      console.error("Erro ao carregar os municípios:", erro);
    }
  }

  // Inicia o carregamento dos estados
  carregarEstados();

  // Listener para mudança no select de estado
  estadoSelect.addEventListener("change", () => {
    const uf = estadoSelect.value;
    if (uf) {
      carregarMunicipios(uf);
    }
  });
});
