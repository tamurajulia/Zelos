"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function ProfileModal({ open, onClose }) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    if (open) {
      const storedUser = localStorage.getItem("usuario");
      if (storedUser) {
        try {
          setUsuario(JSON.parse(storedUser));
        } catch (error) {
          console.error("Erro ao ler usuário do localStorage:", error);
        }
      }
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#f7f3f2",
          padding: "2rem",
          borderRadius: "20px",
          width: "400px",
          textAlign: "center",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão X para fechar */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "transparent",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
            color: "#cc0000",
          }}
          aria-label="Fechar"
        >
          ×
        </button>

        <h3 style={{ color: "#cc0000", marginBottom: "0.2rem" }}>MEU</h3>
        <h2 style={{ color: "#1a3d7c", fontWeight: "bold" }}>perfil</h2>

        <p style={{ fontWeight: "bold", marginTop: "1.5rem" }}>
          <span style={{ color: "#cc0000" }}>Usuário: </span>
          <span style={{ color: "#1a3d7c" }}>{usuario?.nome || "Não informado"}</span>
        </p>

        <p style={{ fontWeight: "bold" }}>
          <span style={{ color: "#cc0000" }}>Email: </span>
          <span style={{ color: "#1a3d7c" }}>{usuario?.email || "Não informado"}</span>
        </p>

        {/* Botão com link para histórico */}
        <Link href="/cliente/historico" style={{ textDecoration: "none" }}>
          <button
            style={{
              backgroundColor: "#cc0000",
              color: "white",
              padding: "0.8rem 1.5rem",
              borderRadius: "20px",
              border: "none",
              fontWeight: "bold",
              marginTop: "2rem",
              cursor: "pointer",
            }}
            onClick={onClose}
          >
            Acessar histórico de chamados
          </button>
        </Link>
      </div>
    </div>
  );
}

