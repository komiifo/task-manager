import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  // Liste des tâches
  const [tasks, setTasks] = useState([]);

  // ID de la tâche actuellement en édition (null si aucune)
  const [editingId, setEditingId] = useState(null);

  // Titre en cours de modification (dans le champ d’édition)
  const [editingTitle, setEditingTitle] = useState("");

  // Valeur du champ pour créer une nouvelle tâche
  const [newTitle, setNewTitle] = useState("");

  // Charger les tâches depuis l’API FastAPI
  const loadTasks = async () => {
    const res = await axios.get("http://localhost:8000/tasks");
    setTasks(res.data);
  };

  // Créer une nouvelle tâche
  const addTask = async () => {
    const newTask = {
      title: newTitle,
      done: false,
    };
    await axios.post("http://localhost:8000/tasks", newTask);
    setNewTitle(""); // Réinitialise le champ
    loadTasks(); // Recharge les tâches
  };

  // Supprimer une tâche par ID
  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:8000/tasks/${id}`);
    loadTasks();
  };

  // Début de l’édition : stocke l’ID et le titre actuel
  const startEditing = (task) => {
    setEditingId(task.id);
    setEditingTitle(task.title);
  };

  // Annuler l’édition en cours
  const cancelEditing = () => {
    setEditingId(null);
    setEditingTitle("");
  };

  // Valider l’édition : envoie un PUT à l’API
  const confirmEditing = async (id) => {
    const updatedTask = {
      id,
      title: editingTitle,
      done: false,
    };
    await axios.put(`http://localhost:8000/tasks/${id}`, updatedTask);
    setEditingId(null);
    setEditingTitle("");
    loadTasks();
  };

  // Chargement initial des tâches
  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">📝 Mes tâches</h1>
      <div className="flex justify-center mb-4 gap-2">
        <input
          className="border rounded px-2 py-1 w-1/2"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Nouvelle tâche"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
        >
          Ajouter
        </button>
      </div>
      <ul className="max-w-xl mx-auto space-y-2">
        {tasks.map((t) => (
          <li
            key={t.id}
            onDoubleClick={() => startEditing(t)}
            className="bg-white px-4 py-2 shadow rounded flex justify-between items-center"
          >
            {editingId === t.id ? (
              <div className="flex gap-2 w-full">
                <input
                  className="border px-2 py-1 flex-grow"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                />
                <button
                  onClick={() => confirmEditing(t.id)}
                  className="bg-green-500 text-white px-2 rounded"
                >
                  OK
                </button>
                <button
                  onClick={cancelEditing}
                  className="bg-gray-400 text-white px-2 rounded"
                >
                  Annuler
                </button>
              </div>
            ) : (
              <>
                <span>{t.title}</span>
                <button
                  onClick={() => deleteTask(t.id)}
                  className="text-red-500 hover:underline"
                >
                  Supprimer
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
