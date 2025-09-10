// pages/politicas-privacidade.js
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './politicas.css';

export default function PoliticasPrivacidade() {
  return (
    <div className="container">
    {/* Título */}
    <h1 className="text-center mb-5" style={{ color: '#cc0000' }}>
      Políticas de Privacidade
    </h1>

    {/* Texto */}
    <div style={{ color: '#225299', fontSize: '1.1rem', lineHeight: '1.6' }}>
      <p>
        Esta Política de Privacidade descreve como coletamos, usamos e protegemos as informações pessoais
        fornecidas pelos usuários ao utilizar nossos serviços e acessar nosso site.
      </p>

      <h4 className="mt-4">1. Coleta de Informações</h4>
      <p>
        Podemos coletar informações pessoais, como nome, e-mail e dados de contato, quando você se registra
        ou utiliza nossos serviços. Também podemos coletar dados de navegação automaticamente.
      </p>

      <h4 className="mt-4">2. Uso das Informações</h4>
      <p>
        As informações coletadas são utilizadas para melhorar a experiência do usuário, fornecer suporte,
        enviar comunicações relevantes e garantir a segurança da plataforma.
      </p>

      <h4 className="mt-4">3. Compartilhamento de Dados</h4>
      <p>
        Não compartilhamos informações pessoais com terceiros, exceto quando necessário para o cumprimento
        legal ou com o consentimento do usuário.
      </p>

      <h4 className="mt-4">4. Segurança</h4>
      <p>
        Adotamos medidas técnicas e organizacionais adequadas para proteger suas informações contra acesso
        não autorizado, perda ou alteração.
      </p>

      <h4 className="mt-4">5. Alterações na Política</h4>
      <p>
        Podemos atualizar esta Política de Privacidade periodicamente. Recomendamos que os usuários revisem
        esta página regularmente para se manterem informados sobre eventuais mudanças.
      </p>

      <h4 className="mt-4">6. Contato</h4>
      <p>
        Caso tenha dúvidas sobre esta Política de Privacidade, entre em contato através de nossos canais de
        atendimento.
      </p>
    </div>
  </div>
  );
}
