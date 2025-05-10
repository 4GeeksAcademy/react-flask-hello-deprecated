import os
from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash, generate_password_hash
import jwt
import datetime
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required
from datetime import timedelta
from api.models import db, User
from api.utils import APIException
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

# Crear el blueprint de autenticación
auth_routes = Blueprint('auth', __name__)
CORS(auth_routes, resources={r"/auth/*": {"origins": "*"}})

# Clave secreta para JWT
SECRET_KEY = os.getenv("SECRET_KEY", "default_secret_key")

# Ruta para registro de usuarios
@auth_routes.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    # Validar los datos
    if not data.get('email') or not data.get('password') or not data.get('name'):
        return jsonify({"message": "Todos los campos son obligatorios"}), 400

    # Verificar si el usuario ya existe
    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        return jsonify({"message": "El correo ya está registrado"}), 409

    # Crear un nuevo usuario con contraseña encriptada
    hashed_password = generate_password_hash(data['password'])
    new_user = User(
        name=data['name'],
        email=data['email'], 
        password=hashed_password,
        is_active=True
    )

    # Guardar en la base de datos
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Usuario registrado exitosamente"}), 201

# Ruta para inicio de sesión
@auth_routes.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    # Validar datos
    if not data.get('email') or not data.get('password'):
        return jsonify({"message": "Email y contraseña son obligatorios"}), 400

    # Buscar al usuario por email
    user = User.query.filter_by(email=data['email']).first()
    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({"message": "Email o contraseña incorrectos"}), 401

    # Generar el token JWT usando flask_jwt_extended
    access_token = create_access_token(identity=user.id, expires_delta=timedelta(hours=1))
    return jsonify({
        "token": access_token,
        "user": {
            "id": user.id,
            "email": user.email,
            "name": user.name
        }
    }), 200

# Ruta para obtener información del usuario autenticado
@auth_routes.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    from flask_jwt_extended import get_jwt_identity
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"message": "Usuario no encontrado"}), 404

    return jsonify({
        "id": user.id,
        "name": user.name,
        "email": user.email
    }), 200
