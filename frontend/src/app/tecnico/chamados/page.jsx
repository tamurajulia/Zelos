'use client';

import "./chamados.css";
import React, { useEffect, useState } from 'react';
import Link from "next/link";

export default function Chamados() {
  const [chamadosEmProcesso, setChamadosEmProcesso] = useState([]);
  const [chamadosConcluidos, setChamadosConcluidos] = useState([]);
  const [loadingProcesso, setLoadingProcesso] = useState(true);
  const [loadingConcluidos, setLoadingConcluidos] = useState(true);

  // Funções auxiliares
  const tipoChamadoTexto = (tipo_id) => ({
    1: 'Externo',
    2: 'Manutenção',
    3: 'Apoio Técnico',
    4: 'Limpeza',
  }[tipo_id] || 'Tipo desconhecido');

  const prioridadeTexto = (grauPrioridade) => ({
    1: 'Baixa',
    2: 'Média',
    3: 'Alta',
    4: 'Urgente',
  }[grauPrioridade] || 'Não definida');

  // Função para buscar o nome do usuário pelo ID
  const fetchNomeUsuario = async (usuario_id, token) => {
    if (!usuario_id) return 'Não atribuído';
    try {
      const res = await fetch(`http://localhost:8080/usuarios/${usuario_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Erro ao buscar usuário');
      const data = await res.json();
      return data.nome || 'Não atribuído';
    } catch (err) {
      console.error(err);
      return 'Não atribuído';
    }
  };

  // Buscar chamados em andamento
  useEffect(() => {
    async function fetchChamadosEmAndamento() {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/chamados/chamadosAndamentoTecnico', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Erro ao buscar chamados em andamento');
        const data = await response.json();

        const chamadosFormatados = await Promise.all(
          data.map(async (chamado) => {
            const nomeUsuario = await fetchNomeUsuario(chamado.usuario_id, token);
            return {
              id: chamado.id,
              titulo: chamado.titulo,
              data: `Início: ${new Date(chamado.criado_em).toLocaleDateString()}`,
              tipochamado: tipoChamadoTexto(chamado.tipo_id),
              patrimonio: chamado.patrimonio || 'Não informado',
              usuario: nomeUsuario,
              prioridade: prioridadeTexto(chamado.grauPrioridade),
            };
          })
        );

        setChamadosEmProcesso(chamadosFormatados);
      } catch (error) {
        console.error('Erro ao carregar chamados em andamento:', error);
      } finally {
        setLoadingProcesso(false);
      }
    }

    fetchChamadosEmAndamento();
  }, []);

  // Buscar chamados concluídos
  useEffect(() => {
    async function fetchChamadosConcluidos() {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/chamados/chamadosConcluidoTecnico', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Erro ao buscar chamados concluídos');
        const data = await response.json();

        const chamadosFormatados = await Promise.all(
          data.map(async (chamado) => {
            const nomeUsuario = await fetchNomeUsuario(chamado.usuario_id, token);
            return {
              id: chamado.id,
              titulo: chamado.titulo,
              data: `Início: ${new Date(chamado.criado_em).toLocaleDateString()} | Término: ${new Date(chamado.atualizado_em).toLocaleDateString()}`,
              tipochamado: tipoChamadoTexto(chamado.tipo_id),
              patrimonio: chamado.patrimonio || 'Não informado',
              usuario: nomeUsuario,
              prioridade: prioridadeTexto(chamado.grauPrioridade),
            };
          })
        );

        setChamadosConcluidos(chamadosFormatados);
      } catch (error) {
        console.error('Erro ao carregar chamados concluídos:', error);
      } finally {
        setLoadingConcluidos(false);
      }
    }

    fetchChamadosConcluidos();
  }, []);

  const ChamadoCard = ({ chamado }) => (
    <div className="chamado-card">
      <div className="row align-items-center">
        <div className="col-12 col-md-6">
          <h5 className="mb-2">#{chamado.id}</h5>
          <h4 className="mb-2">“{chamado.titulo}”</h4>
          <p className="mb-1"><strong>Tipo de chamado: </strong>{chamado.tipochamado}</p>
          <p className="mb-1"><strong>Número do patrimônio: </strong>{chamado.patrimonio}</p>
          <p className="mb-1"><strong>Usuario: </strong>{chamado.usuario}</p>
        </div>
        <div className="col-12 col-md-6 text-md-end mt-3 mt-md-0">
          <p className="mb-1 data-chamado">{chamado.data}</p>
          <p className="mb-1"><strong>Prioridade:</strong> {chamado.prioridade}</p>
          <Link href={`/tecnico/chamados/${chamado.id}`}>
            <button type="button" className="btn-detalhes mt-2">
              Detalhes <i className="bi bi-caret-left-fill"></i>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mt-4">
      {/* Em processo */}
      <div className="card">
        <div className="card-header" data-bs-toggle="collapse" data-bs-target="#collapseEmProcesso" aria-expanded="true" aria-controls="collapseEmProcesso">
          <h5 className="mb-0">Em processo</h5>
          <i className="bi bi-caret-down-fill"></i>
        </div>
        <div className="collapse show" id="collapseEmProcesso">
          <div className="card-body">
            {loadingProcesso
              ? <p>Carregando chamados...</p>
              : chamadosEmProcesso.length > 0
                ? chamadosEmProcesso.map(chamado => <ChamadoCard key={chamado.id} chamado={chamado} />)
                : <p>Nenhum chamado em andamento encontrado.</p>
            }
          </div>
        </div>
      </div>

      {/* Concluídos */}
      <div className="card mt-4">
        <div className="card-header" data-bs-toggle="collapse" data-bs-target="#collapseConcluidos" aria-expanded="true" aria-controls="collapseConcluidos">
          <h5 className="mb-0">Concluídos</h5>
          <i className="bi bi-caret-down-fill"></i>
        </div>
        <div className="collapse show" id="collapseConcluidos">
          <div className="card-body">
            {loadingConcluidos
              ? <p>Carregando chamados concluídos...</p>
              : chamadosConcluidos.length > 0
                ? chamadosConcluidos.map(chamado => <ChamadoCard key={chamado.id} chamado={chamado} />)
                : <p>Nenhum chamado concluído encontrado.</p>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
