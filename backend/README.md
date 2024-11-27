# API de Manutenção Django REST Framework

Esta API, desenvolvida com Django REST Framework, fornece um sistema para gerenciar máquinas, manutenções, equipes, peças e perfis de usuários.

## Funcionalidades

* **CRUD completo:** Crie, leia, atualize e exclua registros para máquinas, manutenções, equipes, peças, peças usadas e perfis.
* **Relacionamentos entre modelos:** A API manipula corretamente os relacionamentos entre os modelos, como a associação entre manutenções e máquinas, e entre equipes e líderes.
* **Serializadores aninhados:** Os relacionamentos são representados de forma clara nas respostas da API usando serializadores aninhados.
* **Autenticação:** Inclui permissões básicas (IsAuthenticatedOrReadOnly), permitindo acesso de leitura a todos, mas restringindo a criação, atualização e exclusão a usuários autenticados.
* **Formato de data amigável:** As datas de manutenção são formatadas para melhor legibilidade.
* **Documentação:** Utiliza a interface navegável do DRF para facilitar a exploração e o teste da API.


## Executando a API

Há duas maneiras principais de executar esta API: usando Docker ou com um ambiente virtual Python.

### Usando Docker (Recomendado)

Este método simplifica a configuração e garante consistência entre diferentes ambientes.

**Pré-requisitos:**

* Docker
* Docker Compose

**Passos:**

1. **Clone o repositório:**
   ```bash
   git clone <seu_repositorio>
   ```
2. **Navegue até o diretório do projeto:**
   ```bash
   cd <seu_projeto>
   ```
3. **Crie o arquivo `.env` na raiz do projeto:**
    ```
    POSTGRES_NAME=seu_nome_do_banco
    POSTGRES_USER=seu_usuario
    POSTGRES_PASSWORD=sua_senha
    POSTGRES_PORT=5432
    ```
4. **Inicie os contêineres:**
   ```bash
   docker-compose up -d --build
   ```
5. **Acesse a API:** A API estará disponível em `http://localhost:8000`.

Para parar os containers: `docker-compose down`

### Usando ambiente virtual Python

**Pré-requisitos:**

* Python 3
* `venv` (geralmente incluído no Python 3)
* PostgreSQL instalado e rodando na sua máquina

**Passos:**

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/MoraisL/maintenance_project.git
   ```
2. **Navegue até o diretório do projeto:**
   ```bash
   cd backend
   ```
3. **Crie um ambiente virtual:**
   ```bash
   python3 -m venv .venv
   ```
4. **Ative o ambiente virtual:**
   * Linux/macOS:
      ```bash
      source .venv/bin/activate
      ```
   * Windows:
     ```bash
     .venv\Scripts\activate
     ```
5. **Instale as dependências:**
   ```bash
   pip install -r requirements.txt
   ```
6. **Crie o banco de dados:**
    * Certifique-se que seu PostgreSQL esteja rodando.
    * Configure as variáveis de ambiente `POSTGRES_*`  com os dados de conexão do seu banco de dados PostgreSQL local.
    * Execute as migrações:
        ```bash
        python manage.py migrate
        ```
7. **Crie um superusuário (opcional):**
    ```bash
    python manage.py createsuperuser
    ```
8. **Inicie o servidor de desenvolvimento:**
    ```bash
    python manage.py runserver
    ```
9. **Acesse a API:** A API estará disponível em `http://127.0.0.1:8000`.


## Endpoints da API

A API utiliza o roteador padrão do DRF, fornecendo endpoints para cada modelo:

* `machines/`:  Máquinas
* `maintenances/`: Manutenções
* `teams/`: Equipes
* `parts/`: Peças
* `usedparts/`: Peças Usadas
* `profiles/`: Perfis

Cada endpoint suporta as operações CRUD padrão (GET para listar/recuperar, POST para criar, PUT para atualizar, PATCH para atualização parcial, DELETE para excluir).

## Exemplos com Postman

**Autenticação:** Para endpoints que exigem autenticação, adicione um cabeçalho `Authorization` do tipo `Bearer Token` com seu token válido.


**Machines:**

* **GET /api/machines/** (Listar todas as máquinas):
    * Sem corpo.
* **POST /api/machines/** (Criar uma máquina):
    ```json
    {
        "name": "Nova Máquina",
        "type": "Torno",
        "local": "Oficina A",
        "fab_date": "2024-04-20",
        "serial_number": "SN123456"
    }
    ```
* **GET /api/machines/1/** (Obter detalhes da máquina com ID 1):
    * Sem corpo.
* **PUT /api/machines/1/** (Atualizar a máquina com ID 1):
    ```json
    {
        "name": "Máquina Atualizada",
        "local": "Oficina B"
    }
    ```
* **PATCH /api/machines/1/** (Atualização parcial - alterar apenas o tipo):
    ```json
    {
        "type": "Torno CNC"
    }
    ```
* **DELETE /api/machines/1/** (Excluir a máquina com ID 1):
    * Sem corpo.


**Maintenances:**

* **POST /api/maintenances/** (Criar uma manutenção, associando a uma máquina - ID 2 - e ao usuário autenticado):
    ```json
    {
        "machine": 2,
        "date": "2024-04-22T14:30:00Z",
        "status": "Concluída",
        "description": "Revisão geral",
        "priority": "Alta"
    }
    ```
* **GET /api/maintenances/3/** (Obter detalhes da manutenção com ID 3, incluindo máquina e usuário):
    * Sem corpo. A resposta incluirá os detalhes da máquina e do usuário associados.



**Parts:**

* **POST /api/parts/** (Criar uma peça):
    ```json
    {
        "name": "Rolamento",
        "qtd": 100,
        "cost": 25.00
    }
    ```

**UsedParts:**

* **POST /api/usedparts/** (Criar um registro de peça usada, vinculando à peça com ID 1 e à manutenção com ID 3):
    ```json
    {
        "part": 1,
        "qtd": 5,
        "maintenance": 3
    }
    ```

**Teams:**

* **POST /api/teams/** (Criar uma equipe com um líder - assumindo que o usuário com ID 5 é o líder):
    ```json
    {
        "name": "Equipe de Manutenção Alfa",
        "leader": 5
    }
    ```


**Profiles:**

* **GET /api/profiles/2/** (Obter o perfil do usuário com ID 2, incluindo detalhes do usuário):
    * Sem corpo.