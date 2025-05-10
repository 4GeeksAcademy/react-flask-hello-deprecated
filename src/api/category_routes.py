from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from api.models import db, Category, User

category_routes = Blueprint('categories', __name__)

# Crear categoría
@category_routes.route('/', methods=['POST'])
@jwt_required()
def create_category():
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        if not user or not user.is_admin:
            return jsonify({"error": "Acceso no autorizado"}), 403

        data = request.get_json()
        name = data.get('name')

        if not name:
            return jsonify({"error": "El nombre de la categoría es obligatorio"}), 400

        if Category.query.filter_by(name=name).first():
            return jsonify({"error": "La categoría ya existe"}), 400

        category = Category(name=name)
        db.session.add(category)
        db.session.commit()

        return jsonify(category.serialize()), 201
    except Exception as e:
        return jsonify({"error": f"Error al crear categoría: {str(e)}"}), 500

# Obtener categorías
@category_routes.route('/', methods=['GET'])
def get_categories():
    try:
        categories = Category.query.all()
        return jsonify([category.serialize() for category in categories]), 200
    except Exception as e:
        return jsonify({"error": f"Error al obtener categorías: {str(e)}"}), 500

# Actualizar categoría
@category_routes.route('/<int:category_id>', methods=['PUT'])
@jwt_required()
def update_category(category_id):
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        if not user or not user.is_admin:
            return jsonify({"error": "Acceso no autorizado"}), 403

        data = request.get_json()
        name = data.get('name')

        if not name:
            return jsonify({"error": "El nombre de la categoría es obligatorio"}), 400

        category = Category.query.get(category_id)
        if not category:
            return jsonify({"error": "Categoría no encontrada"}), 404

        if Category.query.filter(Category.id != category_id, Category.name == name).first():
            return jsonify({"error": "Ya existe otra categoría con ese nombre"}), 400

        category.name = name
        db.session.commit()

        return jsonify(category.serialize()), 200
    except Exception as e:
        return jsonify({"error": f"Error al actualizar categoría: {str(e)}"}), 500

# Eliminar categoría
@category_routes.route('/<int:category_id>', methods=['DELETE'])
@jwt_required()
def delete_category(category_id):
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        if not user or not user.is_admin:
            return jsonify({"error": "Acceso no autorizado"}), 403

        category = Category.query.get(category_id)
        if not category:
            return jsonify({"error": "Categoría no encontrada"}), 404

        db.session.delete(category)
        db.session.commit()

        return jsonify({"message": "Categoría eliminada con éxito"}), 200
    except Exception as e:
        return jsonify({"error": f"Error al eliminar categoría: {str(e)}"}), 500
