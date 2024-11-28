"use client";

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import FormEquipes from "./components/FormEquipes";
import FormsCadastro from "./components/FormPecas";
import FormsMaquinas from "./components/FormMaquina";
import FormsSolicitacaoManutencao from "./components/FormManutencao";

export default function App() {
  return (
    <Router>
      <div className="flex">
        <NavBar />
        <main className="p-6 flex-1">
          <Routes>
            <Route path="/maquinas" element={<FormsMaquinas />} />
            <Route path="/manutencoes" element={<FormsSolicitacaoManutencao />} />
            <Route path="/pecas" element={<FormsCadastro />} />
            <Route path="/equipes" element={<FormEquipes />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
