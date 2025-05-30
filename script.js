document.addEventListener("DOMContentLoaded", () => {
  const estadoSelect = document.getElementById("estado");
  const municipioSelect = document.getElementById("municipio");
  const resultado = document.getElementById("resultado");

  // Começa com o select de município desabilitado
  municipioSelect.disabled = true;

  // Função para carregar estados do IBGE
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

  // Função para carregar municípios quando um estado for selecionado
  async function carregarMunicipios(uf) {
    municipioSelect.innerHTML = "<option value=''>Selecione um município</option>";
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
      const mapa = resultado.querySelector("#mapa");
      mapa.innerHTML = "Erro ao carregar municípios.";
    }
  }

  // Função para obter o viewBox e paths
  async function obterViewBox(estado, municipio) {
    try {
      const res = await fetch(`http://localhost:3000/${encodeURIComponent(estado)}/${encodeURIComponent(municipio)}`);
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Atualiza o texto acima do mapa
      resultado.querySelector("p").textContent = `Estado: ${estado} | Município: ${municipio}`;

      // Seleciona a div onde o mapa será exibido
      const mapa = resultado.querySelector("#mapa");
      mapa.innerHTML = ""; // Limpa o conteúdo anterior

      // Cria o elemento SVG
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox", data.viewbox);
      svg.setAttribute("width", "100%");
      svg.setAttribute("height", "100%");

      // Caminho do estado 
      const pathEstado = document.createElementNS("http://www.w3.org/2000/svg", "path");
      pathEstado.setAttribute("d", data.path_estado);
      pathEstado.setAttribute("fill", "#9ebdff");
      pathEstado.setAttribute("stroke-width", "0.10");

      // Caminho do município 
      const pathMunicipio = document.createElementNS("http://www.w3.org/2000/svg", "path");
      pathMunicipio.setAttribute("d", data.path_municipio);
      pathMunicipio.setAttribute("fill", "#007bff");
      pathMunicipio.setAttribute("stroke", "#3560aa");
      pathMunicipio.setAttribute("stroke-width", "0.10");

      // Adiciona os paths ao SVG
      svg.appendChild(pathEstado);
      svg.appendChild(pathMunicipio);

      // Adiciona o SVG ao mapa
      mapa.appendChild(svg);

    } catch (erro) {
      console.error("Erro ao obter viewbox:", erro);
      const mapa = resultado.querySelector("#mapa");
      mapa.innerHTML = `Erro ao obter viewbox: ${erro.message || erro}`;
    }
  }

  // Quando o estado for selecionado
  estadoSelect.addEventListener("change", () => {
    const uf = estadoSelect.value;
    resultado.querySelector("p").textContent = "Estado: --- | Município: ---";
    const mapa = resultado.querySelector("#mapa");
    mapa.innerHTML = "Mapa do município aparecerá aqui";

    if (uf) {
      carregarMunicipios(uf);
    } else {
      municipioSelect.innerHTML = "<option value=''>Selecione um município</option>";
      municipioSelect.disabled = true;
    }
  });

  // Quando o município for selecionado
  municipioSelect.addEventListener("change", () => {
    const uf = estadoSelect.value;
    const municipio = municipioSelect.value;

    if (uf && municipio) {
      obterViewBox(uf, municipio);
    }
  });

  // Inicia o carregamento dos estados
  carregarEstados();
});
