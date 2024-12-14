"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Aside } from "@/components/AsideBar";

export default function MaintenancePage() {
  const [maintenances, setMaintenances] = useState<any[]>([]); // Estado para armazenar as manutenções
  const [machines, setMachines] = useState<any[]>([]); // Estado para armazenar as máquinas
  const [teams, setTeams] = useState<any[]>([]); // Estado para armazenar os times
  const [users, setUsers] = useState<any[]>([]); // Estado para armazenar os usuários
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    machine: "",
    date: "",
    status: "Em progresso",
    description: "",
    priority: "Baixa",
    team: "",
    user: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push("/login");
      return;
    }

    // Configurar cabeçalhos para as requisições
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // Carregar manutenções
    fetch("http://127.0.0.1:8000/maintenances/", { headers })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMaintenances(data);
        } else {
          console.error("Erro ao carregar manutenções", data);
          setMaintenances([]);
        }
      })
      .catch((error) => {
        console.error("Erro ao carregar manutenções:", error);
        setMaintenances([]);
      })
      .finally(() => {
        setLoading(false);
      });

    // Carregar máquinas
    fetch("http://127.0.0.1:8000/machines/", { headers })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMachines(data);
        } else {
          console.error("Erro ao carregar máquinas", data);
        }
      })
      .catch((error) => {
        console.error("Erro ao carregar máquinas:", error);
      });

    // Carregar times
    fetch("http://127.0.0.1:8000/teams/", { headers })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTeams(data);
        } else {
          console.error("Erro ao carregar times", data);
        }
      })
      .catch((error) => {
        console.error("Erro ao carregar times:", error);
      });

    // Carregar usuários
    fetch("http://127.0.0.1:8000/users/", { headers })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error("Erro ao carregar usuários", data);
        }
      })
      .catch((error) => {
        console.error("Erro ao carregar usuários:", error);
      });
  }, [router]);

  const handleAddMaintenance = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push("/login");
      return;
    }
  
    const payload = {
      machine: parseInt(formData.machine),
      date: formData.date,
      status: formData.status,
      description: formData.description,
      priority: formData.priority,
      team: parseInt(formData.team),
      user: parseInt(formData.user) || null,  // Opcional
    };
  
    setIsSubmitting(true);
  
    try {
      const response = await fetch("http://127.0.0.1:8000/maintenances/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setMaintenances([...maintenances, data]);
        setShowModal(false);
        setFormData({
          machine: "",
          date: "",
          status: "Em progresso",
          description: "",
          priority: "Baixa",
          team: "",
          user: "",
        });
      } else {
        console.error("Erro ao adicionar manutenção:", data);
      }
    } catch (error) {
      console.error("Erro de conexão:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="flex">
      <Aside />
      <div className="container mx-auto p-4 w-full">
        <h1 className="text-2xl font-bold mb-4">Gestão de Manutenções</h1>

        {/* Botão de adicionar manutenção */}
        <button
          onClick={() => setShowModal(true)} // Exibe o modal
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Adicionar Manutenção
        </button>

        {/* Tabela de manutenções */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Manutenções Registradas</h2>
          <table className="table-auto w-full mt-4 border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="px-4 py-2 text-left">Máquina</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Data</th>
                <th className="px-4 py-2 text-left">Prioridade</th>
                <th className="px-4 py-2 text-left">Time</th>
              </tr>
            </thead>
            <tbody>
              {maintenances.length > 0 ? (
                maintenances.map((maintenance, index) => {
                  const machineName = maintenance.machine ? maintenance.machine.name : "N/A";
                  const teamName = maintenance.team ? maintenance.team.name : "N/A";
                  const status = maintenance.status || "N/A";
                  const priority = maintenance.priority || "N/A";
                  const formattedDate = maintenance.formatted_date || "N/A";

                  return (
                    <tr
                      key={maintenance.id}
                      className={`${index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"} hover:bg-blue-50 cursor-pointer text-black`}
                    >
                      <td className="border px-4 py-2">{machineName}</td>
                      <td className="border px-4 py-2">{status}</td>
                      <td className="border px-4 py-2">{formattedDate}</td>
                      <td className="border px-4 py-2">{priority}</td>
                      <td className="border px-4 py-2">{teamName}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-2">
                    Nenhuma manutenção encontrada
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

        {/* Modal de adicionar manutenção */}
        {showModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center text-black"
            onClick={() => setShowModal(false)} // Fecha o modal ao clicar fora
          >
            <div
              className="bg-gray-50 rounded-lg shadow-lg p-6 w-1/3 text-black"
              onClick={(e) => e.stopPropagation()} // Impede que clicar dentro do modal feche-o
            >
              <h2 className="text-xl font-bold mb-4">Adicionar Manutenção</h2>
              <form onSubmit={handleAddMaintenance}>
                <div>
                  <label>Máquina</label>
                  <select
                    value={formData.machine}
                    onChange={(e) => setFormData({ ...formData, machine: e.target.value })}
                  >
                    {machines.map((machine) => (
                      <option key={machine.id} value={machine.id}>
                        {machine.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Data</label>
                  <input
                    type="datetime-local"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
                <div>
                  <label>Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="Em progresso">Em progresso</option>
                    <option value="Concluída">Concluída</option>
                    <option value="Cancelada">Cancelada</option>
                  </select>
                </div>
                <div>
                  <label>Prioridade</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  >
                    <option value="Baixa">Baixa</option>
                    <option value="Média">Média</option>
                    <option value="Alta">Alta</option>
                  </select>
                </div>
                <div>
                  <label>Time</label>
                  <select
                    value={formData.team}
                    onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                  >
                    {teams.map((team) => (
                      <option key={team.id} value={team.id}>
                        {team.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Usuário</label>
                  <select
                    value={formData.user}
                    onChange={(e) => setFormData({ ...formData, user: e.target.value })}
                  >
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.username}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Descrição</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Adicionar Manutenção"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
