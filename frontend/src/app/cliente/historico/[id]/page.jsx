
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Loader from "@/components/Loader/Loader";
import './relatorio.css';

function InfoItem({ label, value }) {
  return (
    <p>
      <span className='label'>{label} :</span> {value}
    </p>
  );
}

export default function Relatorio() {
  const params = useParams();
  const { id } = params;

  const [chamado, setChamado] = useState(null);
  const [relatorio, setRelatorio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nomeTecnico, setNomeTecnico] = useState("");
  const [nomeTecnicoApontamento, setNomeTecnicoApontamento] = useState("");
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [arquivosChamado, setArquivosChamado] = useState([]);
  const [arquivosRelatorio, setArquivosRelatorio] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Busca o relatório e o nome do técnico do relatório
  const fetchApontamento = async () => {
    if (!chamado) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token não encontrado");

      // Busca apontamento
      const response = await fetch(`http://localhost:8080/apontamentos/${chamado.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Erro ao buscar apontamento");

      const data = await response.json();
      setRelatorio(data);

      // Transformar arquivos do relatório em array
      const arquivosArray = data.arquivos
        ? data.arquivos.split(",").map((path) => path.trim().replace(/\\/g, "/"))
        : [];
      setArquivosRelatorio(arquivosArray);

      // Busca nome do técnico do relatório
      if (data.tecnico_id) {
        const tecnicoRes = await fetch(`http://localhost:8080/usuarios/${data.tecnico_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (tecnicoRes.ok) {
          const tecnicoData = await tecnicoRes.json();
          setNomeTecnicoApontamento(tecnicoData.nome || "Técnico sem nome");
        }
      }

    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenModal = () => {
    fetchApontamento();
    setShowModal(true);
  };

  useEffect(() => {
    if (!id) return;

    const token = localStorage.getItem("token");

    const fetchChamado = async () => {
      try {
        const res = await fetch(`http://localhost:8080/chamados/meusChamadosUsuario/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Erro ao buscar chamado");

        const data = await res.json();
        setChamado(data);

        // Transformar arquivos do chamado em array
        const arquivosArray = data.arquivos
          ? data.arquivos.split(",").map((path) => path.trim().replace(/\\/g, "/"))
          : [];
        setArquivosChamado(arquivosArray);

        // Busca nome do técnico do chamado (fallback se relatório não tiver)
        if (data.tecnico_id) {
          const tecnicoRes = await fetch(`http://localhost:8080/usuarios/${data.tecnico_id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (tecnicoRes.ok) {
            const tecnicoData = await tecnicoRes.json();
            setNomeTecnico(tecnicoData.nome || "Técnico sem nome");
          }
        }

        // Busca nome do usuário
        if (data.usuario_id) {
          const usuarioRes = await fetch(`http://localhost:8080/usuarios/${data.usuario_id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (usuarioRes.ok) {
            const usuarioData = await usuarioRes.json();
            setNomeUsuario(usuarioData.nome || "Usuário sem nome");
          }
        }

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchChamado();
  }, [id]);

  if (loading) return <Loader />;
  if (!chamado) return <p style={{ textAlign: "center", marginTop: "2rem" }}>Chamado não encontrado.</p>;

  return (
    <main className='mainContent'>
      <div className='containerRelatorio'>
        <div className='header'>Relatório do Chamado</div>

        <div className='content'>
          <InfoItem label="Título" value={chamado.titulo} />
          <InfoItem label="Item/patrimônio" value={chamado.patrimonio || "Não informado"} />
          <InfoItem label="Técnico responsável" value={nomeTecnico || "Nenhum técnico atribuído"} />
          <InfoItem
            label="Início"
            value={chamado.criado_em
              ? new Date(chamado.criado_em).toLocaleString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
              : "Não informado"
            }
          />
          <InfoItem label="Detalhes" value={chamado.descricao || "Sem detalhes"} />
          {chamado.status === "concluído" && (
            <InfoItem
              label="Término"
              value={chamado.atualizado_em
                ? new Date(chamado.atualizado_em).toLocaleString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
                : "—"
              }
            />
          )}
        </div>

        {arquivosChamado.length > 0 && (
          <div>
            <h5>Fotos anexadas:</h5>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {arquivosChamado.map((url, index) => (
                <img
                  key={index}
                  src={`http://localhost:8080${url}`}
                  alt={`Anexo ${index + 1}`}
                  style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "6px", border: "1px solid #ccc" }}
                />
              ))}
            </div>
          </div>
        )}

        {chamado.status === "concluído" && (
          <div style={{ marginTop: "2rem" }}>
            <button className="btn relatorio-btn" onClick={handleOpenModal}>
              Abrir relatório de conclusão
            </button>

            {showModal && relatorio && (
              <div className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
                <div className="modal-dialog modal-lg modal-dialog-scrollable">
                  <div className="modal-content">
                    <div className="modal-header relatorio-modal-header">
                      <h5 className="modal-title">Relatório de Conclusão</h5>
                      <i class="bi bi-x-lg relatorio-btn-close" onClick={() => setShowModal(false)}></i>
                    </div>

                    <div className="modal-body relatorio-modal-body">

                      <div className="container">
                        <div className="row">
                          <div className="col-md-6"><p><strong>Técnico Responsável:</strong><br />{nomeTecnicoApontamento || "Não informado"}</p></div>
                          <div className="col-md-6"><p><strong>Peças utilizadas:</strong><br />{relatorio.pecasUtilizadas || "Não informado"}</p></div>
                          <div className="col-md-12"><p><strong>Descrição da solução:</strong><br />{relatorio.descricao || "Não informado"}</p></div>

                          {arquivosRelatorio.length > 0 && (
                            <div id="carouselRelatorio" className="carousel slide" data-bs-ride="false">
                              <div className="carousel-indicators">
                                {arquivosRelatorio.map((_, index) => (
                                  <button key={index} type="button" data-bs-target="#carouselRelatorio" data-bs-slide-to={index} className={index === 0 ? "active" : ""}></button>
                                ))}
                              </div>

                              <div className="carousel-inner">
                                {arquivosRelatorio.map((url, index) => (
                                  <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                                    <img
                                      src={`http://localhost:8080${url}`}
                                      className="d-block w-100"
                                      alt={`Arquivo ${index + 1}`}
                                      style={{ maxHeight: "400px", objectFit: "contain" }}
                                    />
                                  </div>
                                ))}
                              </div>

                              <button
                                className="carousel-control-prev"
                                type="button"
                                data-bs-target="#carouselRelatorio"
                                data-bs-slide="prev"
                              >
                                <span>
                                  <i className="bi bi-caret-left-fill fs-2" aria-hidden="true"></i>
                                </span>
                                <span className="visually-hidden">Anterior</span>
                              </button>
                              <button
                                className="carousel-control-next"
                                type="button"
                                data-bs-target="#carouselRelatorio"
                                data-bs-slide="next"
                              >
                                <span>
                                  <i className="bi bi-caret-right-fill fs-2" aria-hidden="true"></i>
                                </span>
                                <span className="visually-hidden">Próxima</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                    </div>

                    <div className="modal-footer">
                      <button className="btn relatorio-btn-fechar" onClick={() => setShowModal(false)}>Fechar</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </main>
  );
}
