'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Loader from '@/components/Loader/Loader'
import './detalhesChamados.css'

export default function DetalhesChamado() {
  const { id } = useParams();
  const router = useRouter();
  const [chamado, setChamado] = useState(null);
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [arquivos, setArquivos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchChamado() {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch(`http://localhost:8080/chamados/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Erro ao buscar chamado');

        const data = await response.json();
        setChamado(data);


        if (data.arquivos) {
          const arquivosArray = data.arquivos
            .split(',')
            .map(item => item.trim().replace(/\\/g, '/')) 
            .map(item => `http://localhost:8080${item}`);
          setArquivos(arquivosArray);
        } else {
          setArquivos([]);
        }


        if (data.usuario_id) {
          const userResponse = await fetch(`http://localhost:8080/usuarios/${data.usuario_id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (userResponse.ok) {
            const userData = await userResponse.json();
            setNomeUsuario(userData.nome || 'Nome não encontrado');
          } else {
            setNomeUsuario('Erro ao buscar nome');
          }
        }
      } catch (error) {
        console.error('Erro ao carregar chamado ou usuário:', error);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchChamado();
  }, [id]);

  async function handlePegarChamado() {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`http://localhost:8080/chamados/atribuirChamado/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao atribuir chamado');
      }

      alert('Chamado atribuído com sucesso!');


      const dataAtualizada = await response.json();
      setChamado(dataAtualizada);
      router.push('/tecnico/chamados');
    } catch (error) {
      console.error('Erro ao atribuir chamado:', error);
      alert('Erro ao tentar pegar o chamado.');
    }
  }

  if (loading) return <Loader />;
  if (!chamado) return <p>Chamado não encontrado.</p>;


  const prioridadeTexto = {
    1: 'Baixa',
    2: 'Média',
    3: 'Alta',
    4: 'Urgente',
  }[chamado.grauPrioridade] || 'Não definida';

  const tipoChamadoTexto = {
    1: 'Externo',
    2: 'Manutenção',
    3: 'Apoio Técnico',
    4: 'Limpeza',
  }[chamado.tipo_id] || 'Tipo desconhecido';

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="d-flex align-items-center mb-4">
          <a href="/tecnico/todosChamados" className={`text-decoration-none fs-5 me-2`}>
            <i className="bi bi-caret-left-fill" style={{ color: '#225299' }}></i>
          </a>
          <div className='tituloChamado'>
            <h2>Detalhes do chamado #{chamado.id}</h2>
          </div>
        </div>

        <div className={`mb-4 .containerCustom`}>
          <div className='cardHeader'>
            <h4>#{chamado.id}</h4>
            <h4>Início: {new Date(chamado.criado_em).toLocaleDateString()}</h4>
          </div>

          <div className="card-body">
            <h5 className='sectionTitle'>Informações gerais</h5>
            <h3 className="mb-4">“{chamado.titulo}”</h3>

            <div className="row mb-4">
              <div className="col-md-6">
                <p className="mb-1"><span className='label'>Nome do Solicitante:</span></p>
                <p>{nomeUsuario || 'Não informado'}</p>
              </div>
              <div className="col-md-6">
                <p className="mb-1"><span className='label'>Responsável:</span></p>
                <div>
                  <p>{chamado.tecnico_id ? chamado.tecnico_id : "Nenhum técnico atribuído ainda"}</p>
                </div>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-md-6">
                <p className="mb-1"><span className='label'>Prioridade:</span></p>
                <div>
                  <p>{prioridadeTexto}</p>
                </div>
              </div>
              <div className="col-md-6">
                <p className="mb-1"><span className='label'>Tipo de chamado:</span></p>
                <div>
                  <p>{tipoChamadoTexto}</p>
                </div>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-md-6">
                <p className="mb-1"><span className='label'>Descrição:</span></p>
                <div>
                  <p>{chamado.descricao}</p>
                </div>
              </div>
            </div>


            <hr className='linhaSeparadora' />


            <div className='d-flex justify-content-between'>


              <div className='col-md-6 d-flex flex-column'>
                <h5 className='sectionTitle'>Dados do patrimônio</h5>
                <p className='espacoEntreLinhas'><strong>Número do patrimônio:</strong> {chamado.patrimonio}</p>
                <p className='espacoEntreLinhas'><strong>Tipo:</strong> {chamado.tipoPatrimonio || 'Não informado'}</p>
                <p className='espacoEntreLinhas'><strong>Localização:</strong> {chamado.localizacao}</p>
              </div>



              <div className="col-md-6 detalhes-photo">
                {arquivos.length > 0 && (
                  <>
                    <h5 className='sectionTitle'>Fotos</h5>

                    <div id="carouselChamado" className="carousel slide">

                      {/* Indicators (bolinhas) */}
                      <div className="carousel-indicators">
                        {arquivos.map((_, index) => (
                          <button
                            key={index}
                            type="button"
                            data-bs-target="#carouselChamado"
                            data-bs-slide-to={index}
                            className={index === 0 ? "active" : ""}
                            aria-current={index === 0 ? "true" : undefined}
                            aria-label={`Slide ${index + 1}`}
                          ></button>
                        ))}
                      </div>

                      {/* Slides */}
                      <div className="carousel-inner">
                        {arquivos.map((url, index) => (
                          <div
                            key={index}
                            className={`carousel-item ${index === 0 ? "active" : ""}`}
                          >
                            <img
                              src={url}
                              className="img-fluid"
                              alt={`Foto ${index + 1} do chamado`}
                              style={{
                                maxHeight: "400px",
                                objectFit: "contain",
                                borderRadius: "12px"
                              }}
                            />
                          </div>
                        ))}
                      </div>

                      {/* Botões de navegação */}
                      <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselChamado"
                        data-bs-slide="prev"
                      >
                        <span><i className="bi bi-caret-left-fill" aria-hidden="true"></i></span>
                        <span className="visually-hidden">Anterior</span>
                      </button>
                      <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselChamado"
                        data-bs-slide="next"
                      >
                        <span><i className="bi bi-caret-right-fill" aria-hidden="true"></i></span>
                        <span className="visually-hidden">Próxima</span>
                      </button>
                    </div>
                  </>
                )}
              </div>




            </div>


            <hr className='linhaSeparadora' />
            {!chamado.tecnico_id && (
              <div className="d-flex justify-content-start mt-3">
                <button
                  type="button"
                  className={`me-2 btnAzul`}
                  onClick={handlePegarChamado}
                >
                  Pegar Chamado
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
