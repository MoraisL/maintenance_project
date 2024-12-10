import api from "./api";

// Definindo a estrutura de uma equipe
interface Team {
  id?: number;
  name: string;
  leader?: number;
  leader_username?: string;
}

const teamService = {
  /**
   * Obtém todas as equipes cadastradas.
   */
  getTeams: async (): Promise<Team[]> => {
    try {
      const response = await api.get("/teams/");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar equipes:", error);
      throw error;
    }
  },

  /**
   * Cria uma nova equipe.
   * @param team Dados da nova equipe
   */
  createTeam: async (team: Team): Promise<Team> => {
    try {
      const response = await api.post("/teams/", team);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar equipe:", error);
      throw error;
    }
  },

  /**
   * Atualiza uma equipe existente.
   * @param id ID da equipe a ser atualizada
   * @param updatedTeam Dados atualizados
   */
  updateTeam: async (id: number, updatedTeam: Partial<Team>): Promise<Team> => {
    try {
      const response = await api.put(`/teams/${id}/`, updatedTeam);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar equipe:", error);
      throw error;
    }
  },

  /**
   * Exclui uma equipe pelo ID.
   * @param id ID da equipe a ser excluída
   */
  deleteTeam: async (id: number): Promise<void> => {
    try {
      await api.delete(`/teams/${id}/`);
    } catch (error) {
      console.error("Erro ao excluir equipe:", error);
      throw error;
    }
  },
};

export default teamService;
