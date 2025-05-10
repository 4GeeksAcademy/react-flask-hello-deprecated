"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Food, Pet, Accessories
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy import select, and_, or_
import json
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


# @api.route('/hello', methods=['POST', 'GET'])
# def handle_hello():

#     response_body = {
#         "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
#     }

#     return jsonify(response_body), 200


@api.route('/')
def sitemap():
    return generate_sitemap(api)

# Obtener todos los alimentos
@api.route('/foods', methods=['GET'])
def get_foods():
    foods = Food.query.all()
    if not foods:
        return "food not found", 404
    else: 
        return jsonify([food.serialize() for food in foods]), 200


# Obtener un alimento por ID
@api.route('/foods/<int:food_id>', methods=['GET'])
def get_food(food_id):
    food = Food.query.get(food_id)
    if not food:
        return jsonify({"error": "Food not found"}), 404
    return jsonify(food.serialize()), 200


@api.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    if not users:
        return "not users found", 404
    return jsonify([user.serialize() for user in users]), 200


# Obtener un usuario por ID
@api.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "user not found"}), 404
    return jsonify(user.serialize()), 200


@api.route('/pets', methods=['GET'])
def get_pets():
    pets = Pet.query.all()
    if not pets: 
        return "no pets found", 404
    return jsonify([pet.serialize() for pet in pets]), 200


# Obtener una mascota por ID
@api.route('/pets/<int:pet_id>', methods=['GET'])
def get_pet(pet_id):
    pet = Pet.query.get(pet_id)
    if not pet:
        return jsonify({"error": "pet not found"}), 404
    return jsonify(pet.serialize()), 200

#obtener sugerencias de comida según mascota
@api.route('/foods/suggestions/<int:pet_id>', methods=['GET'])
def get_pet_suggestions(pet_id):
    pet = Pet.query.get(pet_id).serialize()
    # Problema: Un animal puede tener varias patologias en su campo, habría que coger este campo y tratarlo, 
    # separar las patologias en una lista y hacer la query para cada patologia. 
    # Solucion simple: limitar a 1 patologia cada animal por ahora
    #if para pet# anymal_type == perro, animal size    #si no no hace falta size
    if pet["animal_type"] == "perro":   
        food_suggestions = db.session.execute(select(Food).where(and_(Food.animal_type==pet["animal_type"]),
                                                             Food.size==pet["size"],
                                                             Food.age==pet["age"],
                                                             Food.pathologies==pet["pathologies"])).all()
    else:
        food_suggestions = db.session.execute(select(Food).where(Food.animal_type==pet["animal_type"]),
                                                             Food.age==pet["age"],
                                                             Food.pathologies==pet["pathologies"]).all()
    if not food_suggestions :
        return "no suggestions found", 404  
    return [food[0].serialize() for food in food_suggestions], 200


#obtener todos los alimentos según tipo de animal
@api.route('/foods/cat', methods=['GET'])
def get_all_cat_food():
    food_cat = db.session.query(Food).filter(Food.animal_type.ilike("%gato%")).all()
    
    print("Datos obtenidos:", food_cat)  
    
    if not food_cat:
        return jsonify({"error": "No cat food found"}), 404  
    

# #obtener todos los alimentos según tipo de animal
@api.route('/foods/cat', methods=['GET'])
def get_all_cat_food():
    food_cat = db.session.query(Food).filter(Food.animal_type.ilike("%gato%")).all()
    print("Datos obtenidos:", food_cat)
    if not food_cat:
        return jsonify({"error": "No cat food found"}), 404

    return jsonify([food.serialize() for food in food_cat]), 200

@api.route('/foods/dog', methods=['GET'])
def get_all_dog_food():
    food_dog = db.session.query(Food).filter(Food.animal_type.ilike("%perro%")).all()

    
    print("Datos obtenidos:", food_dog)  
    
    if not food_dog:
        return jsonify({"error": "No dog food found"}), 404  
    

    print("Datos obtenidos:", food_dog)
    if not food_dog:
        return jsonify({"error": "No dog food found"}), 404

    return jsonify([food.serialize() for food in food_dog]), 200

@api.route('/foods/exotic', methods=['GET'])
def get_all_exotic_food():
    food_exotic = db.session.query(Food).filter(Food.animal_type.ilike("%exótico%")).all()

    
    print("Datos obtenidos:", food_exotic)  
    
    if not food_exotic:
        return jsonify({"error": "No exotic food found"}), 404  
    

    print("Datos obtenidos:", food_exotic)
    if not food_exotic:
        return jsonify({"error": "No exotic food found"}), 404

    return jsonify([food.serialize() for food in food_exotic]), 200

# Obtener todos los accesorios
@api.route('/accessories', methods=['GET'])
def get_accessories():
    accessories = Accessories.query.all()
    if not accessories:
        return "no accessories found", 404 
    return jsonify([accessory.serialize() for accessory in accessories]), 200


# Obtener una accesorio por ID
@api.route('/accessories/<int:accessories_id>', methods=['GET'])
def get_accessory(accessories_id):
    accessories = Accessories.query.get(accessories_id)
    if not accessories:
        return jsonify({"error": "accessories not found"}), 404
    return jsonify(accessories.serialize())

# Crear un nuevo alimento
@api.route('/foods', methods=['POST'])
def create_food():
    data = request.get_json()
    new_food = Food(
        name=data["name"],
        brand=data["brand"],
        description=data.get("description"),
        ingredients=data["ingredients"],
        animal_type=data["animal_type"],
        pathologies=data["pathologies"],  # Recibe lista JSON
        size=data["size"],
        weight=data["weight"],
        price=data["price"],
        url=data.get("url")
    )
    db.session.add(new_food)
    db.session.commit()
    return jsonify(new_food.serialize()), 201

#registrar nuevo usuario
@api.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    new_user = User(
        name=data["name"],
        email=data["email"],
        password=data["password"],
        is_active=data["is_active"]
)
    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"msg": "El usuario ya existe"}), 400
    
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.serialize()), 201

# iniciar sesion 
@api.route('loging/user', methods=['POST'])
def logging_user():
    data = request.get_json()
    user = User.query.filter_by(email=data["email"]).first()
    

    if User.query.filter_by(email=data["email"]).first() and User.query.filter_by(password=data["password"]).first():
        access_token=create_access_token(identity=user.email)
        return jsonify(access_token=access_token), 200
    return jsonify ({"nsg":"credenciales invalidas"}), 400


#crear un nuevo accesorio
@api.route('/accessories', methods=['POST'])
def create_accessory():
    data = request.get_json()
    new_accessory = Accessories(
        name=data["name"],
        brand=data["brand"],
        description=data["description"],
        animal_type=data["animal_type"],
        pathologies=data["pathologies"],
        price=data["price"],
        url=data["url"]
)
    db.session.add(new_accessory)
    db.session.commit()
    return jsonify(new_accessory.serialize()), 201

#crear una nueva mascota
@api.route('/pets', methods=['POST'])
def create_pet():
    data = request.get_json()
    new_accessory = Pet(
        name=data["name"],
        size=data["size"],
        breed=data["breed"],
        age=data["age"],
        animal_type=data["animal_type"],
        pathologies=data["pathologies"],
        user_id=data["user_id"],
      
        
)
    db.session.add(new_accessory)
    db.session.commit()
    return jsonify(new_accessory.serialize()), 201

# @api.route('/foods/<int:food_id>', methods=['PUT'])
# def update_food(food_id):
#     food = Food.query.get(food_id)
#     if not food:
#         return jsonify({"message": "Food not found"}), 404

#     data = request.get_json()
    
#     food.name = data.get("name", food.name)
#     food.brand = data.get("brand", food.brand)
#     food.description = data.get("description", food.description)
#     food.ingredients = data.get("ingredients", food.ingredients)
#     food.weight = data.get("weight", food.weight)
#     food.price = data.get("price", food.price)
#     food.animal_type = data.get("animal_type", food.animal_type)
#     food.size = data.get("size", food.size)
#     food.pathologies = data.get("pathologies", food.patologies)
#     food.url = data.get("url", food.url)

#     db.session.commit()

#     return jsonify({
#         "id": food.id,
#         "name": food.name,
#         "brand": food.brand,
#         "description": food.description,
#         "ingredients": food.ingredients,
#         "animal_type": food.animal_type,
#         "price": food.price,
#         "weight": food.weight,
#         "size" : food.size,       
#         "pathologies": food.pathologies,
#         "url": food.url
#     })



