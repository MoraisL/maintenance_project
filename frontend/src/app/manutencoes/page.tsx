"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 

import { Footer } from "../../components/PageFooter";
import FormsSolicitacoes from "../../components/FormManutencao";
import { Aside } from "../../components/AsideBar";
import Title from "../../components/TitleComponent";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SolicitacaoManutencao from "../../components/SolicitacoesManutencao"; 

export default function Home() {

const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      // Verifica se os tokens estão no localStorage
      const accessToken = localStorage.getItem("access_token");
  
      if (!accessToken) {
        // Se não autenticado, redirecione para login
        router.push("/login");
      } else {
        // Se autenticado, atualize o estado
        setIsAuthenticated(true);
      }
    };
  
    checkAuth();
  }, [router]);

  // Evita renderizar a página enquanto a autenticação está sendo verificada
  if (!isAuthenticated) {
    return null; // Pode ser um spinner ou algo indicando que está carregando
  }

    return (

        <div className="flex flex-col min-h-screen">
            <div className="flex flex-1 overflow-hidden">
                <Aside />
                <main className="flex-1 flex flex-col overflow-hidden">
                    <Title text="Gerenciamento de Manutenção" />
                    <div className="flex-1 overflow-y-auto p-6">

                        <div className="container mx-auto">
                
                            <SolicitacaoManutencao/>
                            <div className="mx-auto max-w-md"></div>
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}
