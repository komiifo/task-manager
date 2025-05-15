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
      id: Date.now(), // ID unique basé sur la date
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
    <div style={{ padding: "1rem" }}>
      <h1>📝 Mes tâches</h1>

      {/* Champ de création de tâche */}
      <input
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        placeholder="Nouvelle tâche"
      />
      <button onClick={addTask}>Ajouter</button>

      {/* Liste des tâches */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((t) => (
          <li
            key={t.id}
            onDoubleClick={() => startEditing(t)} // Double-clic pour éditer
            style={{ margin: "0.5rem 0" }}
          >
            {editingId === t.id ? (
              // Mode édition actif
              <>
                <input
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                />
                <button onClick={() => confirmEditing(t.id)}>OK</button>
                <button onClick={cancelEditing}>Annuler</button>
              </>
            ) : (
              // Mode lecture seule
              <>
                <span>{t.title}</span>
                <button
                  style={{ marginLeft: "1rem" }}
                  onClick={() => deleteTask(t.id)}
                >
                  ❌
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
