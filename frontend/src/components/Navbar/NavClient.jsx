"use client";
import { useState, useEffect } from "react"; // Adicione useEffect
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProfileModal from "./ProfileModal";
import "./navbar.css";
import "bootstrap-icons/font/bootstrap-icons.css";
 
export default function NavClient() {
  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
 
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };
 
    window.addEventListener("resize", handleResize);
 
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
 
  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };
 
  return (
    <>
      <header className="navbar-custom">
        <div className="navbar-content">
          {/* Botão hambúrguer no mobile */}
          <div className="logo-mobile">
            <img src="/img/logo.png" alt="Logo" className="logo-img" />
            <button
              className="menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <i className="bi bi-list"></i>
            </button>
          </div>
 
          {/* Links desktop */}
          <nav className="menu-nav">
            <Link href="/cliente">Home</Link>
            <Link href="/cliente/chamados">Chamados</Link>
            <Link href="/cliente/suporte">Suporte</Link>
            <Link href="/cliente/historico">Histórico</Link>
          </nav>
 
          {/* Ícones */}
          <div className="icons">
            <i
              className="bi bi-person-fill"
              onClick={() => setModalOpen(true)}
            ></i>
            <i
              className="bi bi-door-open-fill"
              onClick={handleLogout}
              title="Sair"
              style={{ cursor: "pointer" }}
            ></i>
          </div>
        </div>
 
        {/* Menu mobile (abre quando clica) */}
        {menuOpen && (
          <nav className="menu-mobile">
            <Link href="/">Home</Link>
            <Link href="/cliente/chamados">Chamados</Link>
            <Link href="/cliente/suporte">Suporte</Link>
            <Link href="/cliente/historico">Histórico</Link>
          </nav>
        )}
      </header>
 
      {/* Modal */}
      <ProfileModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}