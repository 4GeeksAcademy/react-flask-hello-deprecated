from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)
bcrypt = Bcrypt()

# Allow CORS requests to this API
CORS(api)


@api.route('/users', methods=['GET'])
@jwt_required()
def get_all_users():
    users = User.query.all()
    return jsonify([user.serialize() for user in users]), 200


@api.route('/create', methods=['POST'])
def create_user():
    body = request.get_json()

    if not body or not body.get('email') or not body.get('password') or not body.get('nombre') or not body.get('apellidos'):
        return jsonify({"error": "Faltan datos requeridos (nombre, apellidos, email y password)"}), 400

    # Verificar si el usuario ya existe
    if User.query.filter_by(email=body['email']).first():
        return jsonify({"error": "El usuario ya está registrado"}), 400

    new_user = User(
        email=body['email'],
        password=bcrypt.generate_password_hash(body['password']).decode('utf-8'),
        nombre=body['nombre'],
        apellidos=body['apellidos'],
        is_active=True
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": f"Usuario {new_user.email} creado exitosamente"}), 201




@api.route('/login', methods=['POST'])
def login():
    user_data = request.get_json()
    user = User.query.filter_by(email=user_data["email"]).first()
    if user and bcrypt.check_password_hash(user.password, user_data["password"]) :
        access_token = create_access_token(identity=str(user.id))
        return jsonify({"msg": "Login correcto", "access_token":access_token})
    else:
        return jsonify({"msg": "Error el email no esta registrado o los datos son incorrectos"})
    

# Ruta para obtener el perfil del usuario autenticado
@api.route('/profile', methods=['GET'])
@jwt_required()
def get_user_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    return jsonify({
        "id": user.id,
        "nombre": user.nombre,
        "apellidos": user.apellidos,
        "email": user.email
    }), 200    
    

