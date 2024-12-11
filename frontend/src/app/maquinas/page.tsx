"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Aside } from "@/components/AsideBar"; 

export default function MachinesPage() {
  const [machines, setMachines] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);  // Estado para o modal
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false); // Estado para o modal de detalhes
  const [selectedMachine, setSelectedMachine] = useState<any | null>(null); // Estado para a máquina selecionada
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    local: "",
    fab_date: "",
    serial_number: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetch("http://127.0.0.1:8000/machines/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMachines(data);
        } else {
          console.error("A resposta não é um array", data);
          setMachines([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao carregar máquinas:", error);
        setMachines([]);
        setLoading(false);
      });
  }, [router]);

  const handleAddMachine = async (e: React.FormEvent) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push("/login");
      return;
    }
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/machines/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newMachine = await response.json();
        setMachines((prevMachines) => [...prevMachines, newMachine]);
        setShowModal(false); // Fecha o modal após adicionar a máquina
        setFormData({
          name: "",
          type: "",
          local: "",
          fab_date: "",
          serial_number: "",
        });
      } else {
        console.error("Erro ao adicionar máquina.");
      }
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMachineClick = (machine: any) => {
    setSelectedMachine(machine); // Armazena a máquina selecionada
    setShowDetailModal(true); // Exibe o modal de detalhes
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowModal(false); // Fecha o modal com a tecla ESC
        setShowDetailModal(false); // Fecha o modal de detalhes com ESC também
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="flex">
      <Aside />
      <div className="container mx-auto p-4 w-full">
        <h1 className="text-2xl font-bold mb-4">Gestão de Máquinas</h1>

        {/* Botão de adicionar máquina */}
        <button
          onClick={() => setShowModal(true)} // Ao clicar, mostra o modal
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Adicionar Máquina
        </button>

        {/* Tabela de máquinas */}
        <table className="table-auto w-full mt-4 border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="px-4 py-2 text-left">Nome</th>
              <th className="px-4 py-2 text-left">Tipo</th>
              <th className="px-4 py-2 text-left">Local</th>
              <th className="px-4 py-2 text-left">Data de Fabricação</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(machines) && machines.length > 0 ? (
              machines.map((machine, index) => (
                <tr
                  key={machine.id}
                  onClick={() => handleMachineClick(machine)} // Exibe o modal de detalhes
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                  } hover:bg-blue-50 cursor-pointer text-black`}
                >
                  <td className="border px-4 py-2">{machine.name}</td>
                  <td className="border px-4 py-2">{machine.type}</td>
                  <td className="border px-4 py-2">{machine.local}</td>
                  <td className="border px-4 py-2">
                    {new Date(machine.fab_date).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-2">
                  Nenhuma máquina encontrada
                </td>
              </tr>
            )}
          </tbody>
        </table>



        {/* Modal de adicionar máquina */}
        {showModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center text-black"
            onClick={() => setShowModal(false)} // Fecha o modal ao clicar fora
          >
            <div
              className="bg-gray-50 rounded-lg shadow-lg p-6 w-1/3 text-black"
              onClick={(e) => e.stopPropagation()} // Impede que clicar dentro do modal feche-o
            >
              <h2 className="text-xl font-bold mb-4">Adicionar Máquina</h2>
              <form onSubmit={handleAddMachine}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Nome</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full border px-3 py-2 rounded text-black"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Tipo</label>
                  <input
                    type="text"
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className="w-full border px-3 py-2 rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Local</label>
                  <input
                    type="text"
                    value={formData.local}
                    onChange={(e) =>
                      setFormData({ ...formData, local: e.target.value })
                    }
                    className="w-full border px-3 py-2 rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Data de Fabricação
                  </label>
                  <input
                    type="date"
                    value={formData.fab_date}
                    onChange={(e) =>
                      setFormData({ ...formData, fab_date: e.target.value })
                    }
                    className="w-full border px-3 py-2 rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Número de Série
                  </label>
                  <input
                    type="text"
                    value={formData.serial_number}
                    onChange={(e) =>
                      setFormData({ ...formData, serial_number: e.target.value })
                    }
                    className="w-full border px-3 py-2 rounded"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Adicionando..." : "Adicionar"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Modal de detalhes da máquina */}
        {showDetailModal && selectedMachine && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center text-black"
            onClick={() => setShowDetailModal(false)} // Fecha o modal ao clicar fora
          >
            <div
              className="bg-gray-50 rounded-lg shadow-lg p-6 w-1/3 text-black"
              onClick={(e) => e.stopPropagation()} // Impede que clicar dentro do modal feche-o
            >
              <h2 className="text-xl font-bold mb-4">Detalhes da Máquina</h2>
              <div>
                <p><strong>Nome:</strong> {selectedMachine.name}</p>
                <p><strong>Tipo:</strong> {selectedMachine.type}</p>
                <p><strong>Local:</strong> {selectedMachine.local}</p>
                <p><strong>Data de Fabricação:</strong> {new Date(selectedMachine.fab_date).toLocaleDateString()}</p>
                <p><strong>Número de Série:</strong> {selectedMachine.serial_number}</p>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
