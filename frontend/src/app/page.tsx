"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaBuilding } from "react-icons/fa";
import { GrNotes } from "react-icons/gr";
import { MdForklift } from "react-icons/md";
import { Footer } from "../components/PageFooter";
import { Aside } from "../components/AsideBar";
import { Card } from "../components/CardComponent";
import { Table } from "../components/TableMachines";
import { BarChartHero } from "../components/BarCharts";
import Title from "../components/TitleComponent";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const accessToken = localStorage.getItem("access_token");

      if (!accessToken) {
        router.push("/login");
      } else {
        setIsAuthenticated(true);
      }
    };

    checkAuth();
  }, [router]);

  if (!isAuthenticated) {
    return <div className="flex items-center justify-center h-screen">Carregando...</div>;
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
                color="bg-blue-700 p-6 flex gap-2 rounded-xl"
                quantity="100"
                text="Ambientes"
                icon={<FaBuilding size={48} color="white" />}
              />
              <Card
                color="bg-blue-700 p-6 flex gap-2 rounded-xl"
                quantity="140"
                text="Equipamentos"
                icon={<MdForklift size={48} color="white" />}
              />
              <Card
                color="bg-blue-700 p-6 flex gap-2 rounded-xl"
                quantity="210"
                text="O.S. Abertas"
                icon={<GrNotes size={48} color="white" />}
              />
              <Card
                color="bg-blue-700 p-6 flex gap-2 rounded-xl"
                quantity="120"
                text="O.S. Concluídas"
                icon={<GrNotes size={48} color="white" />}
              />
            </div>
            <div className="container mx-auto">
              <h1 className="text-2xl font-bold mb-4">User Data</h1>
              <Table />
              <BarChartHero />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}