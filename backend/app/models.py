from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base


class WrongQuestion(Base):
    __tablename__ = "wrong_questions"

    id = Column(Integer, primary_key=True, index=True)
    subject = Column(String(50), nullable=False, default="数学")
    grade = Column(String(50), nullable=True)
    chapter = Column(String(120), nullable=True)
    knowledge_point = Column(String(120), nullable=True)
    question_text = Column(Text, nullable=False)
    wrong_answer = Column(Text, nullable=True)
    correct_answer = Column(Text, nullable=True)
    explanation = Column(Text, nullable=True)
    error_type = Column(String(50), nullable=True)
    status = Column(String(30), nullable=False, default="new")
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    reviews = relationship("ReviewRecord", back_populates="question", cascade="all, delete-orphan")


class ReviewRecord(Base):
    __tablename__ = "review_records"

    id = Column(Integer, primary_key=True, index=True)
    question_id = Column(Integer, ForeignKey("wrong_questions.id", ondelete="CASCADE"), nullable=False)
    result = Column(String(30), nullable=False)
    note = Column(Text, nullable=True)
    reviewed_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    question = relationship("WrongQuestion", back_populates="reviews")
