"use client";
import "./not-found.css";
import { useEffect, useState } from "react";
import NavClient from "@/components/Navbar/NavClient";
import Footer from "@/components/Footer/Footer";

export default function NotFound() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("usuario");
    if (user) {
      setUsuario(JSON.parse(user));
    }
  }, []);

  const handleBack = () => {
    window.history.back();
  };

  return (
    <>
      {usuario?.funcao === "usuario" && <NavClient />}

      <div className="not-found-content">
        {/* banner */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <picture>
            <source
              media="(max-width: 768px)"
              srcSet="/BannerMobile/mobile404.png"
            />
            <source media="(min-width: 769px)" srcSet="/bannerPc/404.png" />
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

        <div className="notfound-container">
          <h3>Desculpa, página não encontrada</h3>
          <div className="notfound-button">
            <button onClick={handleBack}>Voltar</button>
          </div>
        </div>
      </div>

      {usuario?.funcao === "usuario" && <Footer />}
    </>
  );
}
