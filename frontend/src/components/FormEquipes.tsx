import React, { useState, useEffect } from "react";
import teamService from "../services/teamService";

interface Team {
  id?: number;
  name: string;
  leader_username?: string;
}

export default function FormEquipes() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamName, setTeamName] = useState<string>("");

  useEffect(() => {
    loadTeams();
  }, []);

  // Carrega as equipes do backend
  const loadTeams = async () => {
    try {
      const fetchedTeams = await teamService.getTeams();
      setTeams(fetchedTeams);
    } catch (error) {
      console.error("Erro ao carregar equipes:", error);
    }
  };

  // Cria uma nova equipe
  const saveTeam = async () => {
    if (!teamName) {
      alert("Preencha o nome da equipe!");
      return;
    }

    try {
      const newTeam = await teamService.createTeam({ name: teamName });
      setTeams([...teams, newTeam]);
      setTeamName(""); // Limpa o campo de entrada
    } catch (error) {
      console.error("Erro ao salvar equipe:", error);
    }
  };

  // Exclui uma equipe
  const deleteTeam = async (teamId: number) => {
    try {
      await teamService.deleteTeam(teamId);
      setTeams(teams.filter((team) => team.id !== teamId));
    } catch (error) {
      console.error("Erro ao excluir equipe:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Gerenciamento de Equipes</h1>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nome da equipe:</label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Digite o nome da equipe"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="button"
          onClick={saveTeam}
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Salvar Equipe
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Equipes Criadas</h2>
        {teams.map((team) => (
          <div key={team.id} className="border rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">{team.name}</h3>
              <span className="text-sm text-gray-500">Líder: {team.leader_username}</span>
              <button
                onClick={() => deleteTeam(team.id!)}
                className="text-red-500 hover:underline ml-4"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
