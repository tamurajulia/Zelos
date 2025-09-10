"use client";
import "./novo.css";
import { useState, useRef, useEffect } from "react";

// Lista de tipos de chamado
const tiposChamado = [
  { value: "1", label: "Externo" },
  { value: "2", label: "Manutenção" },
  { value: "3", label: "Apoio Técnico" },
  { value: "4", label: "Limpeza" },
];

export default function NovoChamado() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [patrimonio, setPatrimonio] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [prioridade, setPrioridade] = useState("1");
  const [tipo, setTipo] = useState("");
  const [arquivos, setArquivos] = useState([]);
  const [dropdownAberto, setDropdownAberto] = useState(false);
  const dropdownRef = useRef(null);

  // Fechar dropdown ao clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownAberto(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Corrigido: função para lidar com arquivos
  const handleArquivosChange = (e) => {
    const files = Array.from(e.target.files);
    setArquivos((prev) => [...prev, ...files].slice(0, 10)); // Limita a 10 arquivos
  };

  const removerArquivo = (index) => {
    setArquivos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("tipoChamado", tipo);
    formData.append("patrimonio", patrimonio);
    formData.append("localizacao", localizacao);
    formData.append("prioridade", prioridade);
    formData.append("descricao", descricao);

    arquivos.forEach((file) => {
      formData.append("arquivos", file);
    });

    try {
      const res = await fetch("http://localhost:8080/chamados", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (res.ok) {
        alert("Chamado enviado com sucesso!");
        setTitulo("");
        setDescricao("");
        setPatrimonio("");
        setLocalizacao("");
        setPrioridade("1");
        setTipo("");
        setArquivos([]);
      } else {
        const errorData = await res.json();
        console.log(errorData);
      }
    } catch (error) {
      alert("Erro de conexão com a API: " + error.message);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex align-items-center mb-4">
        <h2 className="mb-0 me-2" style={{ color: "#225299" }}>Novo chamado</h2>
        <i className="bi bi-caret-down-fill fs-5" style={{ color: "#225299" }}></i>
      </div>

      <div className="container mt-4">
        <div className="cardFormulario" style={{ border: "1px solid #d9d9d9" }}>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/* Título & Tipo de chamado */}
              <div className="row mb-3">
                <div className="col-md-6 mb-3 mb-md-0">
                  <label htmlFor="titulo" className="form-label">Título</label>
                  <input
                    type="text"
                    className="form-control"
                    id="titulo"
                    placeholder="Ex: Computador quebrado"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                  />
                </div>
                <div className="col-md-6" ref={dropdownRef}>
                  <label htmlFor="tipoChamado" className="form-label">Tipo de chamado</label>
                  <div className="select-custom" onClick={() => setDropdownAberto(!dropdownAberto)}>
                    {tipo ? tiposChamado.find((t) => t.value === tipo)?.label : "Selecione o tipo"}
                    <span className="seta">▼</span>
                  </div>
                  {dropdownAberto && (
                    <ul className="opcoes">
                      {tiposChamado.map((t) => (
                        <li
                          key={t.value}
                          onClick={() => {
                            setTipo(t.value);
                            setDropdownAberto(false);
                          }}
                        >
                          {t.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Número patrimônio & Localização */}
              <div className="row mb-3">
                <div className="col-md-6 mb-3 mb-md-0">
                  <label htmlFor="numPatrimonio" className="form-label">Número do patrimônio</label>
                  <input
                    type="text"
                    className="form-control"
                    id="numPatrimonio"
                    placeholder="Ex: 123134212"
                    value={patrimonio}
                    onChange={(e) => setPatrimonio(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="localizacao" className="form-label">Localização</label>
                  <input
                    type="text"
                    className="form-control"
                    id="localizacao"
                    placeholder="Ex: Bloco A"
                    value={localizacao}
                    onChange={(e) => setLocalizacao(e.target.value)}
                  />
                </div>
              </div>

              {/* Prioridade */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label d-block">Prioridade</label>
                  <div className="d-flex flex-wrap">
                    {[
                      { label: "Baixa", value: "1" },
                      { label: "Média", value: "2" },
                      { label: "Alta", value: "3" },
                      { label: "Urgente", value: "4" },
                    ].map((nivel) => (
                      <div className="form-check me-4" key={nivel.label}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="prioridade"
                          id={`prioridade${nivel.label}`}
                          value={nivel.value}
                          checked={prioridade === nivel.value}
                          onChange={(e) => setPrioridade(e.target.value)}
                          style={{ accentColor: "#225299" }}
                        />
                        <label className="form-check-label" htmlFor={`prioridade${nivel.label}`}>
                          {nivel.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Descrição */}
              <div className="mb-3">
                <label htmlFor="descricao" className="form-label">Descrição</label>
                <textarea
                  className="form-control"
                  id="descricao"
                  rows="4"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                ></textarea>
              </div>

              <hr />

              {/* Upload de arquivos */}
              <div className="mb-4">
                <label htmlFor="anexarArquivos" className="form-label">Anexe fotos ou arquivos</label>
                <p className="text-muted small">
                  Faça upload de até 10 arquivos aceitos: PDF ou imagem.
                  O tamanho máximo é de 10 MB por item.
                </p>
                <div className="border border-secondary p-4 text-center rounded">
                  <p className="mb-2">Arraste e solte arquivos aqui</p>
                  <label htmlFor="anexarArquivosInput" className="btn btn-primary" style={{ backgroundColor: "#225299", borderColor: "#225299" }}>
                    Anexar arquivo <i className="bi bi-download"></i>
                  </label>
                  <input
                    type="file"
                    id="anexarArquivosInput"
                    multiple
                    style={{ display: "none" }}
                    onChange={handleArquivosChange}
                  />

                  {arquivos.length > 0 && (
                    <div className="mt-3 text-start">
                      <strong>Arquivos selecionados:</strong>
                      <ul className="d-flex flex-column list-unstyled mb-0 gap-2">
                        {arquivos.map((file, index) => (
                          <li key={index} className="d-flex justify-content-between align-items-center">
                            <span>{file.name}</span>
                            <button
                              type="button"
                              className="btn btn-sm btn-danger"
                              onClick={() => removerArquivo(index)}
                            >
                              Remover
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Botão enviar */}
              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#225299", borderColor: "#225299" }}>
                  Enviar chamado
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}