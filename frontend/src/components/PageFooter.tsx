/**
 * Componente Footer
 *
 * Este componente é responsável por renderizar o rodapé da aplicação.
 * Ele exibe uma mensagem com direitos reservados e a data atual (2024 neste caso).
 *
 * Estrutura:
 * - Um rodapé simples com texto centralizado.
 * - Estilização utilizando classes CSS para margem, padding, cor de fundo e texto.
 *
 * Estilização:
 * - `mt-4`: Margem superior.
 * - `p-6`: Padding interno.
 * - `bg-white`: Fundo branco.
 * - `text-center`: Texto centralizado.
 * - `text-pink-900`: Texto em tom rosa escuro.
 * - `text-sm`: Texto em tamanho pequeno.
 */

export function Footer() {
  return (
      // Contêiner do rodapé
      <footer className="mt-4 p-6 bg-white text-center text-pink-900 text-sm">
          {/* Texto do rodapé */}
          Todos os direitos reservados &copy; 2024
      </footer>
  );
}
