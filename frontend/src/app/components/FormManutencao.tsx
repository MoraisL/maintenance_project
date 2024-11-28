import React from 'react';

/**
 * Componente FormsSolicitacaoManutencao
 *
 * Este componente é um formulário utilizado para o cadastro de solicitações de manutenção.
 * Ele inclui campos para descrição do problema, data da solicitação, prioridade e responsável.
 *
 * Estrutura:
 * - Campo para descrição do problema (textarea).
 * - Campo para selecionar a data da solicitação (input de tipo date).
 * - Campo para definir a prioridade (select com opções "baixa", "média" e "alta").
 * - Campo para identificar o responsável (input de texto).
 *
 * Estilização:
 * - Centralizado em uma área limitada (máximo 640px de largura).
 * - Fundo branco, com bordas arredondadas e sombra.
 * - Campos estilizados com bordas e sombras.
 *
 * Funcionalidade:
 * - Formulário estruturado para capturar dados necessários de uma solicitação de manutenção.
 * - Todos os campos são obrigatórios para envio.
 */
export default function FormsSolicitacaoManutencao() {
  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Título do formulário */}
      <h1 className="text-2xl font-bold mb-6">Cadastro de Solicitações de Manutenção</h1>
      <form>
        {/* Campo: Descrição do Problema */}
        <div className="mb-4">
          <label htmlFor="descricao_problema" className="block text-sm font-medium text-gray-700">
            Descrição do problema:
          </label>
          <textarea
            id="descricao_problema"
            name="descricao_problema"
            placeholder="Descreva o problema"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Campo: Data da Solicitação */}
        <div className="mb-4">
          <label htmlFor="data_solicitacao" className="block text-sm font-medium text-gray-700">
            Data da solicitação:
          </label>
          <input
            type="date"
            id="data_solicitacao"
            name="data_solicitacao"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Campo: Prioridade */}
        <div className="mb-4">
          <label htmlFor="prioridade" className="block text-sm font-medium text-gray-700">
            Prioridade:
          </label>
          <select
            id="prioridade"
            name="prioridade"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">Selecione a prioridade</option>
            <option value="baixa">Baixa</option>
            <option value="media">Média</option>
            <option value="alta">Alta</option>
          </select>
        </div>

        {/* Campo: Responsável */}
        <div className="mb-4">
          <label htmlFor="responsavel" className="block text-sm font-medium text-gray-700">
            Responsável:
          </label>
          <input
            type="text"
            id="responsavel"
            name="responsavel"
            placeholder="Nome do responsável"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </form>
    </div>
  );
}
