# Aplicação de API "To Do" utilizando Django Rest Framework

## Escopo do Projeto

### 1. Introdução

#### Visão geral do projeto
O projeto consiste no desenvolvimento de uma aplicação de API "To Do" utilizando o Django Rest Framework. A aplicação visa facilitar o controle de atividades, permitindo que os usuários gerenciem suas tarefas de maneira prática e eficiente.

#### Objetivos e propósito do sistema
O objetivo do sistema é proporcionar uma ferramenta simples e intuitiva para o gerenciamento de tarefas, ajudando os usuários a organizarem suas atividades diárias de forma eficaz.

#### Benefícios esperados do projeto
- Aumento da praticidade no gerenciamento de atividades.
- Melhora na organização pessoal dos usuários.
- Facilidade de uso e acessibilidade.
- Ferramenta gratuita e de fácil instalação.

### 2. Visão Geral do Sistema

#### Descrição do sistema
A aplicação "To Do" permitirá que os usuários criem, visualizem, atualizem e excluam tarefas. Cada tarefa pode ter um título, descrição, data de vencimento e status de conclusão.

#### Público-alvo do sistema
O público-alvo é amplo, englobando qualquer pessoa que precise de ajuda para organizar suas tarefas diárias, desde estudantes até profissionais.

#### Requisitos funcionais e não funcionais
**Requisitos funcionais:**
- CRUD (Create, Read, Update, Delete) de tarefas.
- Filtragem e ordenação de tarefas por diferentes critérios.
- Autenticação de usuários.

**Requisitos não funcionais:**
- Desempenho adequado para resposta rápida às requisições.
- Segurança robusta com autenticação e autorização.
- Escalabilidade para suportar um número crescente de usuários.
- Manutenibilidade para facilitar futuras atualizações.

### 3. Arquitetura do Sistema

#### Explicação da arquitetura MVC/MVT (Model-View-Template)
- **Model:** Representa os dados e a lógica de negócios.
- **View/Template:** Responsável pela apresentação dos dados ao usuário.
- **Controller (no caso, Django Views):** Lida com a lógica de controle e comunicação entre o Model e a View.

#### Papel de cada componente
- **Model:** Define a estrutura das tarefas e manipula as regras de negócio.
- **View/Template:** Renderiza a interface de usuário com base nos dados fornecidos.
- **Controller:** Processa as requisições HTTP, interage com os Models e seleciona a Template apropriada para a resposta.

#### Uso do padrão Repository para acesso a dados
O padrão Repository será utilizado para abstrair a lógica de acesso aos dados, tornando o código mais modular e testável.

### 4. Requisitos Funcionais

#### Lista detalhada de funcionalidades do sistema
- Registro e login de usuários.
- Criação de novas tarefas.
- Visualização de tarefas existentes.
- Edição de tarefas.
- Exclusão de tarefas.
- Marcação de tarefas como concluídas.

#### Casos de uso principais
- **Usuário cadastra nova tarefa:** O usuário cria uma tarefa informando título, descrição e data de vencimento.
- **Usuário visualiza tarefas:** O usuário vê uma lista de suas tarefas, podendo aplicar filtros.
- **Usuário edita tarefa:** O usuário altera os detalhes de uma tarefa existente.
- **Usuário exclui tarefa:** O usuário remove uma tarefa da lista.

#### Fluxos de trabalho do usuário
- Login -> Visualizar Tarefas -> Criar/Editar/Excluir Tarefas -> Logout

### 5. Requisitos Não Funcionais

#### Desempenho esperado do sistema
- Tempo de resposta menor que 500ms para operações CRUD.
- Suporte a múltiplas requisições simultâneas sem degradação de performance.

#### Segurança e autenticação
- Autenticação via JWT (JSON Web Tokens).
- Proteção contra CSRF e XSS.
- Criptografia de senhas.

#### Escalabilidade e manutenibilidade
- Arquitetura modular para facilitar a adição de novas funcionalidades.
- Uso de Docker para facilitar a escalabilidade horizontal.

### 6. Tecnologias Utilizadas

#### Linguagens de programação
- Python

#### Frameworks
- Django
- Django Rest Framework

#### Bancos de dados
- PostgreSQL

#### Ferramentas de desenvolvimento
- Git
- Docker
- Postman (para testes de API)

### 7. Modelo de Dados

#### Estrutura do banco de dados
- **User**: id, username, password, email
- **Task**: id, title, description, due_date, status, user_id (foreign key)

#### Relacionamentos entre entidades
- Um usuário pode ter várias tarefas (1:N).

#### Esquema de armazenamento
- Utilização de PostgreSQL para armazenamento relacional dos dados.

### 8. Interfaces do Usuário

#### Layout e design das interfaces
- Interface minimalista e responsiva.
- Tela de login, registro e lista de tarefas.

#### Funcionalidades específicas de cada tela
- **Tela de login:** Formulário para entrada de credenciais.
- **Tela de registro:** Formulário para criação de nova conta.
- **Tela de tarefas:** Listagem das tarefas do usuário com opções de CRUD.

#### Fluxos de interação do usuário
- Registro/Login -> Dashboard de Tarefas -> Ações CRUD -> Logout

### 9. Arquitetura de Implementação

#### Organização do código-fonte
- **api/**: Contém as views, serializers e urls da API.
- **models/**: Contém os modelos de dados.
- **migrations/**: Arquivos de migração do banco de dados.
- **templates/**: Templates HTML (se aplicável).
- **static/**: Arquivos estáticos (CSS, JS, imagens).

#### Divisão em módulos e componentes
- **Users:** Gerenciamento de usuários.
- **Tasks:** Gerenciamento de tarefas.

#### Dependências entre os componentes
- **Users** e **Tasks** são interdependentes através de relacionamentos no banco de dados.

### 10. Planejamento de Implantação

#### Ambientes de implantação
- **Desenvolvimento:** Ambiente local com Docker.
- **Teste:** Servidor de staging para testes internos.
- **Produção:** Servidor em cloud (AWS, Heroku, etc.).

#### Procedimentos de implantação
- Configuração do ambiente com Docker.
- Deployment contínuo via CI/CD pipeline.

#### Migração de dados, se necessário
- Utilização de ferramentas de migração do Django.

### 11. Gestão de Configuração e Controle de Versão

#### Políticas de controle de versão
- Uso de Git com branches para features, hotfixes e releases.

#### Ramificação do código-fonte
- **main:** Código estável e pronto para produção.
- **develop:** Últimas mudanças aprovadas.
- **feature/**: Novas funcionalidades em desenvolvimento.

#### Uso de ferramentas de controle de versão
- GitHub para repositório e controle de versão.

### 12. Gestão de Projetos

#### Cronograma de desenvolvimento
- **Semana 1-2:** Definição de requisitos e setup inicial.
- **Semana 3-4:** Desenvolvimento do backend (API).
- **Semana 5-6:** Integração e testes.
- **Semana 7-8:** Implantação e ajustes finais.

#### Atribuição de tarefas e responsabilidades
- **Desenvolvedor Backend:** Implementação da API.
- **Desenvolvedor Frontend:** Integração e interface do usuário.
- **QA:** Testes e garantia de qualidade.

#### Monitoramento do progresso do projeto
- Utilização de ferramentas como Trello ou Jira para acompanhamento.

### 13. Considerações de Segurança

#### Mecanismos de autenticação e autorização
- Autenticação JWT.
- Autorização baseada em permissões de usuário.

#### Proteção contra vulnerabilidades conhecidas
- Uso de bibliotecas atualizadas.
- Validação e sanitização de inputs.

#### Auditoria e registro de atividades sensíveis
- Log de atividades importantes para auditoria.

### 14. Considerações de Manutenção

#### Planos de suporte pós-implantação
- Monitoramento contínuo.
- Resolução rápida de bugs críticos.

#### Processo de correção de bugs e implementação de melhorias
- Pipeline de CI/CD para deploy contínuo.
- Feedback loop com usuários.

#### Atualizações de segurança e de software
- Revisões periódicas de segurança.
- Atualizações regulares de dependências e pacotes.


## Primeiros Passos

### Pré-requisitos

Certifique-se de ter instalado:

- Python 3.x
- Django 3.x ou superior
- Virtualenv (opcional, mas recomendado)

### Instalação

1. Clone o repositório:
   ```sh
   git clone https://github.com/seu-usuario/todo-app.git
   cd todo-app
   ```
2. Crie um ambiente virtual:
    ```sh
    python -m venv venv
    source venv/bin/activate  # Linux ou macOS
    venv\Scripts\activate     # Windows
    ```
3. Instale as dependências:
    ```sh
    pip install -r requirements.txt
    ```
4. Realize as migrações do banco de dados:
    ```sh
    python manage.py migrate
    ```
5. Crie um superusuario:
    ```sh
    python manage.py createsuperuser
    ```
6. Inicie o servidor de desenvolvimento:
    ```sh
    python manage.py runserver
    ```

    --------------------------

## Uso
- Acesse http://127.0.0.1:8000 em seu navegador.
- Faça login ou crie uma nova conta.
- Navegue pela aplicação para gerenciar suas tarefas e categorias.

## Funcionalidades das Views
### home_view
- Exibe todas as tarefas ativas e concluídas do usuário autenticado.

### todo_entry_view
- Permite ao usuário criar uma nova tarefa. As categorias são filtradas com base no usuário atual.

### complete_todo
- Marca as tarefas selecionadas como concluídas.

### activate_task
- Reativa as tarefas selecionadas.

### todo_view
- Exibe os detalhes de uma tarefa específica.

### edit_todo_view
- Permite ao usuário editar uma tarefa existente.

### delete_todo_view
- Exclui uma tarefa específica.

### create_category_view
- Permite ao usuário criar uma nova categoria.

### edit_category_view
- Permite ao usuário editar uma categoria existente.

### delete_category_view
- Exclui uma categoria específica.

### category_detail_view
- Exibe as tarefas ativas de uma categoria específica.

### login_view
- Permite ao usuário fazer login.

### logout_view
- Permite ao usuário fazer logout.

### signup_view
- Permite ao usuário se registrar.

### profile_view
- Exibe os detalhes do perfil do usuário.

### profile_edit_view
- Permite ao usuário editar seu perfil.

### delete_account_view
- Permite ao usuário excluir sua conta após uma validação de número aleatório.

## Criador

Rafael Henrique de Mattos Ribeiro

