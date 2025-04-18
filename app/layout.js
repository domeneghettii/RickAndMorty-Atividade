import "./globals.css";

export const metadata = {
  title: "Rick and Morty",
  description: "Explorando o universo de Rick and Morty com minha primeira API!",
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
