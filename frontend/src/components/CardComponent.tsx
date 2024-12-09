import React from "react";
import { FaBuilding, FaTools, FaUsers } from "react-icons/fa";

/**
 * Interface CardInterface
 *
 * Define as propriedades esperadas pelo componente `Card`:
 * - `color` (opcional): Classe CSS para definir a cor de fundo do card.
 * - `quantity` (opcional): String representando a quantidade que será exibida no card.
 * - `text` (opcional): String com o texto explicativo associado à quantidade.
 * - `icon` (opcional): Um ícone ou qualquer outro elemento React para ser exibido no card.
 */
interface CardInterface {
    color?: string;       // Cor de fundo do card
    quantity?: string;    // Quantidade a ser exibida
    text?: string;        // Texto descritivo
    icon?: React.ReactNode; // Ícone (ou elemento React) a ser exibido
}

/**
 * Componente Card
 *
 * Este componente é utilizado para exibir informações de maneira destacada, como estatísticas ou resumos.
 * Ele aceita propriedades para personalizar cor, quantidade, texto e adicionar um ícone.
 *
 * Props:
 * - `color`: Classe CSS para definir a cor de fundo do card.
 * - `quantity`: Quantidade exibida em destaque no card.
 * - `text`: Texto adicional para contextualizar a quantidade.
 * - `icon`: Ícone ou qualquer outro elemento React para complementar o conteúdo visual do card.
 *
 * Estrutura:
 * - Um contêiner flexível com padding e espaçamento.
 * - O conteúdo principal é dividido em quantidade e texto.
 * - Um ícone é exibido ao lado.
 */
export function Card({ color, quantity, text, icon }: CardInterface) {
    return (
        <>
            {/* Contêiner principal do card */}
            <div className={`${color} p-6 flex gap-2 rounded-xl`}>
                {/* Seção de texto: quantidade e descrição */}
                <div className="flex-1 flex flex-col">
                    <strong className="text-3xl font-bold text-white">{quantity}</strong>
                    <span className="text-sm text-white">{text}</span>
                </div>
                {/* Ícone ou elemento adicional */}
                {icon}
            </div>
        </>
    );
}
