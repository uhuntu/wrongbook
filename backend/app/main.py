from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .database import Base, engine, get_db
from .models import WrongQuestion, ReviewRecord
from .schemas import QuestionCreate, QuestionOut, ReviewCreate, ReviewOut

Base.metadata.create_all(bind=engine)

app = FastAPI(title="WrongBook API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/questions", response_model=list[QuestionOut])
def list_questions(db: Session = Depends(get_db)):
    return db.query(WrongQuestion).order_by(WrongQuestion.created_at.desc()).all()


@app.post("/questions", response_model=QuestionOut)
def create_question(payload: QuestionCreate, db: Session = Depends(get_db)):
    q = WrongQuestion(**payload.model_dump())
    db.add(q)
    db.commit()
    db.refresh(q)
    return q


@app.get("/questions/{question_id}", response_model=QuestionOut)
def get_question(question_id: int, db: Session = Depends(get_db)):
    q = db.get(WrongQuestion, question_id)
    if not q:
        raise HTTPException(status_code=404, detail="Question not found")
    return q


@app.post("/questions/{question_id}/reviews", response_model=ReviewOut)
def add_review(question_id: int, payload: ReviewCreate, db: Session = Depends(get_db)):
    q = db.get(WrongQuestion, question_id)
    if not q:
        raise HTTPException(status_code=404, detail="Question not found")

    review = ReviewRecord(question_id=question_id, **payload.model_dump())
    status_map = {
        "dont_know": "learning",
        "wrong": "reviewing",
        "right_unsure": "reviewing",
        "mastered": "mastered",
    }
    q.status = status_map.get(payload.result, q.status)
    db.add(review)
    db.commit()
    db.refresh(review)
    return review
