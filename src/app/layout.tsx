import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ALVO RH — Rede Social de Gestão de Pessoas",
  description: "Plataforma profissional da ALVO RH para vagas, notícias e networking.",
  icons: { icon: "/logo-alvo-rh.png" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#f0f2f5]">
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
