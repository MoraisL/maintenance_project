"use client";

import React, { useState } from 'react';
import { Card } from './Card';

/**
 * Interfaces de Dados
 */
interface Registro {
  tipo: 'entrada' | 'saida'; // Tipo do registro: Entrada ou Saída
  data: string;              // Data do registro
  quantidade: number;        // Quantidade movimentada no registro
}

interface Peca {
  nome: string;               // Nome da peça
  codigo: string;             // Código identificador da peça
  fornecedor: string;         // Nome do fornecedor da peça
  quantidade_estoque: number; // Quantidade em estoque
  valor_unitario: number;     // Valor unitário da peça
}

/**
 * Componente FormsCadastro
 *
 * Este componente é responsável pelo cadastro e gerenciamento de peças em estoque e seus registros
 * de entrada e saída. Ele fornece:
 * - Formulário para cadastrar peças.
 * - Formulário para registrar entradas ou saídas no estoque.
 * - Exibição das peças cadastradas com suas respectivas quantidades em estoque.
 *
 * Funcionalidades:
 * - Cadastro de peças, incluindo informações como nome, código, fornecedor, estoque e valor unitário.
 * - Registro de movimentações (entrada e saída) no estoque.
 * - Atualização dinâmica das quantidades de peças no estoque.
 * - Visualização das peças cadastradas com detalhes.
 */
export default function FormsCadastro() {
  // Estados para armazenar peças, registros e quantidades no estoque
  const [pecas, setPecas] = useState<Peca[]>([]);
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [quantidadeEstoque, setQuantidadeEstoque] = useState<Record<string, number>>({});

  /**
   * Lida com o envio do formulário de cadastro de peças.
   * - Adiciona a nova peça ao estado.
   * - Atualiza o estoque com a quantidade inicial da peça.
   */
  const handlePecaSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const novaPeca: Peca = {
      nome: formData.get('nome') as string,
      codigo: formData.get('codigo') as string,
      fornecedor: formData.get('fornecedor') as string,
      quantidade_estoque: Number(formData.get('estoque')),
      valor_unitario: Number(formData.get('valor'))
    };

    setPecas([...pecas, novaPeca]);
    setQuantidadeEstoque(prev => ({
      ...prev,
      [novaPeca.codigo]: novaPeca.quantidade_estoque
    }));

    e.currentTarget.reset(); // Limpa o formulário
  };

  /**
   * Lida com o envio do formulário de registro de movimentações.
   * - Atualiza o estoque da peça correspondente com base no tipo (entrada ou saída).
   * - Registra a movimentação no estado.
   */
  const handleRegistroSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const novoRegistro: Registro = {
      tipo: formData.get('tipo') as 'entrada' | 'saida',
      data: formData.get('data') as string,
      quantidade: Number(formData.get('quantidade'))
    };

    const pecaCodigo = formData.get('codigo') as string;
    const peca = pecas.find(p => p.codigo === pecaCodigo);

    if (peca) {
      const newQuantity = novoRegistro.tipo === 'entrada'
        ? peca.quantidade_estoque + novoRegistro.quantidade
        : peca.quantidade_estoque - novoRegistro.quantidade;

      const updatedPecas = pecas.map(p => 
        p.codigo === pecaCodigo 
          ? { ...p, quantidade_estoque: newQuantity } 
          : p
      );
      
      setPecas(updatedPecas);
      setQuantidadeEstoque(prev => ({
        ...prev,
        [pecaCodigo]: newQuantity
      }));
      setRegistros([...registros, novoRegistro]);
    }

    e.currentTarget.reset(); // Limpa o formulário
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Formulário para cadastro de peças */}
      <h2 className="text-xl font-bold mb-4">Cadastro de Peças</h2>
      <form onSubmit={handlePecaSubmit}>
        {/* Campos do formulário */}
        <div className="mb-4">
          <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome:</label>
          <input id="nome" name="nome" placeholder="Nome da peça" required className="mt-1 block w-full px-3 py-2 border rounded-md"/>
        </div>
        <div className="mb-4">
          <label htmlFor="codigo" className="block text-sm font-medium text-gray-700">Código:</label>
          <input id="codigo" name="codigo" placeholder="Código da peça" required className="mt-1 block w-full px-3 py-2 border rounded-md"/>
        </div>
        <div className="mb-4">
          <label htmlFor="fornecedor" className="block text-sm font-medium text-gray-700">Fornecedor:</label>
          <input id="fornecedor" name="fornecedor" placeholder="Nome do fornecedor" required className="mt-1 block w-full px-3 py-2 border rounded-md"/>
        </div>
        <div className="mb-4">
          <label htmlFor="estoque" className="block text-sm font-medium text-gray-700">Quantidade em estoque:</label>
          <input id="estoque" name="estoque" type="number" placeholder="Quantidade de peças em estoque" required className="mt-1 block w-full px-3 py-2 border rounded-md"/>
        </div>
        <div className="mb-4">
          <label htmlFor="valor" className="block text-sm font-medium text-gray-700">Valor unitário:</label>
          <input id="valor" name="valor" type="number" step="0.01" placeholder="Valor unitário" required className="mt-1 block w-full px-3 py-2 border rounded-md"/>
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-pink-800 text-white font-semibold rounded-md">Cadastrar Peça</button>
      </form>

      {/* Formulário para registrar entrada/saída */}
      <h2 className="text-xl font-bold mt-10 mb-4">Registrar Entrada ou Saída</h2>
      <form onSubmit={handleRegistroSubmit}>
        <div className="mb-4">
          <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">Tipo de Registro:</label>
          <select id="tipo" name="tipo" required className="mt-1 block w-full px-3 py-2 border rounded-md">
            <option value="entrada">Entrada</option>
            <option value="saida">Saída</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="codigo" className="block text-sm font-medium text-gray-700">Código da Peça:</label>
          <input id="codigo" name="codigo" placeholder="Código da peça" required className="mt-1 block w-full px-3 py-2 border rounded-md"/>
        </div>
        <div className="mb-4">
          <label htmlFor="data" className="block text-sm font-medium text-gray-700">Data:</label>
          <input id="data" name="data" type="date" required className="mt-1 block w-full px-3 py-2 border rounded-md"/>
        </div>
        <div className="mb-4">
          <label htmlFor="quantidade" className="block text-sm font-medium text-gray-700">Quantidade:</label>
          <input id="quantidade" name="quantidade" type="number" placeholder="Quantidade" required className="mt-1 block w-full px-3 py-2 border rounded-md"/>
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-pink-800 text-white font-semibold rounded-md">Registrar</button>
      </form>

      {/* Exibição do estoque */}
      <h2 className="text-xl font-bold mt-10 mb-4">Estoque de Peças</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {pecas.map((peca, index) => (
          <Card
            key={index}
            color="bg-pink-800 p-6 flex gap-2 rounded-xl"
            quantity={quantidadeEstoque[peca.codigo]?.toString() || '0'}
            text={peca.nome}
          />
        ))}
      </div>
    </div>
  );
}
