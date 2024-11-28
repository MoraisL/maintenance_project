"use client" // Indica que este componente é renderizado no cliente (Client Component no Next.js)

// Importa o componente de gráfico de barras da biblioteca Tremor
import { BarChart } from "@tremor/react"

// Dados para o gráfico
const chartdata = [
  {
    date: "Jan 23",   // Data (mês e ano)
    RAM: 2890,        // Valor para a categoria "RAM"
    Notebook: 2338,   // Valor para a categoria "Notebook"
  },
  {
    date: "Feb 23",
    RAM: 2756,
    Notebook: 2103,
  },
  {
    date: "Mar 23",
    RAM: 3322,
    Notebook: 2194,
  },
  {
    date: "Abr 23",
    RAM: 3470,
    Notebook: 2108,
  },
  {
    date: "Mai 23",
    RAM: 3475,
    Notebook: 1812,
  },
  {
    date: "Jun 23",
    RAM: 3129,
    Notebook: 1726,
  },
]

/**
 * Componente BarChartHero
 *
 * Este componente renderiza um gráfico de barras utilizando a biblioteca Tremor.
 * Ele exibe os valores de duas categorias ("RAM" e "Notebook") ao longo de 
 * diferentes períodos de tempo (meses de 2023).
 *
 * Props:
 * - `data`: Os dados do gráfico, contendo objetos com as chaves:
 *   - `date` (string): Representa o período de tempo.
 *   - `RAM` (number): Valor associado à categoria "RAM".
 *   - `Notebook` (number): Valor associado à categoria "Notebook".
 * - `index`: Define a chave que será usada como rótulo (no caso, `date`).
 * - `categories`: Define as categorias cujos valores serão exibidos no gráfico.
 * - `colors`: Cores associadas às categorias (neste caso, variações de "pink").
 * - `valueFormatter`: Função que formata os valores exibidos, prefixando com `$` 
 *   e formatando como número no padrão dos EUA.
 * - `onValueChange`: Callback executado ao interagir com os valores do gráfico 
 *   (neste exemplo, apenas faz um `console.log` do valor clicado).
 *
 * Estilização:
 * - Altura do gráfico: 80 unidades (`h-80`).
 */
export const BarChartHero = () => (
  <BarChart
    className="h-80" // Classe CSS que define a altura do gráfico
    data={chartdata} // Dados para renderização
    index="date" // Campo usado como rótulo no eixo X
    categories={["RAM", "Notebook"]} // Categorias exibidas no gráfico
    colors={["pink-900", "pink-400"]} // Cores para as categorias
    valueFormatter={(number: number) =>
      `$${Intl.NumberFormat("us").format(number).toString()}` // Formata os valores com símbolo de dólar e separadores
    }
    onValueChange={(v) => console.log(v)} // Callback para eventos de interação com valores
  />
)
