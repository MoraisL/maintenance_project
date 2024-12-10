"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 

import Image from "next/image";
import { FaBuilding, FaTools, FaUsers } from "react-icons/fa";
import { GrNotes } from "react-icons/gr";
import { IoMdCheckbox, IoMdCheckboxOutline } from "react-icons/io";
import { MdDashboard, MdForklift } from "react-icons/md";
import { Footer } from "../components/PageFooter";
import { Aside } from "../components/AsideBar";
import { Card } from "../components/CardComponent";
import { Table } from "../components/TableMachines";
import { BarChartHero } from "../components/BarCharts";
import Title from "../components/TitleComponent";
import FormsMaquinas from "../components/FormMaquina";


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
          <Title text="Sistema de gerenciamento" />
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-4 gap-4 mb-6">
              <Card
                color="bg-pink-800 p-6 flex gap-2 rounded-xl"
                quantity="100"
                text="Ambientes"
                icon={<FaBuilding size={48} color="white" />}
              />
              <Card
                color="bg-pink-800 p-6 flex gap-2 rounded-xl"
                quantity="140"
                text="Equipamentos"
                icon={<MdForklift size={48} color="white" />}
              />
              <Card
                color="bg-pink-800 p-6 flex gap-2 rounded-xl"
                quantity="210"
                text="O.S. Abertas"
                icon={<GrNotes size={48} color="white" />}
              />
              <Card
                color="bg-pink-800 p-6 flex gap-2 rounded-xl"
                quantity="120"
                text="O.S. Concluídas"
                icon={<GrNotes size={48} color="white" />}
              />
            </div>
            <div className="container mx-auto">
              <h1 className="text-2xl font-bold mb-4">User Data</h1>
              <Table />
              <BarChartHero />
              <div className="mx-auto max-w-md"></div>
            </div>
          </div>
        </main>
      </div>
      <Footer/>
    </div>
  );
}
