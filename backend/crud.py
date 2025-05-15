from sqlalchemy.orm import Session
from models import Task as DBTask
from schemas import Task as SchemaTask, TaskCreate
from fastapi import HTTPException

def get_tasks(db: Session):
    return db.query(DBTask).all()

def add_task(db: Session, task: TaskCreate):
    db_task = DBTask(**task.dict())
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

def delete_task(db: Session, task_id: int):
    task = db.query(DBTask).filter(DBTask.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(task)
    db.commit()
    return {"ok": True}

def update_task(db: Session, task_id: int, updated: SchemaTask):
    task = db.query(DBTask).filter(DBTask.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    task.title = updated.title
    task.done = updated.done
    db.commit()
    db.refresh(task)
    return task
