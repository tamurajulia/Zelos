'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import RotaProtegida from '@/components/Protecaorota/ProtecaoRota'
import './tecdash.css';

export default function TecnicoLayout({ children }) {
  const [nomeTecnico, setNomeTecnico] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const usuarioJSON = localStorage.getItem('usuario');
      if (usuarioJSON) {
        try {
          const usuario = JSON.parse(usuarioJSON);
          setNomeTecnico(usuario.nome);
        } catch (error) {
          console.error("Erro ao fazer parse do JSON do usuário:", error);
          router.push('/');
        }
      } else {
        router.push('/');
      }
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    router.push('/');
  };

  return (
    <RotaProtegida permitido={['tecnico']}>
    <html lang="pt-br">
      <body>  
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

            <span className="navbar-brand fw-bold text-danger me-auto logo">
              <img src="/img/logo.png" className="img-fluid" alt="Logo" />
            </span>

            <span className="fw-bold text-danger nome-usuario">
              {nomeTecnico || 'Carregando...'}
            </span>

            <i
  className="bi bi-box-arrow-right fs-4 text-danger"
  onClick={handleLogout}
  title="Sair"
  style={{ cursor: 'pointer' }}
></i>

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

            <main className="flex-grow-1 p-3 bg-light overflow-auto">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
    </RotaProtegida>
  );
}

function SidebarContent() {
  return (
    <ul className="nav flex-column">
      <li className="nav-item mb-2">
        <Link
          href="/tecnico"
          className="nav-link text-danger fw-bold d-flex align-items-center"
        >
          <i className="bi bi-grid-1x2-fill me-2"></i> Dashboard
        </Link>
      </li>
      <li className="nav-item">
        <Link
          href="/tecnico/chamados"
          className="nav-link text-danger fw-bold d-flex align-items-center"
        >
          <i className="bi bi-megaphone-fill me-2"></i> Meus Chamados
        </Link>
      </li>
      <li className="nav-item">
        <Link
          href="/tecnico/todosChamados"
          className="nav-link text-danger fw-bold d-flex align-items-center"
        >
          <i className="bi bi-megaphone-fill me-2"></i> Todos os Chamados
        </Link>
      </li>
    </ul>
  );
}