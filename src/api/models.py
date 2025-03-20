
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from datetime import datetime





db = SQLAlchemy()


class User(db.Model):
    
    id = db.Column(db.Integer, primary_key=True)
    name= db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name
            # do not serialize the password, its a security breach
        }

class PasswordReset(db.Model):
    __tablename__ = 'password_reset'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), nullable=False)
    token = db.Column(db.String(255), nullable=False, unique=True)
    expires_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "token": self.token,
            "expires_at": self.expires_at.strftime("%Y-%m-%d %H:%M:%S")
        }

    def __repr__(self):
        return f'<PasswordReset {self.email}>'        
    
   
class Food(db.Model):
    __tablename__ = 'foods'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    brand = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    ingredients = db.Column(db.Text, nullable=False)
    weight = db.Column(db.Float, nullable=False)
    price = db.Column(db.Float, nullable=False)
    age = db.Column(db.String, nullable=False)
    animal_type = db.Column(db.String(50), nullable=False)
    size = db.Column(db.String(30), nullable=True)
    pathologies = db.Column(db.Text, nullable=True)
    url = db.Column(db.String(255), nullable=True)

    def __repr__(self):
        return f'<Food {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "brand": self.brand,
            "age": self.age,
            "description": self.description,
            "ingredients": self.ingredients,
            "weight": self.weight, #peso en kilos
            "price": self.price, #precio en euros
            "animal_type": self.animal_type,
            "size": self.size,
            "pathologies": self.pathologies,
            "url": self.url
        }

class Accessories(db.Model):
    __tablename__ = 'accessories'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    brand = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    animal_type = db.Column(db.String(50), nullable=False)
    pathologies = db.Column(db.Text, nullable=True)
    price = db.Column(db.Float, nullable=False)
    url = db.Column(db.String(255), nullable=True)

    def __repr__(self):
        return f'<Accessories {self.name}>'
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "brand": self.brand,
            "description": self.description,
            "animal_type": self.animal_type,
            "price": self.price, #precio en euros
            "pathologies": self.pathologies,
            "url": self.url
        }
    
# class ExoticFood(db.Model):
#     __tablename__ = ''
    
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(100), nullable=False)
#     brand = db.Column(db.String(100), nullable=False)
#     description = db.Column(db.Text, nullable=True)
#     ingredients = db.Column(db.Text, nullable=False)
#     # is_hypoallergenic = db.Column(db.Boolean, default=False)
#     # is_gluten_free = db.Column(db.Boolean, default=False)
#     # protein_source = db.Column(db.String(100), nullable=False)
#     # fat_content = db.Column(db.Float, nullable=True)
#     # omega3_content = db.Column(db.Float, nullable=True)
#     # taurine_content = db.Column(db.Float, nullable=True)
#     # suitable_for_senior = db.Column(db.Boolean, default=False)
#     # suitable_for_sterilized = db.Column(db.Boolean, default=False)
#     # croquette_shape = db.Column(db.String(50), nullable=True)
#     # weight_kg = db.Column(db.Float, nullable=False)
#     # price_eur = db.Column(db.Float, nullable=False)
#     url = db.Column(db.String(255), nullable=True)

#     def __repr__(self):
#         return f'<ExoticFood {self.name}>'
#     def serialize(self):
#         return {
#             "id": self.id,
#             "name": self.name,
#             "brand": self.brand,
#             "description": self.description,
#             "ingredients": self.ingredients,
#             "weight_kg": self.weight_kg,
#             "price_eur": self.price_eur,
#             "url": self.url
#         }

class Pet(db.Model):
    __tablename__ = 'pet'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    size = db.Column(db.String(100), nullable=True) # cambiar raza por tamaño 
    breed = db.Column(db.String(100), nullable=True) # cambiar raza por tamaño 
    age = db.Column(db.String, nullable=False)
    animal_type= db.Column(db.String, nullable=False)
    pathologies = db.Column(db.Text, nullable=True) # patología contemple peso 
    user_id = db.Column(db.ForeignKey("user.id"), nullable=False)
    
    # is_hypoallergenic = db.Column(db.Boolean, default=False)
    # is_gluten_free = db.Column(db.Boolean, default=False)
    # protein_source = db.Column(db.String(100), nullable=False)
    # fat_content = db.Column(db.Float, nullable=True)
    # omega3_content = db.Column(db.Float, nullable=True)
    # taurine_content = db.Column(db.Float, nullable=True)
    # suitable_for_senior = db.Column(db.Boolean, default=False)
    # suitable_for_sterilized = db.Column(db.Boolean, default=False)
    # croquette_shape = db.Column(db.String(50), nullable=True)
    # weight_kg = db.Column(db.Float, nullable=False)
    # price_eur = db.Column(db.Float, nullable=False)
    url = db.Column(db.String(255), nullable=True)

    def __repr__(self):
        return f'<Pet{self.name}>'
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "size": self.size,
            "age": self.age,
            "breed": self.breed,
            "animal_type": self.animal_type,
            "pathologies": self.pathologies,
            "user_id": self.user_id,
            "url": self.url
        }


#tabla para gestionar carrito/pedidos

class Order(db.Model):
    __tablename__ = 'order'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.ForeignKey("user.id"), nullable=False)
    ordered_food = db.Column(db.String, nullable=True)
    ordered_accessories = db.Column(db.String, nullable=True)
    status = db.Column(db.String, nullable=False)

    def __repr__(self):
        return f'<Order{self.name}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "ordered_food": self.ordered_food,
            "ordered_accessories": self.ordered_accessories,
            "status": self.status
        }
    
