'use client';
import "./usuarios.css";
import React, { useEffect, useState } from "react";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
 
  const pools = [
    { id: 1, nome: "Externo" },
    { id: 2, nome: "Manutencao" },
    { id: 3, nome: "Apoio tecnico" },
    { id: 4, nome: "Limpeza" },
  ];

  useEffect(() => {
    const fetchUsuariosGeral = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token não encontrado");

        const response = await fetch("http://localhost:8080/usuarios", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Erro ao buscar usuários");

        const data = await response.json();

        setUsuarios(data);
      } catch (error) {
        console.error("Erro:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuariosGeral();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex align-items-center mb-4">
        <h2 className="mb-0 me-2" style={{ color: "#225299" }}>Usuários</h2>
        <i className="bi bi-caret-down-fill fs-5" style={{ color: "#225299" }}></i>
      </div>

      {loading ? (
        <p>Carregando usuários...</p>
      ) : usuarios.length > 0 ? (
        <div className="usuarios-grid">
          {usuarios.map((usuario) => (
            <div key={usuario.id} className="usuario-card">
              <p><strong>Número Registro:</strong> {usuario.numeroRegistro}</p>
              <p><strong>Nome:</strong> {usuario.nome}</p>
              <p><strong>Email:</strong> {usuario.email}</p>
              <p><strong>Função:</strong> {usuario.funcao}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Nenhum usuário encontrado.</p>
      )}
    </div>
  );
}
