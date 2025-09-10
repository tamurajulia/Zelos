"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import './todosChamados.css';

export default function TodosChamados() {
  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchChamados = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token não encontrado.");
        return;
      }

      const response = await fetch("http://localhost:8080/chamados/areaTecnico", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar chamados.");
      }

      const data = await response.json();
      setChamados(data);
    } catch (error) {
      console.error("Erro ao buscar chamados:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChamados();
  }, []);


  const getPrioridadeTexto = (grau) => {
    const prioridades = {
      1: "Baixa",
      2: "Média",
      3: "Alta",
      4: "Urgente",
    };
    return prioridades[grau] || "Não definido";
  };

  const getTipoChamadoTexto = (tipoId) => {
    const tipos = {
      1: "Externo",
      2: "Manutenção",
      3: "Apoio Técnico",
      4: "Limpeza",
    };
    return tipos[tipoId] || "Não definido";
  };

  const ChamadoCard = ({ chamado }) => (
    <div className="chamado-card">
      <div className="row align-items-center">
        <div className="col-12 col-md-6">
          <h5 className="mb-2">#{chamado.id}</h5>
          <h4 className="mb-2">“{chamado.titulo}”</h4>
          <p className="mb-1">
            <strong>Tipo de chamado: </strong>{getTipoChamadoTexto(chamado.tipo_id)}
          </p>
          <p className="mb-1">
            <strong>Número do patrimônio: </strong>{chamado.patrimonio}
          </p>
          <p className="mb-1">
            <strong>Responsável:</strong> {chamado.responsavel || 'Sem responsável'}
          </p>
        </div>
        <div className="col-12 col-md-6 text-md-end mt-3 mt-md-0">
          <p className="mb-1 data-chamado">{chamado.data}</p>
          <p className="mb-1">
            <strong>Prioridade:</strong> {getPrioridadeTexto(chamado.grauPrioridade)}
          </p>
          <Link href={`/tecnico/todosChamados/${chamado.id}`}>
            <button type="button" className="btn-detalhes mt-2">
              Detalhes <i className="bi bi-caret-left-fill"></i>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container">
      <div className="card">
        <div
          className="card-header"
          data-bs-toggle="collapse"
          data-bs-target="#collapseDisponiveis"
          aria-expanded="true"
          aria-controls="collapseDisponiveis"
        >
          <h5 className="mb-0">Chamados da sua área</h5>
          <i className="bi bi-caret-down-fill"></i>
        </div>
        <div className="collapse show" id="collapseDisponiveis">
          <div className="card-body">
            {loading ? (
              <p>Carregando chamados...</p>
            ) : chamados.length === 0 ? (
              <p>Nenhum chamado encontrado.</p>
            ) : (
              chamados.map((chamado) => (
                <ChamadoCard key={chamado.id} chamado={chamado} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
