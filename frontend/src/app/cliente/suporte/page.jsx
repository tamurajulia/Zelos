"use client";

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import FaqItem from "../../../components/FaqItens/page";
import "./suporte.css";

export default function Suporte() {
  const [openId, setOpenId] = useState(null);



  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [loadingForm, setLoadingForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!titulo || !descricao) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    setLoadingForm(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token não encontrado");

      const response = await fetch("http://localhost:8080/duvidas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,

        },
        body: JSON.stringify({ titulo, descricao }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Erro ao enviar dúvida");
      }

      alert("Dúvida enviada com sucesso!");
      setTitulo("");
      setDescricao("");
    } catch (error) {
      console.error(error);
    alert(`Erro: ${error.message}`);

    } finally {
      setLoadingForm(false);
    }
  };

  // 🔹 Dados fixos embutidos
  const data = {
    banner: {
      image: "/BannerPc/suporte.png",
      celular: "/BannerMobile/suporte.png",
      alt: "Banner Suporte",
    },
    contacts: [
      {
        icon: "fas fa-phone",
        title: "Telefone",
        text: "(11) 4227-7450",
      },
      {
        icon: "fas fa-map-marker-alt",
        title: "Localização",
        text: "R. Santo André, 680 - Boa Vista, São Caetano do Sul - SP, 09572-000",
      },
      {
        icon: "fas fa-envelope",
        title: "E-mail",
        text: "Senai@outlook.com",
      },
    ],
    form: {
      image: "/fundoLogin.png",
      alt: "Atendimento",
      title: "Dúvida ou feedback?",
      icon: "fas fa-phone",
      fields: [
        { label: "Titulo completo", type: "text" },
        { label: "Mensagem", type: "textarea" },
      ],
      buttonText: "Entrar",
    },
    quickLinks: {
      background: "/bannerPc/suporte2.png",
      links: [
        {
          icon: "fas fa-comments",
          title: "suporte",
          description: "Fale com o nosso suporte",
          buttonText: "clica aqui",
          href: "#",
        },
        {
          icon: "fas fa-bullhorn",
          title: "chamado",
          description: "Faça o seu chamado aqui",
          buttonText: "clica aqui",
          href: "/cliente/chamados",
        },
        {
          icon: "fas fa-user",
          title: "status",
          description: "Veja o status do seu chamado aqui",
          buttonText: "clica aqui",
          href: "/cliente/historico",
        },
      ],
    },
    faq: [
      {
        id: "abrir-chamado",
        column: "left",
        question: "Como posso abrir um chamado?",
        answer:
          'Acesse o sistema, clique em "Abrir Chamado" e preencha o formulário com as informações solicitadas, incluindo o número de patrimônio do item.',
      },
      {
        id: "numero-patrimonio",
        column: "left",
        question: "Onde encontro o número de patrimônio do equipamento?",
        answer:
          "O número de patrimônio geralmente está em uma etiqueta no próprio equipamento ou na nota fiscal. Se não localizar, verifique com o responsável do setor.",
      },
      {
        id: "abrir-sem-patrimonio",
        column: "left",
        question: "Posso abrir um chamado sem informar o número de patrimônio?",
        answer:
          "Sim, mas isso pode atrasar o atendimento. Informe o máximo de detalhes possível (local, modelo, número de série).",
      },
      {
        id: "acompanhar-chamado",
        column: "left",
        question: "Como acompanho o andamento do meu chamado?",
        answer:
          "No sistema, acesse 'Meus Chamados' e visualize o histórico e status de cada solicitação.",
      },
      {
        id: "tipos-problemas",
        column: "left",
        question: "Que tipos de problemas posso relatar?",
        answer:
          "Relate problemas de hardware, software, rede, solicitação de manutenção e dúvidas operacionais relacionadas ao equipamento.",
      },
      {
        id: "tempo-atendimento",
        column: "right",
        question: "Quanto tempo leva para o chamado ser atendido?",
        answer:
          "O tempo de resposta pode variar conforme a prioridade. Chamados críticos são atendidos com mais urgência.",
      },
      {
        id: "quem-pode-abrir",
        column: "right",
        question: "Quem pode abrir chamados no sistema?",
        answer:
          "Qualquer usuário cadastrado no sistema com permissão de abertura de chamados. Contate o administrador caso não tenha acesso.",
      },
      {
        id: "atualizar-chamado",
        column: "right",
        question: "Posso atualizar informações de um chamado já aberto?",
        answer:
          "Sim — abra o chamado e adicione comentários ou anexos no histórico.",
      },
      {
        id: "cancelar-chamado",
        column: "right",
        question: "Posso cancelar um chamado depois de aberto?",
        answer:
          "Sim. Abra o chamado e escolha a opção 'Cancelar' ou solicite ao atendente que encerre o chamado.",
      },
      {
        id: "problema-persistir",
        column: "right",
        question: "O que fazer se o problema persistir após o atendimento?",
        answer:
          "Reabra o chamado informando que o problema persistiu, anexando evidências (fotos, prints, logs) para agilizar a nova análise.",
      },
    ],
  };

  function handleToggle(id) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  const left = data.faq.filter((f) => f.column === "left");
  const right = data.faq.filter((f) => f.column === "right");

  return (
    <>
      {/* Banner */}
      <div
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        <picture>
          <source media="(max-width: 768px)" srcSet={data.banner.celular} />
          <source media="(min-width: 769px)" srcSet={data.banner.image} />
          <img
            src={data.banner.image}
            alt={data.banner.alt}
            style={{
              width: "90%",
              objectFit: "cover",
              borderRadius: "25px",
              marginBottom: "5%",
              marginLeft: "5%",
            }}
          />
        </picture>
      </div>

      <div className="container py-5">
        {/* Contatos */}
        <div className="row text-center mb-5">
          {data.contacts.map((c, i) => (
            <div className="col-md-4 d-flex" key={i}>
              <div className="card-contato flex-fill p-4 border rounded shadow-sm">
                <i className={`${c.icon} contato-icon mb-3`}></i>
                <h5 className="fw-bold contato-titulo">{c.title}</h5>
                <p
                  className="contato-texto"
                  style={{ whiteSpace: "pre-line" }}
                >
                  {c.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Formulário */}
        <div className="row mb-5 align-items-center">
          <div className="col-md-6 text-center">
            <img
              src={data.form.image}
              alt={data.form.alt}
              className="img-fluid rounded-circle img-form"
            />
          </div>
          <div className="col-md-6">
            <h3 className="form-titulo mb-4">
              <i className={`${data.form.icon} me-2`}></i> {data.form.title}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="form-label-custom">Título</label>
                <input
                  type="text"
                  className="form-control form-input"
                  value={titulo}
                  placeholder="Ex: Como abrir um chamado"
                  onChange={(e) => setTitulo(e.target.value)
            
                  }
                />
              </div>
              <div className="mb-4">
                <label className="form-label-custom">Descrição</label>
                <textarea
                  className="form-control form-input"
                  rows="3"
                  value={descricao}
                  
                  onChange={(e) => setDescricao(e.target.value)}
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-enviar"
                disabled={loadingForm}
              >
                {loadingForm ? "Enviando..." : "Enviar"}
              </button>
            </form>
          </div>
        </div>

        {/* Links rápidos */}
        <div
          className="quick-links-card text-center text-white mb-5"
          style={{ backgroundImage: `url('${data.quickLinks.background}')` }}
        >
          <div className="row">
            {data.quickLinks.links.map((link, i) => (
              <div className="col-md-4" key={i}>
                <div className="link-item">
                  <i className={`${link.icon} icon`}></i>
                  <h6 className="fw-bold text-capitalize">{link.title}</h6>
                  <p>{link.description}</p>
                  <a href={link.href} className="btn btn-primary">
                    {link.buttonText}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <section className="faq-section">
          <div className="d-flex justify-content-center">
            <h3 className="form-titulo mb-4">
              Dúvidas Frequentes <i className="bi bi-patch-question-fill"></i>
            </h3>
          </div>
          <div className="row">
            <div className="col-md-6">
              {left.map((f) => (
                <FaqItem
                  key={f.id}
                  faq={f}
                  isOpen={openId === f.id}
                  onToggle={handleToggle}
                />
              ))}
            </div>
            <div className="col-md-6">
              {right.map((f) => (
                <FaqItem
                  key={f.id}
                  faq={f}
                  isOpen={openId === f.id}
                  onToggle={handleToggle}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
