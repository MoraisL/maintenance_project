
# 🚀 Fullstack Application - Maintenance System

Bem-vindo ao repositório da aplicação Fullstack que gerencia máquinas, manutenções, equipes e peças, integrando dashboards para visualização de dados. Esta aplicação utiliza **Django** no backend, **React Native** e **React** no frontend, proporcionando uma experiência fluida e moderna.

---

## ✨ Funcionalidades Principais

### 🖥️ Backend (Django)
- **Gerenciamento de Máquinas**: CRUD completo para gerenciar máquinas com informações detalhadas.
- **Controle de Manutenções**: Criação, edição e rastreamento de manutenções associadas às máquinas.
- **Gestão de Equipes**: Registro de equipes e líderes responsáveis pelas operações.
- **Controle de Peças**: Monitoramento do estoque de peças e registro de utilização.
- **Relacionamentos Avançados**: Modelos otimizados para rastrear interações entre máquinas, manutenções, equipes e peças.

### 📊 Frontend Web (React com TypeScript)
- **Dashboard Interativo**:
  - 📈 Visualização de gráficos dinâmicos (BarChart e LineChart).
  - 📋 Exibição de informações resumidas em cards.
- **Gestão de Máquinas**:
  - 📋 Listagem de máquinas.
  - 🖊️ Detalhamento e edição de máquinas.
  - 🗑️ Exclusão de registros de máquinas.
- **Gestão de Manutenções**:
  - 📋 Listagem de manutenções.
  - ➕ Criação de novas manutenções.
  - 🖊️ Edição e atualização de manutenções.
  - 🛠️ Visualização de manutenções pendentes.

### 📱 Frontend Mobile (React Native)
- Interface responsiva para gestão de manutenções e visualização rápida de status.
- Sincronização em tempo real com o backend.

---

## 📂 Estrutura de Dados (Models)

### Machine 🛠️
- `id`: Identificador único.
- `name`: Nome da máquina.
- `type`: Tipo de máquina.
- `local`: Localização.
- `fab_date`: Data de fabricação.
- `serial_number`: Número de série.

### Maintenance 🔧
- `id`: Identificador único.
- `machine_id`: Referência para a máquina.
- `date`: Data da manutenção.
- `status`: Status (pendente, concluída, etc.).
- `description`: Descrição do problema.
- `priority`: Prioridade.
- `user_id`: Usuário responsável.

### Team 👥
- `id`: Identificador único.
- `name`: Nome da equipe.
- `leader_id`: Líder da equipe.

### Part 🔩
- `id`: Identificador único.
- `name`: Nome da peça.
- `qtd`: Quantidade em estoque.
- `cost`: Custo unitário.

### Used_Part 📦
- `id`: Identificador único.
- `part_id`: Referência para a peça.
- `qtd`: Quantidade utilizada.
- `maintenance_id`: Referência para a manutenção.

---

## 🎨 Frontend Features

### Dashboard 📊
- **Cards**: Exibição de dados resumidos.
- **Gráficos**: Visualização interativa de informações.

### Machines 🛠️
- **Listagem**: Visualização e pesquisa.
- **Detalhes**: Acesso a informações específicas.
- **CRUD Completo**: Criar, editar e excluir máquinas.

### Maintenance 🔧
- **Listagem**: Visualização de todas as manutenções.
- **Detalhes**: Informações específicas de cada manutenção.
- **Pendentes**: Visualização de manutenções pendentes.
- **Criação**: Inserção de novas manutenções.

---

## 🛠️ Tecnologias Utilizadas

### Backend
- **Django**: Framework para desenvolvimento web robusto e escalável.
- **PostgreSQL**: Banco de dados relacional para persistência.

### Frontend Web
- **React**: Biblioteca JavaScript para interfaces.
- **TypeScript**: Superset de JavaScript para tipagem estática.
- **@tremor/react**: Componentes para dashboards.

### Frontend Mobile
- **React Native**: Desenvolvimento de aplicativos mobile multiplataforma.

---
