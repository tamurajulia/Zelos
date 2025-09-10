'use client';

import React, { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import './tecdash.css';

export default function TecDashboard() {
  const [chamadosAbertosGeral, setChamadosAbertosGeral] = useState(0);
  const [chamadosProcessoGeral, setChamadosProcessoGeral] = useState(0);
  const [chamadosProcessoAtribuido, setChamadosProcessoAtribuido] = useState(0);
  const [chamadosConcluidos, setChamadosConcluidos] = useState(0);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  const dataAtual = new Date().toLocaleDateString('pt-BR');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        // Chamados Abertos (Geral)
        const resAbertos = await fetch('http://localhost:8080/dashboardTecnico/naoAtribuido', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const dataAbertos = await resAbertos.json();
        setChamadosAbertosGeral(dataAbertos.length);

        // Chamados em Processo (Geral)
        const resAndamentoGeral = await fetch('http://localhost:8080/dashboardTecnico/andamento', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const dataAndamentoGeral = await resAndamentoGeral.json();
        setChamadosProcessoGeral(dataAndamentoGeral.length);

        // Chamados em Processo (Atribuídos ao Técnico)
        const resAndamentoTecnico = await fetch('http://localhost:8080/dashboardTecnico/andamentoTecnico', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const dataAndamentoTecnico = await resAndamentoTecnico.json();
        setChamadosProcessoAtribuido(dataAndamentoTecnico.length);

        // Chamados Concluídos (Técnico)
        const resConcluidos = await fetch('http://localhost:8080/dashboardTecnico/concluidoTecnico', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const dataConcluidos = await resConcluidos.json();
        setChamadosConcluidos(dataConcluidos.length);

      } catch (err) {
        console.error('Erro ao buscar dados do dashboard:', err);
        setErro('Erro ao carregar os dados do dashboard.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDownloadPDF = () => {
    const input = document.getElementById('dashboard-pdf-content');
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('dashboard-relatorio.pdf');
    });
  };

  if (loading) {
    return <p className="text-center mt-5">🔄 Carregando dados do dashboard...</p>;
  }

  if (erro) {
    return <p className="text-danger text-center mt-5">❌ {erro}</p>;
  }

  return (
    <div className="container mt-4" id="dashboard-pdf-content">
      {/* Título */}
      <div className="d-flex align-items-center mb-5">
        <h2 className="mb-0 me-2" style={{ color: '#225299' }}>Dashboard</h2>
        <i className="bi bi-caret-down-fill fs-5" style={{ color: '#225299' }}></i>
      </div>

      {/* Chamados Gerais */}
      <h4 className="mb-3" style={{ color: '#225299' }}>Total de chamados:</h4>
      <div className="row g-4 mb-5">
        <CardInfo quantidade={chamadosAbertosGeral} titulo="Chamados Abertos" data={dataAtual} />
        <CardInfo quantidade={chamadosProcessoGeral} titulo="Chamados em Processo (Geral)" data={dataAtual} />
      </div>

      {/* Chamados Atribuídos */}
      <h4 className="mb-3" style={{ color: '#225299' }}>Chamados atribuídos a mim:</h4>
      <div className="row g-4 mb-5">
        <CardInfo quantidade={chamadosProcessoAtribuido} titulo="Chamados em Processo" data={dataAtual} />
        <CardInfo quantidade={chamadosConcluidos} titulo="Chamados Concluídos" data={dataAtual} />
      </div>

      {/* PDF Button */}
      <div className="d-flex justify-content-center btn-pdf">
        <button
          onClick={handleDownloadPDF}
          className="btn btn-lg btn-personalizado"
        >
          Baixar em PDF <i className="bi bi-download"></i>
        </button>
      </div>
    </div>
  );
}

// CardInfo Componente Reutilizável
function CardInfo({ quantidade, titulo, data }) {
  return (
    <div className="col-12 col-md-6">
      <div className="card shadow-sm h-100 my-radius" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="card-body" style={{ backgroundColor: '#f5f0ef' }}>
          <div className="row align-items-center">
            <div className="col-4">
              <h1 className="display-1 fw-bold mb-0 me-3" style={{ color: '#225299' }}>
                {quantidade}
              </h1>
            </div>
            <div className="col-8">
              <p className="text-muted small mb-1">Desde: {data}</p>
              <h4 className="fw-bold mt-2" style={{ color: '#225299' }}>{titulo}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
