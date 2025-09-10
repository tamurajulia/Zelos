"use client";
import './adminHistorico.css'
import { useEffect, useState } from "react";
import Link from "next/link";
import Loader from "@/components/Loader/Loader";


export default function adminHistorico() {
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

  // Função para normalizar strings (remove acentos, caixa baixa, trim)
  const normalize = (str) =>
    str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim() : "";

  const renderChamados = (status) => {
    const filtrados = chamados.filter(
      (c) => normalize(c.status) === normalize(status)
    );

    if (filtrados.length === 0) {
      return <p style={{ textAlign: "center", padding: "1rem" }}>Nenhum chamado {status}.</p>;
    }

    return filtrados.map((chamado) => (
      <div key={chamado.id} className='card'>
        <div className='cardHeader'></div>
        <div className='cardBody'>
          <div className='info'>
            <p><strong>Item/patrimônio:</strong> {chamado.patrimonio}</p>
            <p><strong>Tipo de chamado:</strong> {tipos[chamado.tipo_id]}</p>
            <p>
              <strong>Responsável:</strong>{" "}
              {chamado.tecnico_id
                ? tecnicos[chamado.tecnico_id] || "Carregando técnico..."
                : "Nenhum técnico atribuído ainda"}
            </p>
          </div>
          <p className='status'>
            <strong>Status:</strong> {chamado.status}
          </p>
        </div>
        <div className='btnContainer'>
          <Link href={`./historico/${chamado.id}`}>
            <button className='detalhesBtn'>Detalhes</button>
          </Link>
        </div>
      </div>
    ));
  };

  return (
    <div>

      {/* Collapses */}
      <div className='container'>
        {["pendente", "em andamento", "concluído"].map((status, idx) => (
          <div key={idx} className='collapse'>
            <div
              className='collapseHeader'
              onClick={() => setOpenCollapse(openCollapse === status ? null : status)}
            >
              <h3 style={{ textTransform: "capitalize" }}>{status}</h3>
              <span>{openCollapse === status ? "▲" : "▼"}</span>
            </div>
            {openCollapse === status && (
              <div className='collapseContent'>{renderChamados(status)}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
