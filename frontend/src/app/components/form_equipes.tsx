import React, { useState } from "react";

interface Member {
  name: string;
  role: string;
}

interface Team {
  name: string;
  members: Member[];
  availability: "disponivel" | "indisponivel";
}

export default function FormEquipes() {
  const [teams, setTeams] = useState<Team[]>([]); // Lista de equipes
  const [teamName, setTeamName] = useState<string>(""); // Nome da equipe atual
  const [members, setMembers] = useState<Member[]>([]); // Lista de membros da equipe atual
  const [memberName, setMemberName] = useState<string>(""); // Nome do membro atual
  const [memberRole, setMemberRole] = useState<string>(""); // Função do membro atual
  const [availability, setAvailability] = useState<"disponivel" | "indisponivel">("disponivel"); // Disponibilidade da equipe atual

  // Adicionar membro à lista
  const addMember = () => {
    if (memberName.trim() && memberRole.trim()) {
      setMembers((prevMembers) => [
        ...prevMembers,
        { name: memberName.trim(), role: memberRole.trim() },
      ]);
      setMemberName(""); // Limpa o campo de nome do membro
      setMemberRole(""); // Limpa o campo de função do membro
    } else {
      alert("Preencha o nome e a função do colaborador antes de adicionar!");
    }
  };

  // Salvar equipe na lista de equipes
  const saveTeam = () => {
    if (teamName.trim() && members.length > 0) {
      setTeams((prevTeams) => [
        ...prevTeams,
        {
          name: teamName.trim(),
          members: [...members],
          availability,
        },
      ]);
      setTeamName(""); // Limpa o nome da equipe
      setMembers([]); // Limpa os membros
      setAvailability("disponivel"); // Reseta a disponibilidade
    } else {
      alert("Preencha o nome da equipe e adicione pelo menos um membro!");
    }
  };

  // Excluir equipe
  const deleteTeam = (index: number) => {
    setTeams((prevTeams) => prevTeams.filter((_, i) => i !== index));
  };

  // Atualizar membro em uma equipe
  const updateMember = (
    teamIndex: number,
    memberIndex: number,
    key: "name" | "role",
    value: string
  ) => {
    const updatedTeams = [...teams];
    updatedTeams[teamIndex].members[memberIndex][key] = value;
    setTeams(updatedTeams);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Gerenciamento de Equipes</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        {/* Nome da Equipe */}
        <div className="mb-4">
          <label htmlFor="team_name" className="block text-sm font-medium text-gray-700">
            Nome da equipe:
          </label>
          <input
            type="text"
            id="team_name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Digite o nome da equipe"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Adicionar Colaborador */}
        <div className="mb-4">
          <label htmlFor="member_name" className="block text-sm font-medium text-gray-700">
            Nome do colaborador:
          </label>
          <input
            type="text"
            id="member_name"
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
            placeholder="Nome do colaborador"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="member_role" className="block text-sm font-medium text-gray-700">
            Função do colaborador:
          </label>
          <input
            type="text"
            id="member_role"
            value={memberRole}
            onChange={(e) => setMemberRole(e.target.value)}
            placeholder="Função do colaborador"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <button
          type="button"
          onClick={addMember}
          className="bg-green-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 mb-4"
        >
          Adicionar Colaborador
        </button>

        {/* Exibir Colaboradores Adicionados */}
        <ul className="mb-4">
          {members.map((member, index) => (
            <li key={index} className="flex justify-between items-center border p-2 rounded-md mb-2">
              <span>
                {member.name} - {member.role}
              </span>
            </li>
          ))}
        </ul>

        {/* Disponibilidade */}
        <div className="mb-4">
          <label htmlFor="availability" className="block text-sm font-medium text-gray-700">
            Disponibilidade:
          </label>
          <select
            id="availability"
            value={availability}
            onChange={(e) => setAvailability(e.target.value as "disponivel" | "indisponivel")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="disponivel">Disponível</option>
            <option value="indisponivel">Indisponível</option>
          </select>
        </div>

        {/* Botão Salvar Equipe */}
        <button
          type="button"
          onClick={saveTeam}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Salvar Equipe
        </button>
      </form>

      {/* Exibir Equipes Criadas */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Equipes Criadas</h2>
        {teams.map((team, teamIndex) => (
          <div key={teamIndex} className="border rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">{team.name}</h3>
              <span
                className={`px-3 py-1 rounded-full text-white text-sm ${
                  team.availability === "disponivel" ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {team.availability === "disponivel" ? "Disponível" : "Indisponível"}
              </span>
              <button
                onClick={() => deleteTeam(teamIndex)}
                className="text-red-500 hover:underline"
              >
                Excluir
              </button>
            </div>
            <ul className="mt-4">
              {team.members.map((member, memberIndex) => (
                <li key={memberIndex} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) => updateMember(teamIndex, memberIndex, "name", e.target.value)}
                    className="mr-2 flex-1 px-2 py-1 border rounded-md"
                  />
                  <input
                    type="text"
                    value={member.role}
                    onChange={(e) => updateMember(teamIndex, memberIndex, "role", e.target.value)}
                    className="flex-1 px-2 py-1 border rounded-md"
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
