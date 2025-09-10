"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RotaProtegida from '@/components/Protecaorota/ProtecaoRota'
import './dashboard.css'
import Link from "next/link";

export default function Layout({ children }) {
    const [nomeAdmin, setNomeAdmin] = useState("");
    const router = useRouter();

    useEffect(() => {
        const storedUsuario = localStorage.getItem("usuario");
        if (storedUsuario) {
            try {
                const usuarioObj = JSON.parse(storedUsuario);
                if (usuarioObj.funcao === "admin") {
                    setNomeAdmin(usuarioObj.nome);
                }
            } catch (error) {
                console.error("Erro ao ler usuário do localStorage:", error);
            }
        }
    }, []);

    function handleLogout() {
        localStorage.removeItem("usuario");
        router.push("/");
    }

    return (
        <RotaProtegida permitido={['admin']}>
            <div className="d-flex flex-column vh-100">
                <nav className="navbar navbar-expand-lg navbar-light shadow-sm px-3 navbar-horizontal">

                    <button
                        className="btn d-lg-none me-2"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#sidebarOffcanvas"
                        aria-controls="sidebarOffcanvas"
                    >
                        <i className="bi bi-list fs-3"></i>
                    </button>

                    <span className="navbar-brand fw-bold text-danger me-auto">
                        <img src="/logo.png" className="img-fluid imagem" alt="Logo" />
                    </span>

                    <Link href="/admin/novo" className="btn btn-danger me-3 d-none d-md-flex align-items-center admin-btn-criar">
                        Criar novo chamado <i className="bi bi-plus-circle ms-1"></i>
                    </Link>


                    <span className="fw-bold text-danger nome-usuario">
                        {nomeAdmin || "Carregando..."}
                    </span>

                    <button
                        onClick={handleLogout}
                        className="btn btn-link text-danger fs-4 ms-2"
                        title="Logout"
                        aria-label="Logout"
                        type="button"
                        style={{ cursor: "pointer" }}
                    >
                        <i className="bi bi-box-arrow-right"></i>
                    </button>
                </nav>

                <div className="d-flex flex-grow-1">
                    <div className="d-none d-lg-flex flex-column p-3 border-end sidebar-fundo">
                        <SidebarContent />
                    </div>

                    <div className="offcanvas offcanvas-start" tabIndex="-1" id="sidebarOffcanvas">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title fw-bold text-danger">
                                zelos <span className="text-primary">senai</span>
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="offcanvas"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="offcanvas-body">
                            <SidebarContent />
                        </div>
                    </div>

                    <main className="flex-grow-1 p-3 bg-light overflow-auto">{children}</main>
                </div>
            </div>
        </RotaProtegida>
    );
}

function SidebarContent() {
    return (
        <ul className="nav flex-column itens-navbar">
            <li className="nav-item mb-2">
                <a href="/admin" className="nav-link text-danger fw-bold d-flex align-items-center">
                    <i className="bi bi-grid-1x2-fill me-2"></i> Dashboard
                </a>
            </li>
            <li className="nav-item mb-2">
                <a href="/admin/historico" className="nav-link text-danger fw-bold d-flex align-items-center">
                    <i className="bi bi-book-fill me-2"></i> Histórico
                </a>
            </li>
            <li className="nav-item mb-2">
                <a href="/admin/usuarios" className="nav-link text-danger fw-bold d-flex align-items-center">
                    <i className="bi bi-people-fill me-2"></i> Usuários
                </a>
            </li>
            <li className="nav-item mb-2">
                <a href="/admin/tecnicos" className="nav-link text-danger fw-bold d-flex align-items-center">
                    <i className="bi bi-person-gear me-2"></i> Técnicos
                </a>
            </li>
            <li className="nav-item mb-2">
                <a href="/admin/chamados" className="nav-link text-danger fw-bold d-flex align-items-center">
                    <i className="bi bi-megaphone-fill me-2"></i> Chamados
                </a>
            </li>
            <li className="nav-item">
                <a href="/admin/suporte" className="nav-link text-danger fw-bold d-flex align-items-center">
                    <i className="bi bi-question-square-fill me-2"></i> Dúvidas
                </a>
            </li>
        </ul>
    );
}
