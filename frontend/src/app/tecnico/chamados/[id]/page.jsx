'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '@/components/Loader/Loader';
import './detalhesChamados.css'

export default function DetalhesChamado() {
  const { id } = useParams();
  const router = useRouter();

  // Estados do chamado
  const [chamado, setChamado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [arquivos, setArquivos] = useState([]);
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [nomeTecnico, setNomeTecnico] = useState('');

  // Novos estados para o relatório de conclusão
  const [relatorio, setRelatorio] = useState(null);
  const [arquivosRelatorio, setArquivosRelatorio] = useState([]);
  const [nomeTecnicoApontamento, setNomeTecnicoApontamento] = useState("");

  // NOVO: Estado para controlar a exibição do collapse
  const [showCollapse, setShowCollapse] = useState(false);

  // Estados do formulário de relatório (se for para criar um novo)
  const [descricao, setDescricao] = useState('');
  const [pecasUtilizadas, setPecasUtilizadas] = useState('');
  const [files, setFiles] = useState([]);

  useEffect(() => {
    async function fetchChamado() {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8080/chamados/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error('Erro ao buscar chamado');

        const data = await response.json();
        setChamado(data);

        const arquivosArray = data.arquivos
          ? data.arquivos.split(',').map(path => path.trim().replace(/\\/g, '/'))
          : [];
        setArquivos(arquivosArray);

        if (data.usuario_id) {
          const usuarioRes = await fetch(`http://localhost:8080/usuarios/${data.usuario_id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (usuarioRes.ok) {
            const usuarioData = await usuarioRes.json();
            setNomeUsuario(usuarioData.nome || 'Não informado');
          }
        }

        if (data.tecnico_id) {
          const tecnicoRes = await fetch(`http://localhost:8080/usuarios/${data.tecnico_id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (tecnicoRes.ok) {
            const tecnicoData = await tecnicoRes.json();
            setNomeTecnico(tecnicoData.nome || 'Nenhum técnico atribuído');
          }
        }

        // Busca o relatório APENAS se o chamado estiver concluído
        if (data.status === 'concluído') {
          const apontamentoRes = await fetch(`http://localhost:8080/apontamentos/${data.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (apontamentoRes.ok) {
            const apontamentoData = await apontamentoRes.json();
            setRelatorio(apontamentoData);

            // Processa os arquivos do relatório
            const arquivosRelatorioArray = apontamentoData.arquivos
              ? apontamentoData.arquivos.split(',').map(path => path.trim().replace(/\\/g, '/'))
              : [];
            setArquivosRelatorio(arquivosRelatorioArray);

            // Busca o nome do técnico do relatório
            if (apontamentoData.tecnico_id) {
              const tecnicoRelatorioRes = await fetch(`http://localhost:8080/usuarios/${apontamentoData.tecnico_id}`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              if (tecnicoRelatorioRes.ok) {
                const tecnicoRelatorioData = await tecnicoRelatorioRes.json();
                setNomeTecnicoApontamento(tecnicoRelatorioData.nome || 'Não informado');
              }
            }
          }
        }

      } catch (error) {
        console.error('Erro ao carregar chamado:', error);
        toast.error('Erro ao carregar detalhes do chamado.');
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchChamado();
  }, [id]);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!descricao.trim()) {
        toast.warn('A descrição da solução é obrigatória.');
        return;
      }

      const formData = new FormData();
      formData.append('descricao', descricao);
      formData.append('pecasUtilizadas', pecasUtilizadas);

      files.forEach(file => {
        formData.append('arquivos', file);
      });

      const apontamentoRes = await fetch(`http://localhost:8080/apontamentos/${id}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!apontamentoRes.ok) throw new Error('Erro ao criar apontamento');

      const concluirRes = await fetch(`http://localhost:8080/chamados/concluirChamado/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: 'concluído' }),
      });

      if (!concluirRes.ok) throw new Error('Erro ao concluir chamado');

      toast.success('Chamado concluído e relatório enviado com sucesso!');
      router.push('/tecnico/chamados');
      setDescricao('');
      setPecasUtilizadas('');
      setFiles([]);

    } catch (error) {
      console.error(error);
      toast.error('Erro ao enviar relatório.');
    }
  };


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

      {/* Toast */}
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="d-flex align-items-center mb-4">
        <a href="/tecnico/chamados" className={`text-decoration-none fs-5 me-2`}>
          <i className="bi bi-caret-left-fill" style={{ color: '#225299' }}></i>
        </a>
        <div className='tituloChamado'>
          <h2>Detalhes do chamado #{chamado.id}</h2>
        </div>
      </div>

      {/* Faixa azul superior */}
      <div className='cardHeader'>
        <span>#{chamado.id}</span>
        <span>Início: {new Date(chamado.criado_em).toLocaleDateString('pt-BR')}</span>
      </div>

      {/* Card principal */}
      <div className="card-body">
        <h5 className='sectionTitle'>Informações gerais</h5>
        <h3 className="mb-4">“{chamado.titulo}”</h3>

        <div className="row mb-4">
          <div className="col-md-6">
            <p className="mb-1"><span className='label'>Nome do Solicitante:</span></p>
            <p>{nomeUsuario}</p>
          </div>
          <div className="col-md-6">
            <p className="mb-1"><span className='label'>Responsável:</span></p>
            <p>{nomeTecnico || 'Nenhum técnico atribuído ainda'}</p>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-6">
            <p className="mb-1"><span className='label'>Prioridade:</span></p>
            <p>{prioridadeTexto}</p>
          </div>
          <div className="col-md-6">
            <p className="mb-1"><span className='label'>Tipo de chamado:</span></p>
            <p>{tipoChamadoTexto}</p>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-6">
            <p className="mb-1"><span className='label'>Descrição:</span></p>
            <p>{chamado.descricao}</p>
          </div>
        </div>

        <hr className='linhaSeparadora' />

        <div className='d-flex justify-content-between'>
          <div className='d-flex flex-column'>
            <h5 className='sectionTitle'>Dados do patrimônio</h5>
            <p><strong>Número do patrimônio:</strong> {chamado.patrimonio}</p>
            <p><strong>Tipo:</strong> {chamado.tipoPatrimonio || 'Não informado'}</p>
            <p><strong>Localização:</strong> {chamado.localizacao}</p>
          </div>

          <div className="col-md-6 detalhes-photo">
            {arquivos.length > 0 && (
              <>
                <h5 className='sectionTitle'>Fotos</h5>

                <div id="carouselChamado" className="carousel slide">
                  {/* Indicators */}
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
                          src={`http://localhost:8080${url}`}
                          className="img-fluid"
                          alt={`Foto ${index + 1}`}
                          style={{
                            maxHeight: "400px",
                            objectFit: "contain",
                            borderRadius: "12px",
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
                    <span>
                      <i className="bi bi-caret-left-fill fs-2" aria-hidden="true"></i>
                    </span>
                    <span className="visually-hidden">Anterior</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselChamado"
                    data-bs-slide="next"
                  >
                    <span>
                      <i className="bi bi-caret-right-fill fs-2" aria-hidden="true"></i>
                    </span>
                    <span className="visually-hidden">Próxima</span>
                  </button>
                </div>
              </>
            )}
          </div>

        </div>
      </div>

      {/* Botão para abrir/ver relatório */}
      <div className="d-grid gap-2 mt-5 mb-3">
        <button className='btnAbrirRelatorio'
          type="button"
          onClick={() => setShowCollapse(!showCollapse)}>
          <span>
            {chamado.status === 'concluído' ? 'Ver relatório de conclusão' : 'Abrir um relatório de conclusão'}
          </span>
          <i className={showCollapse ? "bi bi-dash-circle-fill" : "bi bi-plus-circle-fill"}></i>
        </button>
      </div>

      {/* Conteúdo do relatório (formulário ou visualização) */}
      <div className={`collapse ${showCollapse ? 'show' : ''}`} id="collapseRelatorio">
        {/* Renderização condicional para o conteúdo do colapso */}
        {chamado.status === 'concluído' ? (
          // Conteúdo para visualização do relatório
          relatorio && (
            <div className='cardRelatorio'>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <p className="mb-1 fw-bold">Técnico Responsável:</p>
                  <p>{nomeTecnicoApontamento || 'Não informado'}</p>
                </div>
                <div className="col-md-6 mb-3">
                  <p className="mb-1 fw-bold">Peças utilizadas:</p>
                  <p>{relatorio.pecasUtilizadas || 'Não informado'}</p>
                </div>
                <div className="col-md-12 mb-3">
                  <p className="mb-1 fw-bold">Descrição da solução:</p>
                  <p>{relatorio.descricao || 'Não informado'}</p>
                </div>

                {arquivosRelatorio.length > 0 && (
                  <div id="carouselRelatorio" className="carousel slide" data-bs-ride="false">
                    <div className="carousel-indicators">
                      {arquivosRelatorio.map((_, index) => (
                        <button key={index} type="button" data-bs-target="#carouselRelatorio" data-bs-slide-to={index} className={index === 0 ? "active" : ""}></button>
                      ))}
                    </div>

                    <div className="carousel-inner">
                      {arquivosRelatorio.map((url, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                          <img
                            src={`http://localhost:8080${url}`}
                            className="d-block w-100"
                            alt={`Arquivo ${index + 1}`}
                            style={{ maxHeight: "400px", objectFit: "contain" }}
                          />
                        </div>
                      ))}
                    </div>

                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target="#carouselRelatorio"
                      data-bs-slide="prev"
                    >
                      <span>
                        <i className="bi bi-caret-left-fill fs-2" aria-hidden="true"></i>
                      </span>
                      <span className="visually-hidden">Anterior</span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target="#carouselRelatorio"
                      data-bs-slide="next"
                    >
                      <span>
                        <i className="bi bi-caret-right-fill fs-2" aria-hidden="true"></i>
                      </span>
                      <span className="visually-hidden">Próxima</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )
        ) : (
          // Conteúdo para o formulário de envio de relatório 
          <div className='cardRelatorio'>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="descricaoSolucao" className="form-label fw-bold">Descrição da solução</label>
                <textarea
                  className='textareaEstilizado'
                  id="descricaoSolucao"
                  rows="6"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                ></textarea>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="pecasUtilizadas" className="form-label fw-bold">Peças utilizadas</label>
                <textarea
                  className='textareaEstilizado'
                  id="pecasUtilizadas"
                  rows="6"
                  value={pecasUtilizadas}
                  onChange={(e) => setPecasUtilizadas(e.target.value)}
                ></textarea>
              </div>
            </div>

            {/* Upload de arquivos */}
            <div className="mb-4">
              <label htmlFor="anexarArquivos" className="form-label fw-bold">
                Anexe fotos ou arquivos
              </label>
              <p className="text-muted small">
                Faça upload de até 10 arquivos aceitos: PDF ou imagem.
                O tamanho máximo é de 10 MB por item.
              </p>
              <div className="border border-secondary p-4 text-center rounded">
                <p className="mb-2">Arraste e solte arquivos aqui</p>

                <label htmlFor="anexarArquivosInput" className="btn btn-primary">
                  Anexar arquivo <i className="bi bi-download"></i>
                </label>
                <input
                  type="file"
                  id="anexarArquivosInput"
                  multiple
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const novosArquivos = Array.from(e.target.files);
                    setFiles((prev) => [...prev, ...novosArquivos]);
                  }}
                />

                {files.length > 0 && (
                  <div className="mt-3 text-start">
                    <strong>Arquivos selecionados:</strong>
                    <ul className="d-flex flex-column list-unstyled mb-0 gap-2">
                      {files.map((file, index) => (
                        <li
                          key={index}
                          className="d-flex justify-content-between align-items-center"
                        >
                          <span>{file.name}</span>
                          <button
                            type="button"
                            className="btn btn-sm btn-danger"
                            onClick={() =>
                              setFiles((prev) => prev.filter((_, i) => i !== index))
                            }
                          >
                            Remover
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="d-flex justify-content-end mt-3">
              <button type="button" className='btnConcluir' onClick={handleSubmit}>
                Concluir relatório
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}