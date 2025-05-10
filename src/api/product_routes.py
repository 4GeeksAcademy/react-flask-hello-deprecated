# src/api/product_routes.py
import os
from flask import Blueprint, request, jsonify
from flask_cors import CORS
from api.models import db, Product, Category, User
from api.utils import APIException
from dotenv import load_dotenv
from flask_jwt_extended import jwt_required, get_jwt_identity
import logging
from sqlalchemy.exc import SQLAlchemyError  # Importación necesaria

# Configuración de logging
logger = logging.getLogger('product_routes')
logging.basicConfig(level=logging.ERROR)

# Cargar variables de entorno
load_dotenv()

# Crear el blueprint
product_routes = Blueprint('products', __name__)
CORS(product_routes, resources={r"/api/products/*": {"origins": "*"}})

# Obtener productos
@product_routes.route('/', methods=['GET'])
def get_products():
    try:
        featured = request.args.get('featured', type=str)
        products = Product.query.filter_by(featured=True).all() if featured == 'true' else Product.query.all()
        return jsonify([product.serialize() for product in products]), 200
    except SQLAlchemyError as e:
        return jsonify({"error": "Error al obtener productos", "details": str(e)}), 500

# Crear un producto
@product_routes.route('/', methods=['POST'])
@jwt_required()
def create_product():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user or not user.is_admin:
        return jsonify({"message": "No autorizado"}), 403

    data = request.get_json()
    required_fields = ['name', 'price', 'stock', 'categories']

    # Validar campos obligatorios
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return jsonify({"message": f"Faltan los campos: {', '.join(missing_fields)}"}), 400

    # Validar tipos de datos
    if not isinstance(data['price'], (int, float)) or not isinstance(data['stock'], int):
        return jsonify({"message": "Los campos 'price' y 'stock' deben ser números válidos"}), 400
    if not isinstance(data['categories'], list):
        return jsonify({"message": "El campo 'categories' debe ser una lista de IDs"}), 400

    try:
        categories = Category.query.filter(Category.id.in_(data['categories'])).all()
        if len(categories) != len(data['categories']):
            return jsonify({"message": "Algunas categorías especificadas no existen"}), 400

        new_product = Product(
            name=data['name'],
            description=data.get('description'),
            price=data['price'],
            featured=data.get('featured', False),
            stock=data['stock'],
            imagen_url=data.get('imagen_url'),
            categories=categories
        )
        db.session.add(new_product)
        db.session.commit()
        return jsonify(new_product.serialize()), 201
    except SQLAlchemyError as e:
        return jsonify({"error": "Error al crear el producto", "details": str(e)}), 500

# Actualizar un producto
@product_routes.route('/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    data = request.get_json()
    product = Product.query.get(product_id)

    if not product:
        return jsonify({"message": "Producto no encontrado"}), 404

    try:
        product.name = data.get('name', product.name)
        product.description = data.get('description', product.description)
        product.price = data.get('price', product.price)
        product.featured = data.get('featured', product.featured)
        product.stock = data.get('stock', product.stock)
        product.imagen_url = data.get('imagen_url', product.imagen_url)

        category_ids = data.get('categories')
        if category_ids:
            categories = Category.query.filter(Category.id.in_(category_ids)).all()
            if len(categories) != len(category_ids):
                return jsonify({"message": "Algunas categorías especificadas no existen"}), 400
            product.categories = categories

        db.session.commit()
        return jsonify(product.serialize()), 200
    except SQLAlchemyError as e:
        logger.error(f"Error al actualizar producto {product_id}: {str(e)}", exc_info=True)
        return jsonify({"error": "Error al actualizar el producto", "details": str(e)}), 500

# Eliminar un producto
@product_routes.route('/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    product = Product.query.get(product_id)

    if not product:
        return jsonify({"message": "Producto no encontrado"}), 404

    try:
        db.session.delete(product)
        db.session.commit()
        return jsonify({"message": f"Producto {product_id} eliminado correctamente"}), 200
    except SQLAlchemyError as e:
        logger.error(f"Error al eliminar producto {product_id}: {str(e)}", exc_info=True)
        return jsonify({"error": "Error al eliminar el producto", "details": str(e)}), 500
