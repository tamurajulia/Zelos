"use client";
import Link from "next/link";
import "./chamados.css";
import React, { useEffect, useState } from "react";

export default function Chamados() {
  const [chamadosEmProcesso, setChamadosEmProcesso] = useState([]);
  const [chamadosDisponiveis, setChamadosDisponiveis] = useState([]);
  const [chamadosConcluidos, setChamadosConcluidos] = useState([]);
  const [tecnicos, setTecnicos] = useState({}); // 👈 mapa id → técnico
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChamados = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token não encontrado no localStorage");
          setLoading(false);
          return;
        }

        // 🔹 3 chamadas em paralelo
        const [respProcesso, respDisponiveis, respConcluidos] =
          await Promise.all([
            fetch("http://localhost:8080/dashboardAdmin/Andamento", {
              headers: { Authorization: `Bearer ${token}` },
            }),
            fetch("http://localhost:8080/dashboardAdmin/naoAtribuido", {
              headers: { Authorization: `Bearer ${token}` },
            }),
            fetch("http://localhost:8080/dashboardAdmin/concluido", {
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]);

        if (!respProcesso.ok)
          throw new Error("Erro ao buscar chamados em processo");
        if (!respDisponiveis.ok)
          throw new Error("Erro ao buscar chamados disponíveis");
        if (!respConcluidos.ok)
          throw new Error("Erro ao buscar chamados concluídos");

        const [dataProcesso, dataDisponiveis, dataConcluidos] =
          await Promise.all([
            respProcesso.json(),
            respDisponiveis.json(),
            respConcluidos.json(),
          ]);

        setChamadosEmProcesso(dataProcesso);
        setChamadosDisponiveis(dataDisponiveis);
        setChamadosConcluidos(dataConcluidos);


        const todosTecnicosIds = [
          ...dataProcesso,
          ...dataDisponiveis,
          ...dataConcluidos,
        ]
          .map((c) => c.tecnico_id)
          .filter(Boolean);

        const uniqueIds = [...new Set(todosTecnicosIds)];

        const tecnicosResp = await Promise.all(
          uniqueIds.map((id) =>
            fetch(`http://localhost:8080/usuarios/${id}`, {
              headers: { Authorization: `Bearer ${token}` },
            }).then((res) => res.json())
          )
        );

        // Criar mapa id → técnico
        const tecnicosMap = {};
        tecnicosResp.forEach((t) => {
          tecnicosMap[t.id] = t;
        });

        setTecnicos(tecnicosMap);
      } catch (error) {
        console.error("Erro ao carregar chamados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChamados();
  }, []);

  const tipoMap = {
    1: "Externo",
    2: "Manutenção",
    3: "Apoio Tecnico",
    4: "Limpeza",
  };

  const prioridadeMap = {
    1: "Baixa",
    2: "Média",
    3: "Alta",
    4: "Urgente",
  };

  const ChamadoCard = ({ chamado }) => {
    const tecnico = chamado.tecnico_id ? tecnicos[chamado.tecnico_id] : null;

    return (
      <div className="chamado-card">
        <div className="row align-items-center">
          <div className="col-12 col-md-6">
            <h5 className="mb-2">#{chamado.id}</h5>
            <h4 className="mb-2">“{chamado.titulo}”</h4>
            <p className="mb-1">
              <strong>Tipo de chamado: </strong>
              {tipoMap[chamado.tipo_id] || "Não definido"}
            </p>
            <p className="mb-1">
              <strong>Número do patrimônio: </strong>
              {chamado.patrimonio}
            </p>
            <p className="mb-1">
              <strong>Responsável:</strong>{" "}
              {chamado.responsavel || (tecnico ? tecnico.nome : "Sem responsável")}
            </p>
          </div>
          <div className="col-12 col-md-6 text-md-end mt-3 mt-md-0">
            <p className="mb-1 data-chamado">
              {chamado.data || chamado.inicio || ""}
            </p>
            <p className="mb-1">
              <strong>Prioridade:</strong> {prioridadeMap[chamado.grauPrioridade] || "Não definida"}

            </p>
            <Link href={`/admin/chamados/${chamado.id}`}>
              <button type="button" className="btn-detalhes mt-2">
                Detalhes <i className="bi bi-caret-left-fill"></i>
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mt-4">

      {/* Disponíveis/Abertos */}
      <div className="card">
        <div
          className="card-header"
          data-bs-toggle="collapse"
          data-bs-target="#collapseDisponiveis"
          aria-expanded="false"
          aria-controls="collapseDisponiveis"
        >
          <h5 className="mb-0">Disponíveis/Abertos</h5>
          <i className="bi bi-caret-down-fill"></i>
        </div>
        <div className="collapse" id="collapseDisponiveis">
          <div className="card-bodyChamados">
            {loading ? (
              <p>Carregando chamados...</p>
            ) : chamadosDisponiveis.length > 0 ? (
              chamadosDisponiveis.map((chamado) => (
                <ChamadoCard key={chamado.id} chamado={chamado} />
              ))
            ) : (
              <p>Nenhum chamado disponível.</p>
            )}
          </div>
        </div>
      </div>

      {/* Em processo */}
      <div className="card">
        <div
          className="card-header"
          data-bs-toggle="collapse"
          data-bs-target="#collapseEmProcesso"
          aria-expanded="true"
          aria-controls="collapseEmProcesso"
        >
          <h5 className="mb-0">Em processo</h5>
          <i className="bi bi-caret-down-fill"></i>
        </div>
        <div className="collapse" id="collapseEmProcesso">
          <div className="card-body">
            {loading ? (
              <p>Carregando chamados...</p>
            ) : chamadosEmProcesso.length > 0 ? (
              chamadosEmProcesso.map((chamado) => (
                <ChamadoCard key={chamado.id} chamado={chamado} />
              ))
            ) : (
              <p>Nenhum chamado em processo.</p>
            )}
          </div>
        </div>
      </div>



      {/* Concluídos */}
      <div className="card">
        <div
          className="card-header"
          data-bs-toggle="collapse"
          data-bs-target="#collapseConcluidos"
          aria-expanded="true"
          aria-controls="collapseConcluidos"
        >
          <h5 className="mb-0">Concluídos</h5>
          <i className="bi bi-caret-down-fill"></i>
        </div>
        <div className="collapse" id="collapseConcluidos">
          <div className="card-body">
            {loading ? (
              <p>Carregando chamados...</p>
            ) : chamadosConcluidos.length > 0 ? (
              chamadosConcluidos.map((chamado) => (
                <ChamadoCard key={chamado.id} chamado={chamado} />
              ))
            ) : (
              <p>Nenhum chamado concluído.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
