"use client";
import "./tecnico.css";
import React, { useEffect, useState, useRef } from "react";

export default function Tecnicos() {
  const [listaTecnicos, setListaTecnicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [selectedPool, setSelectedPool] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [dropdownAberto, setDropdownAberto] = useState(false);
  const dropdownRef = useRef(null);

  const especialidades = {
    1: "Externo",
    2: "Manutencao",
    3: "Apoio tecnico",
    4: "Limpeza",
  };

  const [pools, setPools] = useState([
    { id: 1, nome: "Externo" },
    { id: 2, nome: "Manutenção" },
    { id: 3, nome: "Apoio técnico" },
    { id: 4, nome: "Limpeza" },
  ]);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownAberto(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchTecnicos = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token não encontrado no localStorage");
          setLoading(false);
          return;
        }

        const response = await fetch("http://localhost:8080/pool/tecnicos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Erro ao buscar técnicos");

        const tecnicosPool = await response.json();

        const tecnicosCompletos = await Promise.all(
          tecnicosPool.map(async (tecnico) => {
            try {
              const resp = await fetch(
                `http://localhost:8080/usuarios/${tecnico.id_tecnico}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              if (!resp.ok)
                throw new Error(`Erro ao buscar usuário ${tecnico.id_tecnico}`);

              const usuario = await resp.json();

              return {
                ...tecnico,
                ...usuario,
                especialidade: especialidades[tecnico.id_pool] || "Não definido",
              };
            } catch (err) {
              console.error(err);
              return tecnico;
            }
          })
        );

        setListaTecnicos(tecnicosCompletos);
      } catch (error) {
        console.error("Erro geral:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTecnicos();
  }, []);

  useEffect(() => {
    const fetchUsuariosApenas = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token não encontrado");

        const response = await fetch("http://localhost:8080/usuarios", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Erro ao buscar usuários");

        const data = await response.json();

        const usuariosFiltrados = data.filter(
          (usuario) =>
            usuario.funcao && usuario.funcao.toLowerCase() === "usuario"
        );

        setUsuariosFiltrados(usuariosFiltrados);
      } catch (error) {
        console.error("Erro:", error);
      }
    };

    fetchUsuariosApenas();
  }, []);

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    setSelectedUsuario(null);
    setSelectedPool("");
    setDropdownAberto(false);
  };

  const handleUsuarioSelect = (usuario) => {
    setSelectedUsuario(usuario);
  };

  const handlePoolSelect = (poolId) => {
    setSelectedPool(poolId);
    setDropdownAberto(false);
  };

  const handleSubmit = async () => {
    if (!selectedUsuario || !selectedPool) {
      alert("Selecione um usuário e uma pool antes de confirmar.");
      return;
    }

    setSubmitLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token não encontrado");

      const response = await fetch(
        `http://localhost:8080/pool/cadastrarTecnicos/${selectedUsuario.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id_pool: Number(selectedPool),
          }),
        }
      );

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Erro ao cadastrar técnico");
      }

      alert("Técnico cadastrado com sucesso!");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert(`Erro: ${error.message}`);
    } finally {
      setSubmitLoading(false);
    }
  };

  const TecnicoCard = ({ tecnico }) => (
    <div className="tecnico-card">
      <div className="linha">
        <p>
          <strong className="label">ID Técnico:</strong> {tecnico.id_tecnico}
        </p>
      </div>
      <div className="linha">
        <p>
          <strong className="label">Usuário:</strong> {tecnico.nome}
        </p>
      </div>
      <div className="linha">
        <p>
          <strong className="label">Email:</strong> {tecnico.email}
        </p>
      </div>
      <div className="linha">
        <p>
          <strong className="label">Cargo:</strong> {tecnico.funcao}
        </p>
      </div>
      <div className="linha">
        <p>
          <strong className="label">Especializado em:</strong>{" "}
          {tecnico.especialidade}
        </p>
      </div>
    </div>
  );

  return (
    <div className="container mt-4">
      <div className="d-flex align-items-center mb-4">
        <h2 className="mb-0 me-2" style={{ color: "#225299" }}>
          Técnicos
        </h2>
        <i
          className="bi bi-caret-down-fill fs-5"
          style={{ color: "#225299" }}
        ></i>
      </div>

      <button className="btn btn-primary mb-3" onClick={openModal}>
        Cadastrar Técnico
      </button>

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Escolha o usuário</h3>
            <div style={{ maxHeight: "300px", overflowY: "auto" }}>
              <table className="table table-hover table-bordered">
                <thead>
                  <tr>
                    <th>Registro</th>
                    <th>Nome</th>
                    <th>Função</th>
                    <th>Email</th>
                    <th>Selecionar</th>
                  </tr>
                </thead>
                <tbody>
                  {usuariosFiltrados.map((usuario) => (
                    <tr
                      key={usuario.id}
                      className={
                        selectedUsuario?.id === usuario.id ? "table-primary" : ""
                      }
                    >
                      <td>{usuario.numeroRegistro}</td>
                      <td>{usuario.nome}</td>
                      <td>{usuario.funcao}</td>
                      <td>{usuario.email}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleUsuarioSelect(usuario)}
                        >
                          Selecionar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h4 className="mt-3">Selecione a especialidade:</h4>
            
            {/* Dropdown personalizado para seleção de pool */}
            <div ref={dropdownRef} style={{ position: "relative" }}>
              <div 
                className="select-custom"
                onClick={() => setDropdownAberto(!dropdownAberto)}
              >
                {selectedPool
                  ? pools.find((p) => p.id == selectedPool)?.nome
                  : "Selecione a especialidade"}
                <span className="seta">▼</span>
              </div>
              
              {dropdownAberto && (
                <ul className="opcoes">
                  {pools.map((pool) => (
                    <li
                      key={pool.id}
                      onClick={() => handlePoolSelect(pool.id)}
                    >
                      {pool.nome}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mt-4 d-flex justify-content-end gap-2">
              <button
                className="btn btn-secondary"
                onClick={closeModal}
                disabled={submitLoading}
              >
                Cancelar
              </button>
              <button
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={submitLoading || !selectedUsuario || !selectedPool}
              >
                {submitLoading ? "Salvando..." : "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <p>Carregando técnicos...</p>
      ) : (
        <div className="tecnicos-grid">
          {listaTecnicos.length > 0 ? (
            listaTecnicos.map((tecnico) => (
              <TecnicoCard
                key={`${tecnico.id_tecnico}-${tecnico.id_pool}`}
                tecnico={tecnico}
              />
            ))
          ) : (
            <p>Nenhum técnico encontrado.</p>
          )}
        </div>
      )}
    </div>
  );
}