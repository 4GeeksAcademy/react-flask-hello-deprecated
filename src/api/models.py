from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timezone
from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from decimal import Decimal

db = SQLAlchemy()

favoritos = db.Table('favoritos',
    db.Column('usuario_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('favorito_id', db.Integer, db.ForeignKey('users.id'), primary_key=True)
)

class User(db.Model):
    __tablename__="users"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(50), unique=True, nullable=False)
    name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    address = db.Column(db.String(200), nullable=False)
    rol = db.Column(db.String(20), nullable=False)
    service_description = db.Column(db.String(300), nullable=True)
    service_title = db.Column(db.String(100), nullable=True)
    profile_description = db.Column(db.String(800), nullable=True)
    balance=db.Column(db.Integer(), nullable=True ,default=0)
    img_url=db.Column(db.String(), nullable=True)
    cover_img_url=db.Column(db.String(), nullable=True)

    is_active = db.Column(db.Boolean(), nullable=False,default=True)
    created_at = db.Column(db.DateTime(timezone=True), default=datetime.now(timezone.utc), nullable=False)

    services = relationship("Service", back_populates="user")
    orders = relationship("Order",back_populates="user")

    favoritos_agregados = db.relationship(
        'User',
        secondary=favoritos,
        primaryjoin="User.id==favoritos.c.usuario_id",
        secondaryjoin="User.id==favoritos.c.favorito_id",
        backref=db.backref('favoritos_de', lazy='dynamic')
    )

    comments_made = relationship("Comment", foreign_keys="[Comment.user_id]",back_populates="author")
    comments_received = relationship("Comment",foreign_keys="[Comment.freelance_id]",back_populates="recipient")

    def agregar_favorito(self, usuario):
        """Agregar un usuario como favorito"""
        if usuario not in self.favoritos_agregados:
            self.favoritos_agregados.append(usuario)

    def eliminar_favorito(self, usuario):
        """Eliminar un usuario de la lista de favoritos"""
        if usuario in self.favoritos_agregados:
            self.favoritos_agregados.remove(usuario)

    def tiene_favorito(self, usuario):
        """Verificar si un usuario está en la lista de favoritos"""
        return usuario in self.favoritos_agregados


    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "last_name": self.last_name,
            "phone": self.phone,
            "address": self.address,
            "rol": self.rol,
            "is_active": self.is_active,
            "balance": self.balance,
            "services":  self.services,
            "img_url":  self.img_url,
            "cover_img_url" : self.cover_img_url,
            "service_description": self.service_description,
            "service_title": self.service_title,
            "profile_description": self.profile_description,
            # do not serialize the password, its a security breach
        }

class Service(db.Model):
    __tablename__="services"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=True)
    price = db.Column(db.Integer, nullable=True)
    time = db.Column(db.String(50), nullable=True)
    description = db.Column(db.String(200), nullable=True)
    img_url=db.Column(db.String(), nullable=True)
    category=db.Column(db.String(50), nullable=True)

    created_at = db.Column(db.DateTime(timezone=True), default=datetime.now(timezone.utc), nullable=False)
    
    user_id = Column(Integer, ForeignKey('users.id'))
    user = relationship("User", back_populates="services")
    orders = relationship("Order",back_populates="services")

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "price": self.price,
            "time": self.time,
            "description": self.description,
            "img_url": self.img_url,
            "user_id": self.user_id,
            "category": self.category,
            # do not serialize the password, its a security breach
        }

class Order(db.Model):
    __tablename__="orders"
    id = db.Column(db.Integer, unique=True, primary_key=True)
    status = db.Column(db.String(20), nullable=False)
    is_payed = db.Column(db.Boolean(),default=False)
    price = db.Column(db.Float)
    user_name = db.Column(db.String(30), nullable=False)

    user_id = Column(Integer, ForeignKey('users.id'))
    service_id = Column(Integer, ForeignKey('services.id'))

    created_at = db.Column(db.DateTime(timezone=True), default=datetime.now(timezone.utc), nullable=False)

    services = relationship("Service", back_populates="orders")
    user = relationship("User", back_populates="orders")

    def serialize(self):
        return {
            "id": self.id,
            "status": self.status,
            "price": self.price,
            "is_payed": self.is_payed,
            "user_id": self.user_id,
            "service_id": self.service_id,
            "user_name": self.user_name
            # do not serialize the password, its a security breach
        }
    
class Comment(db.Model):
    __tablename__="comments"
    id = db.Column(db.Integer, unique=True, primary_key=True)
    text = db.Column(db.String(200), nullable=False)
    stars=db.Column(db.Integer, nullable=False,default=1)


    user_id = db.Column(db.Integer, ForeignKey('users.id'))  
    freelance_id = db.Column(db.Integer, ForeignKey('users.id'))  
    author = relationship("User",foreign_keys=[user_id],back_populates="comments_made")
    recipient = relationship("User",foreign_keys=[freelance_id],back_populates="comments_received")

    def serialize(self):
        return {
            "id": self.id,
            "text": self.text,
            "stars": self.stars,
            "user_id":self.user_id,
            "freelance_id":self.freelance_id,

        }
    
