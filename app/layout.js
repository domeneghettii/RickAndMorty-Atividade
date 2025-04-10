import "./globals.css";

export const metadata = {
  title: "Rick and Morty",
  description: "Meu primeiro consumo de API gratuito",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
