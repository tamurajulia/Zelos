import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";


export const metadata = {
  title: "Zelos Senai",
  description: "Criado por Julia Tamura, Isabela Alvez, Giovanna Aragão, Giulianno Lino, Eduarda Alves, Isabelli Lopes e Mariana Martins",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body >
        {children}

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossOrigin="anonymous"></script>
      </body>
    </html>
  );
}