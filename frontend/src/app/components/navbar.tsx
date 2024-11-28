import { FaBuilding, FaTools, FaUsers } from "react-icons/fa";
import { MdDashboard, MdForklift } from "react-icons/md";

/**
 * Componente NavBar
 *
 * Este componente é responsável por renderizar a barra de navegação da aplicação.
 * Ele contém links para diferentes seções do sistema, cada um com um ícone e texto descritivo.
 *
 * Estrutura:
 * - Links organizados verticalmente (uma lista flexível).
 * - Ícones para facilitar a identificação visual de cada link.
 * - Interatividade com efeito hover para realçar o texto.
 *
 * Funcionalidades:
 * - Cada link direciona para uma página específica dentro da aplicação.
 * - Ícones e textos ajudam a identificar a funcionalidade de cada seção.
 */

export function NavBar() {
  // Definição dos links da barra de navegação
  const links = [
    {
      target: "./maquinas", // Caminho do link
      text: "Gerenciamento de máquinas", // Texto descritivo
      icon: <MdDashboard /> // Ícone representativo
    },
    {
      target: "./manutencoes",
      text: "Gerenciamento de manutenções",
      icon: <FaBuilding />
    },
    {
      target: "./pecas",
      text: "Controle de Estoque de Peças",
      icon: <MdForklift />
    },
    {
      target: "./equipes",
      text: "Gerenciamento de Equipes",
      icon: <FaTools />
    }
  ];

  return (
    // Contêiner principal da barra de navegação
    <nav className="space-y-4 flex flex-col mt-8">
      {links.map((obj, index) => (
        // Cada link da barra de navegação
        <a
          href={obj.target} // Caminho do link
          key={index} // Chave única para cada item
          className="flex items-center gap-4 hover:font-semibold"
        >
          {obj.icon} {/* Ícone do link */}
          {obj.text} {/* Texto do link */}
        </a>
      ))}
    </nav>
  );
}
