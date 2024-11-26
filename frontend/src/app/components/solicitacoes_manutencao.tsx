"use client";

import React, { useState } from 'react';

interface Solicitacao {
  descricao: string;
  data_solicitacao: string;
  prioridade: string;
  responsavel: string;
  status: string;
  comentarios?: string;
  arquivos?: File[];
  equipe?: string;
  pecas_materiais?: { item: string; quantidade: number; fornecedor: string }[];
}

export default function FormsSolicitacoes() {
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);
  const [status, setStatus] = useState("pendente");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const novaSolicitacao: Solicitacao = {
      descricao: formData.get('descricao') as string,
      data_solicitacao: formData.get('data_solicitacao') as string,
      prioridade: formData.get('prioridade') as string,
      responsavel: formData.get('responsavel') as string,
      status: status,
      comentarios: formData.get('comentarios') as string,
      arquivos: formData.getAll('arquivos') as File[],
      equipe: formData.get('equipe') as string,
      pecas_materiais: [],
    };

    setSolicitacoes([...solicitacoes, novaSolicitacao]);
    e.currentTarget.reset(); // Limpa o formulário após o envio
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const updatedSolicitacoes = [...solicitacoes];
    updatedSolicitacoes[index].status = e.target.value;
    setSolicitacoes(updatedSolicitacoes);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Cadastro de Solicitações de Manutenção</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">Descrição do problema:</label>
          <textarea id="descricao" name="descricao" placeholder="Descreva o problema" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
        </div>
        <div className="mb-4">
          <label htmlFor="data_solicitacao" className="block text-sm font-medium text-gray-700">Data da solicitação:</label>
          <input type="date" id="data_solicitacao" name="data_solicitacao" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
        </div>
        <div className="mb-4">
          <label htmlFor="prioridade" className="block text-sm font-medium text-gray-700">Prioridade:</label>
          <select id="prioridade" name="prioridade" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
            <option value="baixa">Baixa</option>
            <option value="media">Média</option>
            <option value="alta">Alta</option>
            <option value="critica">Crítica</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="responsavel" className="block text-sm font-medium text-gray-700">Responsável:</label>
          <input type="text" id="responsavel" name="responsavel" placeholder="Nome do responsável" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status:</label>
          <select id="status" name="status" value={status} onChange={(e) => setStatus(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
            <option value="pendente">Pendente</option>
            <option value="em andamento">Em andamento</option>
            <option value="concluída">Concluída</option>
            <option value="cancelada">Cancelada</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="comentarios" className="block text-sm font-medium text-gray-700">Comentários:</label>
          <textarea id="comentarios" name="comentarios" placeholder="Adicione comentários" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
        </div>
        <div className="mb-4">
          <label htmlFor="arquivos" className="block text-sm font-medium text-gray-700">Arquivos relacionados:</label>
          <input type="file" id="arquivos" name="arquivos" multiple className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
        </div>
        <div className="mb-4">
          <label htmlFor="equipe" className="block text-sm font-medium text-gray-700">Equipe de Manutenção:</label>
          <input type="text" id="equipe" name="equipe" placeholder="Equipe atribuída" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-pink-800 text-white font-semibold rounded-md shadow-sm hover:bg-pink-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Cadastrar Solicitação</button>
      </form>

      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Solicitações de Manutenção</h2>
        {solicitacoes.map((solicitacao, index) => (
          <div key={index} className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Problema: {solicitacao.descricao}</h3>
            <p>Data da Solicitação: {solicitacao.data_solicitacao}</p>
            <p>Prioridade: {solicitacao.prioridade}</p>
            <p>Responsável: {solicitacao.responsavel}</p>
            <p>Status: 
              <select 
                value={solicitacao.status} 
                onChange={(e) => handleStatusChange(e, index)} 
                className="ml-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="pendente">Pendente</option>
                <option value="em andamento">Em andamento</option>
                <option value="concluída">Concluída</option>
                <option value="cancelada">Cancelada</option>
              </select>
            </p>
            <details className="mt-2">
              <summary className="cursor-pointer text-blue-500">Comentários</summary>
              <p>{solicitacao.comentarios}</p>
            </details>
            {solicitacao.arquivos && solicitacao.arquivos.length > 0 && (
              <details className="mt-2">
                <summary className="cursor-pointer text-blue-500">Arquivos Relacionados</summary>
                <ul>
                  {solicitacao.arquivos.map((arquivo, idx) => (
                    <li key={idx}>{arquivo.name}</li>
                  ))}
                </ul>
              </details>
            )}
            {solicitacao.equipe && (
              <p>Equipe: {solicitacao.equipe}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
