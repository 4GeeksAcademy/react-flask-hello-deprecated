import os
from flask import Blueprint, jsonify, request
from api.models import db, User
from werkzeug.security import generate_password_hash
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_cors import CORS
from api.utils import APIException
import logging
from sqlalchemy.exc import IntegrityError

# Configuración de logging
logging.basicConfig(level=logging.DEBUG)

# Configuración del Blueprint
user_routes = Blueprint('user_routes', __name__)
CORS(user_routes, resources={r"/api/user/*": {"origins": "*"}})

# Obtener información del usuario actual
@user_routes.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "Usuario no encontrado"}), 404
    return jsonify(user.serialize()), 200

# Actualizar perfil del usuario
@user_routes.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "Usuario no encontrado"}), 404

    data = request.get_json()
    if not data:
        return jsonify({"error": "No se proporcionaron datos para actualizar"}), 400

    logging.debug(f"Datos recibidos: {data}")  # Agregar para depuración

    # Validación de campos
    if "email" in data and not isinstance(data["email"], str):
        return jsonify({'error': 'El correo electrónico debe ser una cadena de texto'}), 422
    if "name" in data and not isinstance(data["name"], str):
        return jsonify({'error': 'El nombre debe ser una cadena de texto'}), 422

    # Actualización de campos
    user.name = data.get('name', user.name)
    user.email = data.get('email', user.email)

    try:
        db.session.commit()
        return jsonify(user.serialize()), 200
    except IntegrityError:
        db.session.rollback()
        return jsonify({"error": "El correo electrónico ya está en uso"}), 400
    except Exception as e:
        logging.error(f"Error al actualizar perfil: {e}")
        return jsonify({"error": "Error al actualizar el perfil"}), 500

# Eliminar usuario autenticado
@user_routes.route('/profile', methods=['DELETE'])
@jwt_required()
def delete_user():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "Usuario no encontrado"}), 404

    try:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": f"Usuario {user_id} eliminado correctamente"}), 200
    except Exception as e:
        logging.error(f"Error al eliminar usuario: {e}")
        return jsonify({"error": "Error al eliminar el usuario"}), 500

# Obtener información del usuario autenticado y su rol
@user_routes.route('/current', methods=['GET'])
@jwt_required()
def get_authenticated_user():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "Usuario no encontrado"}), 404

    return jsonify({
        "id": user.id,
        "email": user.email,
        "name": user.name,
        "is_admin": getattr(user, 'is_admin', False)  # Manejo de atributo opcional
    }), 200
