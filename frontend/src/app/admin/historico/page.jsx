"use client";
import "./adminHistorico.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import Loader from "@/components/Loader/Loader";

export default function AdminHistorico() {
  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tecnicos, setTecnicos] = useState({});
  const [openCollapse, setOpenCollapse] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    async function fetchChamadosComTecnicos() {
      try {
        const res = await fetch("http://localhost:8080/chamados/meusChamadosUsuario", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const chamadosData = await res.json();
        setChamados(chamadosData);

        const tecnicoIds = [...new Set(chamadosData.map(c => c.tecnico_id).filter(Boolean))];

        const tecnicoResponses = await Promise.all(
          tecnicoIds.map(id =>
            fetch(`http://localhost:8080/usuarios/${id}`, {
              headers: { Authorization: `Bearer ${token}` },
            }).then(res => (res.ok ? res.json() : null))
          )
        );

        const tecnicoMap = {};
        tecnicoResponses.forEach((tecnico, i) => {
          if (tecnico) {
            tecnicoMap[tecnicoIds[i]] = tecnico.nome;
          }
        });

        setTecnicos(tecnicoMap);
      } catch (err) {
        console.error("Erro ao buscar chamados ou técnicos:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchChamadosComTecnicos();
  }, []);

  if (loading) return <Loader />;

  const tipos = {
    1: "Externo",
    2: "Manutenção",
    3: "Apoio Técnico",
    4: "Limpeza",
  };

  const normalize = (str) =>
    str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim() : "";

  const ChamadoCard = ({ chamado }) => (
    <div className="chamado-card">
      <div className="row align-items-center">
        <div className="col-12 col-md-6">
          <h5 className="mb-2">#{chamado.id}</h5>
          <h4 className="mb-2">“{chamado.patrimonio}”</h4>
          <p className="mb-1"><strong>Tipo de chamado: </strong>{tipos[chamado.tipo_id]}</p>
          <p className="mb-1">
            <strong>Responsável: </strong>
            {chamado.tecnico_id
              ? tecnicos[chamado.tecnico_id] || "Carregando técnico..."
              : "Nenhum técnico atribuído ainda"}
          </p>
        </div>
        <div className="col-12 col-md-6 text-md-end mt-3 mt-md-0">
          <p className="mb-1"><strong>Status:</strong> {chamado.status}</p>
          <Link href={`./historico/${chamado.id}`}>
            <button type="button" className="btn-detalhes mt-2">
              Detalhes <i className="bi bi-caret-left-fill"></i>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );

  const renderChamados = (status) => {
    const filtrados = chamados.filter(
      (c) => normalize(c.status) === normalize(status)
    );

    if (filtrados.length === 0) {
      return <p style={{ textAlign: "center", padding: "1rem" }}>Nenhum chamado {status}.</p>;
    }

    return filtrados.map((chamado) => (
      <ChamadoCard key={chamado.id} chamado={chamado} />
    ));
  };

  return (
    <div className="container mt-4">
      {["pendente", "em andamento", "concluído"].map((status, idx) => (
        <div key={idx} className="card mt-4">
          <div
            className="card-header"
            onClick={() => setOpenCollapse(openCollapse === status ? null : status)}
          >
            <h5 className="mb-0" style={{ textTransform: "capitalize" }}>{status}</h5>
            <i className={`bi ${openCollapse === status ? "bi-caret-up-fill" : "bi-caret-down-fill"}`}></i>
          </div>
          {openCollapse === status && (
            <div className="card-body">{renderChamados(status)}</div>
          )}
        </div>
      ))}
    </div>
  );
}
