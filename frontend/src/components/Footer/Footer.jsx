"use client";
import { usePathname } from 'next/navigation';
import './footer.css';

export default function Footer() {
    const pathName = usePathname();
    if (pathName.startsWith('/empresa/dashboard')) return null;

    return (
        <footer className="footer">
            <div className="container">

                {/* Logo e Links */}
                <div className="footer-content">
                    <div className="footer-logo">
                        <img src="/img/logo.png" alt="Logo" />
                    </div>

                    <div className="footer-links">
                        <div className="link-column">
                            <ul>
                                <li><a href="/cliente">HOME</a></li>
                                <li><a href="/cliente/chamados">CHAMADO</a></li>
                                <li><a href="/cliente/historico">HISTÓRICO</a></li>
                            </ul>
                        </div>
                        <div className="link-column">
                            <ul>
                                <li><a href="/cliente/suporte">SUPORTE</a></li>
                                <li><a href="/cliente/politicas">POLÍTICA DE PRIVACIDADE</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Linha separadora */}
                <hr className="footer-divider" />

                {/* Ícones alinhados à direita */}
                <div className="footer-bottom">
                    <div className="footer-social">
                        <a href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
                            <i className="bi bi-linkedin"></i>
                        </a>
                        <a href="https://github.com" target="_blank" aria-label="GitHub">
                            <i className="bi bi-github"></i>
                        </a>
                        <a href="https://wa.me/5591999999999" target="_blank" aria-label="WhatsApp">
                            <i className="bi bi-whatsapp"></i>
                        </a>
                    </div>
                </div>

                {/* Texto centralizado */}
                <div className="footer-copy">
                    © 2025 CareerNest. Todos os direitos reservados
                </div>
            </div>
        </footer>
    );
}
