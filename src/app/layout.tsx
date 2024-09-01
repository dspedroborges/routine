import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BsGithub, BsListCheck } from "react-icons/bs";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Routine",
  description: "App para definição de afazeres diários e que registra seus percentuais de compleção ao longo do tempo, além da média e total de dias usados.",
  icons: {
    icon: "icon.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <nav className="py-4 flex flex-col items-center justify-center md:flex-row md:justify-between bg-gradient-to-r from-black to-blue-800">
          <h1 className="text-white font-bold text-2xl px-8 text-center flex items-center gap-2 justify-center"><BsListCheck /> The Routine</h1>
          <ul className="text-white flex gap-8 py-4 lg:py-0 px-8 text-md lg:text-xl font-bold">
            <Link href="/" className="hover:scale-105 hover:underline"><li>Afazeres</li></Link>
            <Link href="/criar" className="hover:scale-105 hover:underline"><li>Criar</li></Link>
            <Link href="/estatistica" className="hover:scale-105 hover:underline"><li>Estatística</li></Link>
          </ul>
        </nav>
        {children}
        <footer className="flex items-center justify-center bg-gradient-to-r from-black to-blue-800 py-12 mt-12">
          <Link href="https://github.com/dspedroborges" target="_blank" className="hover:underline text-white flex items-center gap-2"><BsGithub /> dspedroborges</Link>
        </footer>
      </body>
    </html>
  );
}
