"use client";
import { useState } from "react";
import "./chamado.css";

export default function NovoChamado() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [patrimonio, setPatrimonio] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [prioridade, setPrioridade] = useState("1");
  const [tipo, setTipo] = useState("");
  const [arquivos, setArquivos] = useState([]);
  const [dropdownAberto, setDropdownAberto] = useState(false);

  const tiposChamado = [
    { value: "1", label: "Externo" },
    { value: "2", label: "Manutenção" },
    { value: "3", label: "Apoio Técnico" },
    { value: "4", label: "Limpeza" },
  ];

  const handleArquivosChange = (e) => {
    const novosArquivos = Array.from(e.target.files);
    setArquivos((prev) => [...prev, ...novosArquivos]);
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
    <div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <picture>
          <source
            media="(max-width: 768px)"
            srcSet="/bannerMobile/chamado.png"
          />
          <source
            media="(min-width: 769px)"
            srcSet="/bannerPc/chamado.png"
          />
          <img
            src="/bannerPc/chamado.png"
            alt="Banner"
            style={{
              width: "90%",
              objectFit: "cover",
              borderRadius: "25px",
              marginBottom: "5%",
              marginTop: "2%",
              marginLeft: "5%",
            }}
          />
        </picture>
      </div>
      <div className="container mt-4">
        <div className="card shadow-sm" style={{ border: "1px solid #d9d9d9" }}>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-6 mb-3 mb-md-0">
                  <label htmlFor="titulo" className="form-label">
                    Título
                  </label>
                  <input
                    type="text"
                    className=" form-control"
                    id="titulo"
                    placeholder="Ex: Computador quebrado"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="tipoChamado" className="form-label">
                    Tipo de chamado
                  </label>
                  <div
                    className="select-custom"
                    onClick={() => setDropdownAberto(!dropdownAberto)}
                  >
                    {tipo
                      ? tiposChamado.find((t) => t.value === tipo)?.label
                      : "Selecione o tipo"}
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
              <div className="row mb-3">
                <div className="col-md-6 mb-3 mb-md-0">
                  <label htmlFor="numPatrimonio" className="form-label">
                    Número do patrimônio
                  </label>
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
                  <label htmlFor="localizacao" className="form-label">
                    Localização
                  </label>
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
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`prioridade${nivel.label}`}
                        >
                          {nivel.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="descricao" className="form-label">
                  Descrição
                </label>
                <textarea
                  className="form-control"
                  id="descricao"
                  rows="4"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                ></textarea>
              </div>

              <hr />
              <div className="mb-4">
                <label htmlFor="anexarArquivos" className="form-label">
                  Anexe fotos ou arquivos
                </label>
                <p className="text-muted small">
                  Faça upload de até 10 arquivos aceitos: PDF ou imagem. O
                  tamanho máximo é de 10 MB por item.
                </p>
                <div className=" border border-secondary p-4 text-center rounded">
                  <p className="mb-2">Arraste e solte arquivos aqui</p>

                  <label
                    htmlFor="anexarArquivosInput"
                    className="btn btn-primary"
                  >
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
                    <div className="mt-3 text-start ">
                      <h6>Arquivos selecionados:</h6>
                      <div className="d-flex flex-wrap gap-3 mt-2">
                        {arquivos.map((file, index) => (
                          <div
                            key={index}
                            className="border p-2 rounded d-flex flex-column align-items-center"
                            style={{
                              width: "180px",
                              textAlign: "center",
                              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)"
                            }}
                          >
                            <span
                              className="text-truncate"
                              style={{ maxWidth: "150px" }}
                              title={file.name}
                            >
                              {file.name}
                            </span>

                            {file.type.startsWith("image/") && (
                              <img
                                src={URL.createObjectURL(file)}
                                alt="Pré-visualização"
                                style={{
                                  width: "100%",
                                  height: "145px",
                                  marginTop: "8px",
                                  borderRadius: "8px",
                                  objectFit: "cover",
                                  border: "2px solid #8b0000",
                                }}
                              />
                            )}

                            <button
                              type="button"
                              className="btn btn-sm btn-danger mt-2"
                              onClick={() => removerArquivo(index)}
                            >
                              Remover
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}



                </div>
              </div>
              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary">
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
