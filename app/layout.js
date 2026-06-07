import "./globals.css";

export const metadata = {
  title: "Procurime Buyer Panel",
  description: "Procurime Buyer Panel - Frontend Prototipi",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
