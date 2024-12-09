import { LuTrash } from "react-icons/lu";
import { MdEditNote } from "react-icons/md";

/**
 * Componente Table
 *
 * Este componente é responsável por renderizar uma tabela de dados estática com informações
 * sobre ambientes, equipamentos, solicitações e datas de atendimento. Ele inclui ações para
 * edição e exclusão de cada linha.
 *
 * Funcionalidades:
 * - Exibição de dados em formato tabular.
 * - Ações associadas a cada linha (ícones de edição e exclusão).
 *
 * Estrutura:
 * - Cabeçalho da tabela com colunas: Ambiente, Equipamento, Solicitação, Atendido em, Ações.
 * - Corpo da tabela preenchido com dados simulados (mocked data).
 * - Ícones de ações (edição e exclusão) para cada linha.
 */
export function Table(){
return (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b border-gray-200">Ambiente</th>
          <th className="py-2 px-4 border-b border-gray-200">Equipamento</th>
          <th className="py-2 px-4 border-b border-gray-200">Solicitação</th>
          <th className="py-2 px-4 border-b border-gray-200">Atendido em</th>
          <th className="py-2 px-4 border-b border-gray-200">Ações</th>
        </tr>
      </thead>
      <tbody>
    
          <tr className="">
            <td className="py-2 px-4 border-b border-gray-200"> SENAI </td>
            <td className="py-2 px-4 border-b border-gray-200"> Computador Dell Intel core i7</td>
            <td className="py-2 px-4 border-b border-gray-200"> 1243 </td>
            <td className="py-2 px-4 border-b border-gray-200"> 804</td>
            <td className="py-2 px-4 border-b border-gray-200 flex space-x-1">
                <MdEditNote size={22} />
                <LuTrash size={18} />
              </td>
          </tr>
  
          <tr>
            <td className="py-2 px-4 border-b border-gray-200"> Escritório </td>
            <td className="py-2 px-4 border-b border-gray-200"> Samsung Galaxy Z Flip5 </td>
            <td className="py-2 px-4 border-b border-gray-200"> 983 </td>
            <td className="py-2 px-4 border-b border-gray-200"> 764</td>
            <td className="py-2 px-4 border-b border-gray-200 flex space-x-1">
                <MdEditNote size={22} />
                <LuTrash size={18} />
              </td>
          </tr>
  
          <tr>
            <td className="py-2 px-4 border-b border-gray-200"> TecSul </td>
            <td className="py-2 px-4 border-b border-gray-200"> Máquina aleatória</td>
            <td className="py-2 px-4 border-b border-gray-200"> 9023 </td>
            <td className="py-2 px-4 border-b border-gray-200"> 634</td>
            <td className="py-2 px-4 border-b border-gray-200 flex space-x-1">
                <MdEditNote size={22} />
                <LuTrash size={18} />
              </td>
          </tr>
  
          <tr>
            <td className="py-2 px-4 border-b border-gray-200"> SENAI </td>
            <td className="py-2 px-4 border-b border-gray-200"> Computador Dell Intel core i7</td>
            <td className="py-2 px-4 border-b border-gray-200"> 234 </td>
            <td className="py-2 px-4 border-b border-gray-200"> 642</td>
            <td className="py-2 px-4 border-b border-gray-200 flex space-x-1">
                <MdEditNote size={22} />
                <LuTrash size={18} />
              </td>
          </tr>
  
          <tr>
            <td className="py-2 px-4 border-b border-gray-200"> SENAI </td>
            <td className="py-2 px-4 border-b border-gray-200"> Computador Dell Intel core i7</td>
            <td className="py-2 px-4 border-b border-gray-200"> 983 </td>
            <td className="py-2 px-4 border-b border-gray-200"> 783</td>
            <td className="py-2 px-4 border-b border-gray-200 flex space-x-1">
                <MdEditNote size={22} />
                <LuTrash size={18} />
              </td>
          </tr>
  
          <tr>
            <td className="py-2 px-4 border-b border-gray-200"> SENAI </td>
            <td className="py-2 px-4 border-b border-gray-200"> Computador Dell Intel core i7</td>
            <td className="py-2 px-4 border-b border-gray-200"> 802 </td>
            <td className="py-2 px-4 border-b border-gray-200"> 853</td>
            <td className="py-2 px-4 border-b border-gray-200 flex space-x-1">
                <MdEditNote size={22} />
                <LuTrash size={18} />
              </td>
          </tr>
  
          <tr>
            <td className="py-2 px-4 border-b border-gray-200"> SENAI </td>
            <td className="py-2 px-4 border-b border-gray-200"> Computador Dell Intel core i7</td>
            <td className="py-2 px-4 border-b border-gray-200"> 365 </td>
            <td className="py-2 px-4 border-b border-gray-200"> 903</td>
            <td className="py-2 px-4 border-b border-gray-200 flex space-x-1">
                <MdEditNote size={22} />
                <LuTrash size={18} />
              </td>
          </tr>
  
          <tr>
            <td className="py-2 px-4 border-b border-gray-200"> SENAI </td>
            <td className="py-2 px-4 border-b border-gray-200"> Computador Dell Intel core i7</td>
            <td className="py-2 px-4 border-b border-gray-200"> 784 </td>
            <td className="py-2 px-4 border-b border-gray-200"> 146356</td>
            <td className="py-2 px-4 border-b border-gray-200 flex space-x-1">
                <MdEditNote size={22} />
                <LuTrash size={18} />
              </td>
          </tr>
  
          <tr>
            <td className="py-2 px-4 border-b border-gray-200"> SENAI </td>
            <td className="py-2 px-4 border-b border-gray-200"> Computador Dell Intel core i7</td>
            <td className="py-2 px-4 border-b border-gray-200"> 843 </td>
            <td className="py-2 px-4 border-b border-gray-200"> 753</td>
            <td className="py-2 px-4 border-b border-gray-200 flex space-x-1">
                <MdEditNote size={22} />
                <LuTrash size={18} />
              </td>
          </tr>
  
          <tr>
            <td className="py-2 px-4 border-b border-gray-200"> SENAI </td>
            <td className="py-2 px-4 border-b border-gray-200"> Computador Dell Intel core i7</td>
            <td className="py-2 px-4 border-b border-gray-200"> 531 </td>
            <td className="py-2 px-4 border-b border-gray-200"> 733</td>
            <td className="py-2 px-4 border-b border-gray-200 flex space-x-1">
                <MdEditNote size={22} />
                <LuTrash size={18} />
              </td>
          </tr>
  
      </tbody>
    </table>
  </div>
);
}
