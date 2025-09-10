"use client";
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import styles from './detalhes.css';

function InfoItem({ label, value }) {
  return (
    <p>
      <span className={styles.label}>{label} :</span> {value}
    </p>
  );
}

export default function Relatorio() {
  return (
    <>
      <Navbar />

      <main className={styles.mainContent}>
        <div className={styles.container}>
          <div className={styles.header}>Relatório</div>

          <div className={styles.content}>
            <InfoItem label="Item/patrimônio" value="teste teste" />
            <InfoItem label="Técnico responsável" value="teste teste" />
            <InfoItem label="Início" value="teste teste" />
            <InfoItem label="Término" value="teste teste" />
            <InfoItem label="Detalhes" value="teste teste" />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
