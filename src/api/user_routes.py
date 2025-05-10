from flask import Blueprint, jsonify, request
from api.models import db, User
from werkzeug.security import generate_password_hash
from flask_cors import cross_origin
from flask_jwt_extended import jwt_required, get_jwt_identity
import logging
from sqlalchemy.exc import IntegrityError

logging.basicConfig(level=logging.DEBUG)

user_routes_v2 = Blueprint('user_routes_v2', __name__)

# Ruta para actualizar usuario
@user_routes_v2.route('/<int:id>', methods=['PUT'])  # Eliminado el prefijo '/user'
def update_user(id):
    user = User.query.get(id)
    if not user:
        return jsonify({"message": "Usuario no encontrado"}), 404

    data = request.get_json()

    if 'email' in data:
        if not isinstance(data['email'], str) or '@' not in data['email']:
            return jsonify({"message": "Formato de email no válido"}), 400
        existing_user = User.query.filter(User.email == data['email'], User.id != id).first()
        if existing_user:
            return jsonify({"message": "Email ya registrado por otro usuario"}), 409

    if 'password' in data:
        if len(data['password']) < 8:
            return jsonify({"message": "La contraseña debe tener al menos 8 caracteres"}), 400
        user.password = generate_password_hash(data['password'])

    if 'name' in data:
        if not isinstance(data['name'], str) or len(data['name']) == 0:
            return jsonify({"message": "El nombre no puede estar vacío"}), 400
        user.name = data['name']

    db.session.commit()
    return jsonify(user.serialize()), 200

# Ruta para eliminar usuario
@user_routes_v2.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_user(id):
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(id)
        if not user:
            return jsonify({"message": "Usuario no encontrado"}), 404

        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "Usuario eliminado correctamente"}), 200

    except Exception as e:
        return jsonify({"message": f"Error al eliminar usuario: {str(e)}"}), 500

# Ruta para convertir un usuario en administrador
@user_routes_v2.route('/<int:id>/make-admin', methods=['PUT'])
@jwt_required()
def make_admin(id):
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    if not current_user or not current_user.is_admin:
        logging.warning("Usuario autenticado no tiene permisos para esta acción.")
        return jsonify({"error": "No tienes permiso para realizar esta acción"}), 403

    user = User.query.get(id)
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    user.is_admin = True
    db.session.commit()
    logging.info(f"Usuario {user.email} ahora es administrador.")
    return jsonify({"message": f"Usuario {user.email} ahora es administrador."}), 200
