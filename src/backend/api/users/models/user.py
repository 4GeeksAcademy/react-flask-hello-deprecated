from sqlalchemy import Column, Integer, String
from src.backend.core.database import Base

class User(Base):
    __tablename__ = 'users'

    id_user = Column(
        Integer,
        primary_key=True,
        index=True
    )
    name = Column(
        String(80),
        nullable=False
    )
    email = Column(
        String(120),
        unique=True,
        index=True,
        nullable=False
    )
    password = Column(
        String(255),
        nullable=False
    )
    