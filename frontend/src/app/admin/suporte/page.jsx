"use client";

import React, { useEffect, useState } from "react";
import "./suporte.css";

export default function AdminSuporte() {
  const [duvidas, setDuvidas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [respostas, setRespostas] = useState({});

  useEffect(() => {
    const fetchDuvidas = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token não encontrado");

        const response = await fetch("http://localhost:8080/duvidas", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Erro ao buscar dúvidas");

        const data = await response.json();
        setDuvidas(data);
      } catch (error) {
        console.error(error);
        alert(`Erro: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchDuvidas();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("pt-BR", options);
  };

  const handleChangeResposta = (id, value) => {
    setRespostas({ ...respostas, [id]: value });
  };

  const handleEnviarResposta = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token não encontrado");

      const response = await fetch(`http://localhost:8080/duvidas/${id}/responder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ resposta: respostas[id] }),
      });

      if (!response.ok) throw new Error("Erro ao enviar resposta");

      alert("Resposta enviada com sucesso!");
      setRespostaAtiva(null);
      setRespostas({ ...respostas, [id]: "" });
    } catch (error) {
      console.error(error);
      alert(`Erro: ${error.message}`);
    }
  };

  return (
    <div className="admin-suporte-container">
      <h2 className="admin-suporte-title">Painel de Dúvidas</h2>

      {loading ? (
        <p className="admin-suporte-message">Carregando dúvidas...</p>
      ) : duvidas.length === 0 ? (
        <p className="admin-suporte-message">Nenhuma dúvida encontrada.</p>
      ) : (
        <div className="admin-suporte-grid">
          {duvidas.map((duvida, index) => (
            <div className="admin-suporte-card" key={duvida.id || index}>
              <div className="admin-suporte-card-header">{duvida.titulo}</div>

              <div className="admin-suporte-card-body">
                <p className="admin-suporte-card-text">{duvida.descricao}</p>
              </div>

              <div className="admin-suporte-card-footer">
                <div className="footer-left">
                  <span className="admin-suporte-user">
                    {typeof duvida.usuario === "string" ? duvida.usuario : (duvida.usuario?.nome || duvida.usuario || "Usuário")}
                  </span>
                  <p className="admin-suporte-email">{duvida.email}</p>
                </div>

                <div className="footer-center">
                  <span className="admin-suporte-date">{formatDate(duvida.criado_em)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
