'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import './login.css'

export default function LoginPage() {
  const [numeroRegistro, setNumeroRegistro] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log('🟡 Iniciando login com:', { cpf, senha });

    try {

      
      const res = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          username: numeroRegistro, 
          password: senha 
        })
      });

      const data = await res.json();
      console.log(data)

      if (res.ok) {
 
        localStorage.setItem('token', data.token);
        localStorage.setItem('usuario', JSON.stringify(data.usuario));

        const funcao = data.usuario.funcao;
        
        switch (funcao) {
          case 'admin':
            router.push('/admin');
            break;
          case 'tecnico':
            router.push('/tecnico');
            break;
          case 'usuario':
            router.push('/cliente');
            break;
          default:
            alert(`Função não reconhecida: ${funcao}`);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
        
      } else {
        console.error("❌ Erro do backend:", data.message);
        alert(data.message || 'Erro no login');
      }
      
    } catch (error) {
      console.error('❌ Erro de conexão:', error);
      alert('Erro ao conectar com o servidor');
    } finally {
      setLoading(false);
    }
  };






  return (
    <>
      <div className="login-page-container">
        <div className="row divisao">
          <div className="col-md-6 coluna">
            <div className="login-form-container">
              <form className="login-form" onSubmit={handleLogin}>
                <h1>Seja bem-vindo!</h1>
                <p>Sua próxima descoberta está a apenas um clique.</p>
                
                <div className="form-group">
                  <label htmlFor="cpf">Numero de Registro</label>
                  <div className="input-container">
                    <input
                      type="text"
                      id="cpf"
                      name="cpf"
                      placeholder="Digite seu Numero de Registro"
                      value={numeroRegistro}
                      onChange={(e) => setNumeroRegistro(e.target.value)}
                      required
                      maxLength="14"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="senha">Senha</label>
                  <div className="input-container">
                    <input
                      placeholder="Digite sua senha"
                      type='password'
                      id="senha"
                      name="senha"
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                      required
                    />
                 
                  </div>
                </div>
                
                <div className="link-group">
                  <Link href="https://pess.sesisenaispedu.org.br/Portal.aspx">Esqueceu a senha?</Link>
                </div>
                
                <button type="submit" className="btn-entrar" disabled={loading}>
                  {loading ? 'Entrando...' : 'Entrar'}
                </button>
              </form>
            </div>
          </div>

          <div className="col-md-5">
            <div className="login">
              <img src="/fundoLogin.png" alt="Fundo login" style={{width:'100%'}}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}