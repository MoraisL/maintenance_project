/**
 * Interface TitleInterface
 * Define as propriedades esperadas pelo componente `Title`.
 *
 * Propriedades:
 * - `text` (opcional): Texto a ser exibido como título.
 */
interface TitleInterface {
    text?: string; // Texto do título (opcional)
  }
  
  /**
   * Componente Title
   *
   * Este componente renderiza um título estilizado dentro de uma tag `<h1>`.
   *
   * Funcionalidades:
   * - Exibe um texto fornecido como propriedade `text`.
   * - Se nenhuma propriedade for fornecida, o título será renderizado vazio.
   *
   * Estilização:
   * - `text-4xl`: Define o tamanho grande do texto.
   * - `font-bold`: Define o texto como negrito.
   * - `uppercase`: Converte o texto para letras maiúsculas.
   * - `w-full`: Largura total do contêiner.
   * - `bg-white/40`: Fundo branco com 40% de opacidade.
   * - `p-6`: Adiciona padding interno.
   * - `text-center`: Centraliza o texto.
   */
  export default function Title({ text }: TitleInterface) {
    return (
      <h1 className="text-4xl font-bold uppercase w-full bg-white/40 p-6 text-center">
        {text}
      </h1>
    );
  }