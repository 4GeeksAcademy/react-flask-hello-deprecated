from typing import List
from sqlalchemy.orm import declarative_base, Mapped, mapped_column, relationship
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, create_engine, ForeignKey

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(256),nullable=False)
    first_name: Mapped[str] = mapped_column(String(120),nullable=False)
    last_name: Mapped[str] = mapped_column(String(120),nullable=False)
    accounts: Mapped[List["Accounts"]] = relationship()

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            # do not serialize the password, its a security breach
        }

class Accounts(db.Model):
    __tablename__ = 'accounts'
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    name: Mapped[str] = mapped_column(String(80),nullable=False)
    balance: Mapped[float] = mapped_column(nullable=False)
    coin: Mapped[str] = mapped_column(nullable=False)
    type: Mapped[str] = mapped_column(nullable=False)
    accounts: Mapped[List["Account_details"]] = relationship()

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
            "balance": self.balance,
            "coin": self.coin,
            "type": self.type
        }

class Account_details(db.Model):
    __tablename__ = 'account_details'
    id: Mapped[int] = mapped_column(primary_key=True)
    accounts_id: Mapped[int] = mapped_column(ForeignKey("accounts.id"))
    detail: Mapped[str] = mapped_column(String(80),nullable=False)
    amount: Mapped[float] = mapped_column(nullable=False)
    coin: Mapped[str] = mapped_column(String(120),nullable=False)
    type: Mapped[str] = mapped_column(String(80),nullable=False)
    date: Mapped[str] = mapped_column(String(80),nullable=False)
    time: Mapped[str] = mapped_column(String(80),nullable=False)
    
    def serialize(self):
        return {
            "id": self.id,
            "accounts_id": self.accounts_id,
            "detail": self.detail,
            "amount": self.amount,
            "coin": self.coin,
            "type": self.type,
            "date": self.date,
            "time": self.time,
        }   