
# 📋 Task Manager – Application de gestion de tâches

Ce projet est une application web complète permettant de gérer des tâches personnelles via une interface simple et responsive. Elle inclut un backend en **FastAPI** connecté à une base **MySQL**, et un frontend en **React + Vite + Tailwind CSS**.

---

## 🧱 Stack Technique

### 🔧 Backend – FastAPI

- Framework : FastAPI
- ORM : SQLAlchemy
- Migrations : Alembic
- Base de données : MySQL
- Sécurité des variables : `.env` avec `python-dotenv`

### ⚛️ Frontend – React + Vite

- UI moderne avec Tailwind CSS
- Appels API via Axios
- UX fluide avec édition inline, suppression, ajout

---

## 📁 Structure du projet

```
task-manager/
├── backend/
│   ├── main.py
│   ├── models.py
│   ├── crud.py
│   ├── schemas.py
│   ├── data.py
│   ├── .env
│   └── alembic/
│       ├── env.py
│       ├── versions/
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── src/
│       ├── App.jsx
│       ├── index.css
│       └── main.jsx
```

---

## ⚙️ Configuration Backend

### 1. Créer `.env` dans `/backend` :

```env
DATABASE_URL=mysql+pymysql://user:password@localhost/taskdb
```

### 2. Installer les dépendances Python :

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows : venv\Scripts\activate
pip install -r requirements.txt  # ou installer manuellement fastapi, sqlalchemy, pymysql, alembic, etc.
```

### 3. Initialiser la base de données :

```bash
alembic upgrade head
```

### 4. Lancer le serveur :

```bash
uvicorn main:app --reload
```

API dispo sur : http://localhost:8000/docs

---

## 🎨 Configuration Frontend

### 1. Installer les dépendances :

```bash
cd frontend
npm install
```

### 2. Lancer l'application :

```bash
npm run dev
```

Interface disponible sur : http://localhost:5173

---

## 📡 Endpoints API

| Méthode | URL             | Description          |
| -------- | --------------- | -------------------- |
| GET      | `/tasks`      | Liste des tâches    |
| POST     | `/tasks`      | Ajouter une tâche   |
| PUT      | `/tasks/{id}` | Modifier une tâche  |
| DELETE   | `/tasks/{id}` | Supprimer une tâche |

---

## ✅ Fonctionnalités

- [X] Liste des tâches
- [X] Création d'une tâche
- [X] Suppression d'une tâche
- [X] Modification en double-clic
- [X] UI responsive avec Tailwind
- [X] Backend sécurisé avec .env
- [X] Migration BDD avec Alembic

---

## 🧠 À venir

- Authentification utilisateur
- Filtres par statut (fait / à faire)
- Sauvegarde des thèmes (dark / light)
- Déploiement sur Render / Vercel

---

## 📄 Licence

Projet open-source sous licence MIT.
