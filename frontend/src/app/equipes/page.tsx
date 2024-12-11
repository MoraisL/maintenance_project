"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Footer } from "../../components/PageFooter";
import { Aside } from "../../components/AsideBar";
import Title from "../../components/TitleComponent";

export default function TeamsPage() {
  const [teams, setTeams] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    leader: "",
    members: [] as string[], // IDs dos membros
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [editingTeam, setEditingTeam] = useState<any | null>(null); // Estado para a equipe sendo editada

  const router = useRouter();

  // Função para carregar equipes e usuários
  const fetchData = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      console.log("Token não encontrado. Redirecionando para login...");
      router.push("/login");
      return;
    }

    try {
      // Carregar equipes
      const teamsResponse = await fetch("http://127.0.0.1:8000/teams/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const teamsData = await teamsResponse.json();
      if (Array.isArray(teamsData)) {
        setTeams(teamsData);
      } else {
        throw new Error("Resposta inválida para equipes");
      }

      // Carregar usuários
      const usersResponse = await fetch("http://127.0.0.1:8000/users/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const usersData = await usersResponse.json();
      if (Array.isArray(usersData)) {
        setUsers(usersData);
      } else {
        throw new Error("Resposta inválida para usuários");
      }
    } catch (error: any) {
      console.error("Erro ao carregar dados:", error);
      setError("Houve um erro ao carregar as informações.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [router]);

  // Função para adicionar nova equipe ou editar uma existente
  const handleSubmit = async (e: React.FormEvent) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push("/login");
      return;
    }

    e.preventDefault();
    setIsSubmitting(true);

    const url = editingTeam
      ? `http://127.0.0.1:8000/teams/${editingTeam.id}/` // URL para edição
      : "http://127.0.0.1:8000/teams/"; // URL para criação

    const method = editingTeam ? "PUT" : "POST"; // Método PUT para edição, POST para criação

    try {
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedTeam = await response.json();
        console.log(`${editingTeam ? "Equipe editada" : "Nova equipe"}:`, updatedTeam);
        setShowModal(false);
        setFormData({ name: "", leader: "", members: [] });
        setEditingTeam(null); // Limpa o estado de edição
        fetchData(); // Recarrega os dados de equipes
      } else {
        console.error("Erro ao salvar equipe.");
      }
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Função para abrir o modal de edição
  const handleEditTeam = (team: any) => {
    setEditingTeam(team); // Define os dados da equipe a ser editada
    setFormData({
      name: team.name,
      leader: team.leader,
      members: team.members,
    });
    setShowModal(true);
  };

  // Função para obter o nome do usuário usando seu ID
  const getUserNameById = (id: string) => {
    const user = users.find((user) => user.id === id);
    return user ? user.username : "Desconhecido";
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1 overflow-hidden">
        <Aside />
        <main className="flex-1 flex flex-col overflow-hidden">
          <Title text="Gerenciamento de Equipes" />
          <div className="flex-1 overflow-y-auto p-6">
            {/* Botão para adicionar nova equipe */}
            <button
              onClick={() => setShowModal(true)} // Ao clicar, mostra o modal
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Adicionar Equipe
            </button>

            {/* Modal de adicionar ou editar equipe */}
            {showModal && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center text-black"
                onClick={() => setShowModal(false)} // Fecha o modal ao clicar fora
              >
                <div
                  className="bg-gray-50 rounded-lg shadow-lg p-6 w-1/3 text-black"
                  onClick={(e) => e.stopPropagation()} // Impede que clicar dentro do modal feche-o
                >
                  <h2 className="text-xl font-bold mb-4">
                    {editingTeam ? "Editar Equipe" : "Adicionar Equipe"}
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">Nome da Equipe</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full border px-3 py-2 rounded text-black"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">Líder</label>
                      <select
                        value={formData.leader}
                        onChange={(e) => setFormData({ ...formData, leader: e.target.value })}
                        className="w-full border px-3 py-2 rounded text-black"
                        required
                      >
                        <option value="">Selecione um líder</option>
                        {users.map((user: any) => (
                          <option key={user.id} value={user.id}>
                            {user.username}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">Membros</label>
                      <select
                        multiple
                        value={formData.members}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            members: Array.from(e.target.selectedOptions, (option) => option.value),
                          });
                        }}
                        className="w-full border px-3 py-2 rounded text-black"
                      >
                        {users.map((user: any) => (
                          <option key={user.id} value={user.id}>
                            {user.username}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="submit"
                      className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Salvando..." : editingTeam ? "Salvar alterações" : "Adicionar"}
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Exibir lista de equipes ou mensagem informando que não há equipes */}
            <div className="mt-6">
              {loading ? (
                <div className="flex justify-center items-center">
                  <div className="spinner-border" role="status">
                    <span className="sr-only">Carregando...</span>
                  </div>
                </div>
              ) : error ? (
                <div className="bg-red-600 text-white p-4 rounded">
                  <p>{error}</p>
                </div>
              ) : teams.length === 0 ? (
                <p>Não há equipes cadastradas. Adicione uma nova equipe.</p>
              ) : (
                <>
                  <h3 className="text-xl font-semibold">Equipes Existentes</h3>
                  <ul>
                    {teams.map((team: any) => (
                      <li
                        key={team.id}
                        className="border-b py-2"
                        onClick={() => handleEditTeam(team)} // Clica para editar
                      >
                        <p className="font-medium">{team.name}</p>
                        <p>Líder: {getUserNameById(team.leader)}</p>
                        <p>
                          Membros: {team.members.map((member: any) => getUserNameById(member)).join(", ")}
                        </p>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
