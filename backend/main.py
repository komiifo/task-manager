from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from data import SessionLocal, engine
import models
import crud
import schemas

# Crée les tables si elles n'existent pas déjà
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Middleware CORS pour permettre les appels du frontend (React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dépendance pour fournir une session DB à chaque requête
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/tasks", response_model=list[schemas.Task])
def list_tasks(db: Session = Depends(get_db)):
    return crud.get_tasks(db)

@app.post("/tasks", response_model=schemas.Task)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    return crud.add_task(db, task)

@app.put("/tasks/{task_id}", response_model=schemas.Task)
def update_task(task_id: int, updated_task: schemas.Task, db: Session = Depends(get_db)):
    return crud.update_task(db, task_id, updated_task)

@app.delete("/tasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    return crud.delete_task(db, task_id)
