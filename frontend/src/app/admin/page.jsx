'use client';

import './dashboard.css'

import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    Tooltip,
    Legend,
    Title
} from 'chart.js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    Tooltip,
    Legend,
    Title
);

export default function AdmDashboard() {
    const [chamadosEmProcesso, setChamadosEmProcesso] = useState(0);
    const [chamadosAbertos, setChamadosAbertos] = useState(0);
    const [chamadosConcluidos, setChamadosConcluidos] = useState(0);

    const [statusData, setStatusData] = useState(null);
    const [prioridadeData, setPrioridadeData] = useState(null);

    // Carrega dados de status
    useEffect(() => {
        const fetchChamados = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return console.error("Token não encontrado no localStorage");

                const endpoints = [
                    { url: "naoAtribuido", setter: setChamadosAbertos },
                    { url: "andamento", setter: setChamadosEmProcesso },
                    { url: "concluido", setter: setChamadosConcluidos }
                ];

                for (const { url, setter } of endpoints) {
                    const res = await fetch(`http://localhost:8080/dashboardAdmin/${url}`, {
                        headers: { "Authorization": `Bearer ${token}` },
                    });
                    if (!res.ok) throw new Error(`Erro ao buscar ${url}`);
                    const data = await res.json();
                    setter(data.length);
                }

            } catch (error) {
                console.error("Erro ao carregar chamados:", error);
            }
        };

        fetchChamados();
    }, []);

    // Atualiza gráfico de status
    useEffect(() => {
        setStatusData({
            labels: ['Concluídos', 'Abertos', 'Em processo'],
            datasets: [{
                data: [chamadosConcluidos, chamadosAbertos, chamadosEmProcesso],
                backgroundColor: ['#007bff', '#17a2b8', '#00539C'],
                borderColor: '#fff',
                hoverOffset: 4,
            }],
        });
    }, [chamadosAbertos, chamadosEmProcesso, chamadosConcluidos]);

    // Carrega dados de prioridades
    useEffect(() => {
        const fetchPrioridades = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return console.error("Token não encontrado no localStorage");

                const prioridades = [1, 2, 3, 4]; // Baixa, Média, Alta, Urgente
                const resultados = await Promise.all(prioridades.map(async (prioridade) => {
                    const res = await fetch(`http://localhost:8080/dashboardAdmin/grauPrioridade?grauPrioridade=${prioridade}`, {
                        headers: { "Authorization": `Bearer ${token}` },
                    });
                    if (!res.ok) throw new Error(`Erro ao buscar prioridade ${prioridade}`);
                    const data = await res.json();
                    return data.length;
                }));

                setPrioridadeData({
                    labels: ['Baixa', 'Média', 'Alta', 'Urgente'],
                    datasets: [{
                        label: 'Chamados',
                        data: resultados,
                        backgroundColor: '#1E4790',
                        borderColor: '#1E4790',
                        borderWidth: 1,
                    }],
                });

            } catch (error) {
                console.error("Erro ao carregar prioridades:", error);
            }
        };

        fetchPrioridades();
    }, []);

    const barChartOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
        },
        scales: {
            x: { grid: { display: false } },
            y: { grid: { display: false } },
        },
    };

    const pieChartOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'bottom' },
        },
    };

    const handleDownloadPDF = () => {
        const input = document.getElementById('dashboard-pdf-content');
        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save("dashboard-relatorio.pdf");
        });
    };

    return (
        <>
            <div className="container mt-4" id="dashboard-pdf-content">
                <div className="d-flex align-items-center mb-5">
                    <h2 className="mb-0 me-2 ">Dashboard</h2>
                    <i className="bi bi-caret-down-fill fs-5 " style={{ color: '#225299' }}></i>
                </div>

                <h4 className="mb-3">Total de chamados:</h4>
                <div className="row g-4 mb-5">
                    {/* Chamados Abertos */}
                    <div className="col-12 col-md-4">
                        <div className="card shadow-sm h-100" style={{ backgroundColor: '#f8f9fa' }}>
                            <div className="card-body" style={{ backgroundColor: '#f5f0ef' }}>
                                <div className="row align-items-center">
                                    <div className="col-4 text-end">
                                        <h1 className="display-1 fw-bold">{chamadosAbertos}</h1>
                                    </div>
                                    <div className="col-8">
                                        <p className="mb-2 text-muted small">Desde: 20/08/2025</p>
                                        <h4 className="fw-bold">Chamados Abertos</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chamados em Processo */}
                    <div className="col-12 col-md-4">
                        <div className="card shadow-sm h-100" style={{ backgroundColor: '#f8f9fa' }}>
                            <div className="card-body" style={{ backgroundColor: '#f5f0ef' }}>
                                <div className="row align-items-center">
                                    <div className="col-4 text-end">
                                        <h1 className="display-1 fw-bold">{chamadosEmProcesso}</h1>
                                    </div>
                                    <div className="col-8">
                                        <p className="mb-2 text-muted small">Desde: 20/08/2025</p>
                                        <h4 className="fw-bold">Chamados em Processo</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chamados Concluídos */}
                    <div className="col-12 col-md-4">
                        <div className="card shadow-sm h-100" style={{ backgroundColor: '#f8f9fa' }}>
                            <div className="card-body" style={{ backgroundColor: '#f5f0ef' }}>
                                <div className="row align-items-center">
                                    <div className="col-4 text-end">
                                        <h1 className="display-1 fw-bold">{chamadosConcluidos}</h1>
                                    </div>
                                    <div className="col-8">
                                        <p className="mb-2 text-muted small">Desde: 20/08/2025</p>
                                        <h4 className="fw-bold">Chamados Concluídos</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Gráficos */}
                <div className="row g-4 mb-5">
                    <div className="col-12 col-md-6">
                        <h4 className="mb-3">Chamados por Prioridade:</h4>
                        <div className="card shadow-sm h-100" style={{ backgroundColor: '#f8f9fa' }}>
                            <div className="card-body" style={{ backgroundColor: '#f5f0ef' }}>
                                {prioridadeData && (
                                    <Bar data={prioridadeData} options={barChartOptions} />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <h4 className="mb-3">Chamados por Status:</h4>
                        <div className="card shadow-sm h-100" style={{ backgroundColor: '#f8f9fa' }}>
                            <div className="card-body" style={{ backgroundColor: '#f5f0ef' }}>
                                {statusData && (
                                    <Pie data={statusData} options={pieChartOptions} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-center btn-pdf">
                <button
                    onClick={handleDownloadPDF}
                    className="btn btn-lg btn-personalizado"
                >
                    Baixar em PDF <i className="bi bi-download"></i>
                </button>
            </div>
        </>
    );
}
