'use client';

import { useEffect, useState } from 'react';
import Loader from '@/components/Loader/Loader';
import { useRouter } from 'next/navigation';
import './403.css';

export default function RotaProtegida({ permitido, children }) {
    const [tipoUser, setTipoUser] = useState(null);
    const [redirecionar, setRedirecionar] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            const usuarioJSON = localStorage.getItem('usuario');

            if (!token || !usuarioJSON) {
                router.push("/");
                return;
            }

            try {
                const usuario = JSON.parse(usuarioJSON);
                const tipo = usuario.funcao;
                setTipoUser(tipo);

                const redirecionamentos = {
                    tecnico: '/tecnico',
                    usuario: '/usuario',
                    admin: '/admin',
                };

                setRedirecionar(redirecionamentos[tipo] || '/');

            } catch (error) {
                console.error("Erro ao fazer parse do JSON do usuário:", error);
                router.push("/");
            }
        }
    }, [router]);

    if (tipoUser === null) {
        return <Loader />;
    }

    if (!permitido.includes(tipoUser)) {
        return (
            <div className="corpo403">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <img src="/bannerPc/403.png" className='img-fluid' alt="" />
                            <p className='notfound-p'>Você não tem permissão para acessar esta página</p>
                            <div className="button">
                                <a href={redirecionar} className="notfound-button">Voltar</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}