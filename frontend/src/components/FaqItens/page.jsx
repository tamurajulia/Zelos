"use client";

import React from "react";
// Caminho ajustado e com nome correto do arquivo
import "./FaqItem.css";

export default function FaqItem({ faq, isOpen, onToggle }) {
  const contentId = `content-${faq.id}`;
  const btnId = `btn-${faq.id}`;

  return (
    <article className="item">
      <button
        id={btnId}
        aria-controls={contentId}
        aria-expanded={isOpen ? "true" : "false"}
        className="question"
        onClick={() => onToggle(faq.id)}
      >
        <span className="qText">{faq.question}</span>
        <span className="icon" aria-hidden="true">
          {isOpen ? "▲" : "▼"}
        </span>
      </button>
      <div
        id={contentId}
        role="region"
        aria-labelledby={btnId}
        className={`answer ${isOpen ? "open" : ""}`}
      >
        <p>{faq.answer}</p>
      </div>
    </article>
  );
}
