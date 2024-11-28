// Importa o componente de imagem otimizada do Next.js
import Image from "next/image";

// Importa ícones das bibliotecas react-icons
import { FaBuilding, FaTools, FaUsers } from "react-icons/fa";
import { MdDashboard, MdForklift } from "react-icons/md";

// Importa o componente de navegação
import { NavBar } from "./navbar";

/**
 * Componente Aside
 *
 * Este componente é responsável por renderizar a barra lateral (sidebar) 
 * de uma aplicação. Ele inclui:
 *  - Uma área para a logo da aplicação, que é clicável e redireciona o usuário
 *    para a página inicial.
 *  - Um componente de navegação (`NavBar`) que provavelmente exibe os links
 *    ou opções da barra lateral.
 *
 * Estilização:
 *  - Largura fixa de 64px.
 *  - Espaçamento interno de 1.5rem (24px).
 *  - Fundo cinza claro.
 *
 * Requisitos:
 *  - A imagem da logo precisa estar disponível no caminho "/image/logo.png".
 *  - O componente `NavBar` deve ser implementado corretamente para funcionar
 *    nesta estrutura.
 */
export function Aside() {
    return ( 
        // Define a barra lateral (sidebar) com largura fixa, padding e fundo cinza claro
        <aside className="w-64 p-6 bg-gray-100">
        
            {/* Link para a página inicial da aplicação */}
            <a href="http://localhost:3000/" rel="noopener noreferrer">
                {/* Imagem da logo */}
                <img 
                    src="/image/logo.png" // Caminho para a imagem da logo
                    alt="logo"            // Texto alternativo para acessibilidade
                    width={150}           // Define a largura da imagem
                    height={200}          // Define a altura da imagem
                />
            </a>

            {/* Renderiza o componente de navegação */}
            <NavBar/> 
        </aside>
    );
}
