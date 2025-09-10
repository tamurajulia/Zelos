"use client";

import Image from "next/image";
import "./homecliente.css"; 

export default function Home() {;

  return (
    <>


      <div>
        {/* banner */}
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <picture>
            <source media="(max-width: 768px)" srcSet="/BannerMobile/home.png" />
            <source media="(min-width: 769px)" srcSet="/bannerPc/home.png" />
            <img
              src="/bannerPc/home.png"
              alt="Banner"
              style={{
                width: "90%",
                objectFit: "cover",
                borderRadius: "25px",
                marginBottom: "5%",
                marginTop: "2%",
                marginLeft: "5%",
              }}
            />
          </picture>
        </div>

        {/* SOBRE O SISTEMA */}
        <section className="py-5 sobre">
          <div className="container">
            <div className="row align-items-center gy-4">
              <div className="col-md-6 text-center">
                <Image
                  src="/img/zelo.png"
                  alt="Zelos SENAI"
                  width={560}
                  height={420}
                  className="img-fluid"
                />
              </div>
              <div className="col-md-6">
                <span className="badge rounded-pill chip">SOBRE O SISTEMA</span>
                <h2 className="mt-3 titulo">
                  Zelos SENAI — Seu parceiro confiável na gestão de chamados.
                </h2>
                <p className="mt-3">
                  O Zelos SENAI conecta problemas a soluções de forma rápida, tecnológica e
                  eficiente, utilizando o número de patrimônio como identificador principal
                  para cada chamado.
                </p>
                <ul className="mt-3 lista">
                  <li>
                    <b>Atendimento Ágil:</b> Abertura e acompanhamento de chamados em tempo
                    real.
                  </li>
                  <li>
                    <b>Integração Tecnológica:</b> Conectado com sistemas internos para
                    maior eficiência.
                  </li>
                  <li>
                    <b>Foco no Usuário:</b> Interface simples e intuitiva para todos os
                    colaboradores.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* POR QUE ESCOLHER (com fundo e 4 ícones Bootstrap) */}
        <section className="beneficios">
          <div className="overlay"></div>
          <div className="container position-relative">
            <h2 className="text-center text-white fw-bold mb-5">
              Por que escolher o Zelos SENAI?
            </h2>
            <div className="row g-4 text-center">
              <div className="col-12 col-md-3">
                <div className="iconWrap">
                  <i className="bi bi-telephone-fill"></i>
                </div>
                <h5 className="text-white mt-3">Atendimento Rápido</h5>
                <p className="text-white-50 mb-0">
                  Abertura e acompanhamento de chamados em tempo real.
                </p>
              </div>
              <div className="col-12 col-md-3">
                <div className="iconWrap">
                  <i className="bi bi-laptop-fill"></i>
                </div>
                <h5 className="text-white mt-3">Tecnologia Integrada</h5>
                <p className="text-white-50 mb-0">
                  Conectado às bases internas para rastrear e resolver problemas.
                </p>
              </div>
              <div className="col-12 col-md-3">
                <div className="iconWrap">
                  <i className="bi bi-bar-chart-fill"></i>
                </div>
                <h5 className="text-white mt-3">Gestão Eficiente</h5>
                <p className="text-white-50 mb-0">
                  Organize, priorize e monitore todos os chamados.
                </p>
              </div>
              <div className="col-12 col-md-3">
                <div className="iconWrap">
                  <i className="bi bi-headset"></i>
                </div>
                <h5 className="text-white mt-3">Suporte Personalizado</h5>
                <p className="text-white-50 mb-0">
                  Equipe preparada para entender e solucionar cada solicitação.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-5 bg-white">
          <div className="container">
            <div className="row gx-4 align-items-stretch">
              {/* Coluna 1 */}
              <div className="col-lg-5 d-flex flex-column h-100">
                <div className="flex-grow-1 lh-lg">
                  <p className="mb-2 fw-semibold" style={{ color: "#cc0000" }}>
                    Como abrir um chamado
                  </p>
                  <h2 className="fw-bold mb-3" style={{ color: "#760000" }}>
                    Siga esses passos para solicitar manutenção
                  </h2>
                  <p className="text-muted mb-3">
                    O processo é simples e rápido para garantir que seu problema seja resolvido com
                    agilidade. Basta seguir o passo a passo.
                  </p>
                  <ul className="list-unstyled text-muted fs-6">
                    <li className="mb-1">✓ Tenha o número de patrimônio em mãos.</li>
                    <li className="mb-1">✓ Preencha o formulário corretamente.</li>
                    <li>✓ Aguarde o retorno da equipe.</li>
                  </ul>
                </div>
              </div>

              {/* Coluna 2 */}
              <div className="col-lg-3 d-flex flex-column justify-content-start gap-3 h-100 ">
                <div className="p-2 rounded-3 shadow-sm bg-light w-100" style={{ minHeight: "90px" }}>
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <i className="bi bi-clipboard-check fs-4" style={{ color: "#cc0000" }}></i>
                    <b>1. Identifique o item</b>
                  </div>
                  <small className="text-muted ms-4">
                    Encontre o número de patrimônio do item com problema.
                  </small>
                </div>

                <div className="p-2 rounded-3 shadow-sm bg-light w-100" style={{ minHeight: "90px" }}>
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <i className="bi bi-ui-checks fs-4" style={{ color: "#cc0000" }}></i>
                    <b>2. Preencha os dados</b>
                  </div>
                  <small className="text-muted ms-4">
                    Acesse o sistema e insira as informações no formulário.
                  </small>
                </div>

                <div className="p-2 rounded-3 shadow-sm bg-light w-100" style={{ minHeight: "90px" }}>
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <i className="bi bi-send-fill fs-4" style={{ color: "#cc0000" }}></i>
                    <b>3. Envie o chamado</b>
                  </div>
                  <small className="text-muted ms-4">
                    Confirme e envie para que nossa equipe atenda.
                  </small>
                </div>
              </div>

              {/* Coluna 3 */}
              <div className="col-lg-4 d-flex justify-content-center home-passos-img mt-3 mt-lg-0">
                <Image
                  src="/img/passoschamado.png"
                  alt="Passo a passo"
                  width={240}
                  height={140}
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </section>

        {/* BENEFÍCIOS EXTRAS (4 cards coloridos) */}
        <section className="py-5 bg-white">
          <div className="row g-4 justify-content-center">
            <h2 className="text-center fw-bold mb-1 tituloSecao">Beneficios extras do sistema</h2>
            <p className="text-center mb-4">
              Mais praticidade e eficiência no atendimento das demandas da escola SENAI
            </p>

            <div className="col-12 col-sm-6 col-md-3 d-flex">
              <div className="cardColor c1 card-custom">
                <div className="cardIcon">
                  <i className="bi bi-clipboard-data-fill"></i>
                </div>
                <h5 className="text-white mt-3 mb-2 text-center">Acompanhamento em tempo real</h5>
                <p className="text-white-50 text-center">
                  Veja o status do seu chamado de forma simples e rápida.
                </p>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-3 d-flex">
              <div className="cardColor c2 card-custom">
                <div className="cardIcon">
                  <i className="bi bi-clock-history"></i>
                </div>
                <h5 className="text-white mt-3 mb-2 text-center">Histórico de solicitações</h5>
                <p className="text-white-50 text-center">
                  Consulte todos os chamados anteriores a qualquer momento.
                </p>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-3 d-flex">
              <div className="cardColor c3 card-custom">
                <div className="cardIcon">
                  <i className="bi bi-bell-fill"></i>
                </div>
                <h5 className="text-white mt-3 mb-2 text-center">Notificações automáticas</h5>
                <p className="text-white-50 text-center">
                  Receba avisos sobre atualizações no seu chamado.
                </p>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-3 d-flex">
              <div className="cardColor c4 card-custom">
                <div className="cardIcon">
                  <i className="bi bi-lightning-charge-fill"></i>
                </div>
                <h5 className="text-white mt-3 mb-2 text-center">Atendimento prioritário</h5>
                <p className="text-white-50 text-center">
                  Chamados críticos recebem resposta com mais agilidade.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* EQUIPE */}
        <section className="py-5 bg-white">
          <div className="container">
            <h2 className="text-center fw-bold mb-4 tituloSecao">Conheça nossos técnicos</h2>
            <p className="text-center mb-4">
              Profissionais dedicados a garantir que todos os chamados sejam resolvidos com agilidade e eficiência
            </p>
            <div className="row g-4">
              {/* Carlos Andrade */}
              <div className="col-12 col-sm-6 col-md-3">
                <div className="rounded overflow-hidden shadow-sm cardEquipe">
                  <Image
                    src="/img/carlosandrade.png"
                    alt="Carlos Andrade"
                    width={420}
                    height={420}
                    className="img-fluid"
                  />
                  <div className="cardOverlay">
                    <p>
                      Coordena a equipe de suporte, garantindo qualidade e eficiência no atendimento.
                    </p>
                  </div>
                  <div className="cardEquipeInfo">
                    <h6 className="mb-0">Carlos Andrade</h6>
                    <small className="text-white-50">Coordenador de Suporte</small>
                  </div>
                </div>
              </div>

              {/* Fernanda Lima */}
              <div className="col-12 col-sm-6 col-md-3">
                <div className="rounded overflow-hidden shadow-sm cardEquipe">
                  <Image
                    src="/img/fernandalima.png"
                    alt="Fernanda Lima"
                    width={420}
                    height={420}
                    className="img-fluid"
                  />
                  <div className="cardOverlay">
                    <p>
                      Analisa solicitações, organiza prioridades e acompanha o andamento das demandas.
                    </p>
                  </div>
                  <div className="cardEquipeInfo">
                    <h6 className="mb-0">Fernanda Lima</h6>
                    <small className="text-white-50">Analista de Chamados</small>
                  </div>
                </div>
              </div>

              {/* João Silva */}
              <div className="col-12 col-sm-6 col-md-3">
                <div className="rounded overflow-hidden shadow-sm cardEquipe">
                  <Image
                    src="/img/joaosilva.png"
                    alt="João Silva"
                    width={420}
                    height={420}
                    className="img-fluid"
                  />
                  <div className="cardOverlay">
                    <p>
                      Responsável pela manutenção preventiva e corretiva, garantindo o bom funcionamento dos equipamentos.
                    </p>
                  </div>
                  <div className="cardEquipeInfo">
                    <h6 className="mb-0">João Silva</h6>
                    <small className="text-white-50">Técnico de Manutenção</small>
                  </div>
                </div>
              </div>

              {/* Mariana Souza */}
              <div className="col-12 col-sm-6 col-md-3">
                <div className="rounded overflow-hidden shadow-sm cardEquipe">
                  <Image
                    src="/img/marianasouza.png"
                    alt="Mariana Souza"
                    width={420}
                    height={420}
                    className="img-fluid"
                  />
                  <div className="cardOverlay">
                    <p>
                      Atende os usuários, registra solicitações e presta suporte administrativo para a equipe técnica.
                    </p>
                  </div>
                  <div className="cardEquipeInfo">
                    <h6 className="mb-0">Mariana Souza</h6>
                    <small className="text-white-50">Atendimento Administrativo</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
