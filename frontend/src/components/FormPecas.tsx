"use client";

import React, { useState, useEffect } from 'react';
import { Card } from './CardComponent';

interface Registro {
  tipo: 'entrada' | 'saida';
  data: string;
  quantidade: number;
  part: number;
}

interface Peca {
  id?: number;
  name: string;
  code: string;
  supplier: string;
  qtd: number;
  cost: number;
}

export default function FormsCadastro() {
  const [pecas, setPecas] = useState<Peca[]>([]);
  const [formData, setFormData] = useState<Peca>({
    name: '',
    code: '',
    supplier: '',
    qtd: 0,
    cost: 0,
  });
  const [recordData, setRecordData] = useState<Registro>({
    tipo: 'entrada',
    data: '',
    quantidade: 0,
    part: 0,
  });

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/parts/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setPecas(data));
  }, [token]);

  const handlePecaSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:8000/parts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const novaPeca = await response.json();
      setPecas([...pecas, novaPeca]);
      setFormData({
        name: '',
        code: '',
        supplier: '',
        qtd: 0,
        cost: 0,
      });
    } else {
      console.error("Erro ao cadastrar peça");
    }
  };

  const handleRegistroSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const response = await fetch(`http://127.0.0.1:8000/parts/${recordData.part}/adjust_quantity/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        tipo: recordData.tipo,
        quantidade: recordData.quantidade,
      }),
    });
  
    if (response.ok) {
      setRecordData({ tipo: 'entrada', data: '', quantidade: 0, part: 0 });
      const updatedPecas = await fetch("http://127.0.0.1:8000/parts/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json());
      setPecas(updatedPecas);
    } else {
      console.error("Erro ao registrar movimentação");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Cadastro de Peças</h2>
      <form onSubmit={handlePecaSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome:</label>
          <input id="name" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="mt-1 block w-full px-3 py-2 border rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="code" className="block text-sm font-medium text-gray-700">Código:</label>
          <input id="code" name="code" value={formData.code} onChange={(e) => setFormData({ ...formData, code: e.target.value })} required className="mt-1 block w-full px-3 py-2 border rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="supplier" className="block text-sm font-medium text-gray-700">Fornecedor:</label>
          <input id="supplier" name="supplier" value={formData.supplier} onChange={(e) => setFormData({ ...formData, supplier: e.target.value })} required className="mt-1 block w-full px-3 py-2 border rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="qtd" className="block text-sm font-medium text-gray-700">Quantidade em estoque:</label>
          <input id="qtd" name="qtd" type="number" value={formData.qtd} onChange={(e) => setFormData({ ...formData, qtd: Number(e.target.value) })} required className="mt-1 block w-full px-3 py-2 border rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="cost" className="block text-sm font-medium text-gray-700">Valor unitário:</label>
          <input id="cost" name="cost" type="number" step="0.01" value={formData.cost} onChange={(e) => setFormData({ ...formData, cost: Number(e.target.value) })} required className="mt-1 block w-full px-3 py-2 border rounded-md" />
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-pink-800 text-white font-semibold rounded-md">Cadastrar Peça</button>
      </form>

      <h2 className="text-xl font-bold mt-10 mb-4">Registrar Entrada ou Saída</h2>
      <form onSubmit={handleRegistroSubmit}>
        <div className="mb-4">
          <label htmlFor="part" className="block text-sm font-medium text-gray-700">Peça:</label>
          <select id="part" name="part" value={recordData.part} onChange={(e) => setRecordData({ ...recordData, part: Number(e.target.value) })} required className="mt-1 block w-full px-3 py-2 border rounded-md">
            <option value={0}>Selecione uma peça</option>
            {pecas.map((peca) => (
              <option key={peca.id} value={peca.id}>{peca.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">Tipo de Registro:</label>
          <select id="tipo" name="tipo" value={recordData.tipo} onChange={(e) => setRecordData({ ...recordData, tipo: e.target.value as 'entrada' | 'saida' })} required className="mt-1 block w-full px-3 py-2 border rounded-md">
            <option value="entrada">Entrada</option>
            <option value="saida">Saída</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="data" className="block text-sm font-medium text-gray-700">Data:</label>
          <input id="data" name="data" type="date" value={recordData.data} onChange={(e) => setRecordData({ ...recordData, data: e.target.value })} required className="mt-1 block w-full px-3 py-2 border rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="quantidade" className="block text-sm font-medium text-gray-700">Quantidade:</label>
          <input id="quantidade" name="quantidade" type="number" value={recordData.quantidade} onChange={(e) => setRecordData({ ...recordData, quantidade: Number(e.target.value) })} required className="mt-1 block w-full px-3 py-2 border rounded-md" />
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-pink-800 text-white font-semibold rounded-md">Registrar</button>
      </form>

      <h2 className="text-xl font-bold mt-10 mb-4">Estoque de Peças</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {pecas.map((peca, index) => (
          <Card key={index} color="bg-pink-800 p-6 flex gap-2 rounded-xl" quantity={peca.qtd.toString()} text={peca.name} />
        ))}
      </div>
    </div>
  );
}
