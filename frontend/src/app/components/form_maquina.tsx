"use client";

import React, { useState } from 'react';

interface Maquina {
  nome: string;
  tipo: string;
  modelo: string;
  data_fabricacao: string;
  numero_serie: string;
  localizacao: string;
  manutencao: string;
}

export default function FormsMaquinas() {
  const [maquinas, setMaquinas] = useState<Maquina[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const novaMaquina: Maquina = {
      nome: formData.get('nome') as string,
      tipo: formData.get('tipo') as string,
      modelo: formData.get('modelo') as string,
      data_fabricacao: formData.get('data_fabricacao') as string,
      numero_serie: formData.get('numero_serie') as string,
      localizacao: formData.get('localizacao') as string,
      manutencao: formData.get('manutencao') as string,
    };

    setMaquinas([...maquinas, novaMaquina]);
    e.currentTarget.reset(); // Limpa o formulário após o envio
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Cadastro de Máquinas</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome:</label>
          <input type="text" id="nome" name="nome" placeholder="Nome da máquina" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
        </div>
        <div className="mb-4">
          <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">Tipo da máquina:</label>
          <input type="text" id="tipo" name="tipo" placeholder="Tipo da máquina" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
        </div>
        <div className="mb-4">
          <label htmlFor="modelo" className="block text-sm font-medium text-gray-700">Modelo:</label>
          <input type="text" id="modelo" name="modelo" placeholder="Modelo da máquina" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
        </div>
        <div className="mb-4">
          <label htmlFor="data_fabricacao" className="block text-sm font-medium text-gray-700">Data de fabricação:</label>
          <input type="date" id="data_fabricacao" name="data_fabricacao" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
        </div>
        <div className="mb-4">
          <label htmlFor="numero_serie" className="block text-sm font-medium text-gray-700">Número de série:</label>
          <input type="text" id="numero_serie" name="numero_serie" placeholder="Número de série" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
        </div>
        <div className="mb-4">
          <label htmlFor="localizacao" className="block text-sm font-medium text-gray-700">Localização:</label>
          <input type="text" id="localizacao" name="localizacao" placeholder="Localização" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
        </div>
        <div className="mb-4">
          <label htmlFor="manutencao" className="block text-sm font-medium text-gray-700">Histórico de manutenção:</label>
          <textarea id="manutencao" name="manutencao" placeholder="Histórico de manutenção" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-pink-800 text-white font-semibold rounded-md shadow-sm hover:bg-pink-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Cadastrar</button>
      </form>

      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Máquinas Cadastradas</h2>
        {maquinas.map((maquina, index) => (
          <div key={index} className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">{maquina.nome}</h3>
            <p>Tipo: {maquina.tipo}</p>
            <p>Modelo: {maquina.modelo}</p>
            <p>Data de Fabricação: {maquina.data_fabricacao}</p>
            <p>Número de Série: {maquina.numero_serie}</p>
            <p>Localização: {maquina.localizacao}</p>
            <details className="mt-2">
              <summary className="cursor-pointer text-blue-500">Histórico de Manutenção</summary>
              <p>{maquina.manutencao}</p>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
}
