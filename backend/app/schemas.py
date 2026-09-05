from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, ConfigDict


class ReviewCreate(BaseModel):
    result: str
    note: Optional[str] = None


class ReviewOut(ReviewCreate):
    model_config = ConfigDict(from_attributes=True)
    id: int
    reviewed_at: datetime


class QuestionCreate(BaseModel):
    subject: str = "数学"
    grade: Optional[str] = None
    chapter: Optional[str] = None
    knowledge_point: Optional[str] = None
    question_text: str
    wrong_answer: Optional[str] = None
    correct_answer: Optional[str] = None
    explanation: Optional[str] = None
    error_type: Optional[str] = None


class QuestionOut(QuestionCreate):
    model_config = ConfigDict(from_attributes=True)
    id: int
    status: str
    created_at: datetime
    updated_at: datetime
    reviews: List[ReviewOut] = []
