import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Maintenance APP",
  description: "Design for General Maintenance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-r from-blue-500 to-zinc-400 text-white min-h-screen flex flex-col">
        <header className="bg-blue-700 p-4 shadow-md">
          <h1 className="text-center text-xl font-bold">Maintenance APP</h1>
        </header>
        <main className="flex-1 container mx-auto p-4">{children}</main>
        <footer className="bg-blue-800 text-center p-2">
          <p>&copy; 2024 Maintenance APP. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
