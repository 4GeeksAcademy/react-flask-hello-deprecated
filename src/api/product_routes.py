from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from api.models import db, Product, Category, User

product_routes = Blueprint('product_routes', __name__)

# Ruta para obtener productos con soporte de paginación y productos destacados
@product_routes.route('/', methods=['GET'])
def get_products():
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        featured = request.args.get('featured', 'false').lower() == 'true'
        search = request.args.get('search', '', type=str)
        category_id = request.args.get('category_id', type=int)

        query = Product.query

        if featured:
            query = query.filter_by(featured=True)

        if search:
            query = query.filter(Product.name.ilike(f'%{search}%'))

        if category_id:
            query = query.join(Product.categories).filter(Category.id == category_id)

        pagination = query.paginate(page=page, per_page=per_page, error_out=False)
        products = [product.serialize() for product in pagination.items]

        return jsonify({
            "products": products,
            "total": pagination.total,
            "page": pagination.page,
            "per_page": pagination.per_page,
            "pages": pagination.pages
        }), 200
    except Exception as e:
        return jsonify({"error": "Error al obtener productos", "details": str(e)}), 500

# Ruta para crear un producto
@product_routes.route('/', methods=['POST'])
@jwt_required()
def create_product():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user or not user.is_admin:
        return jsonify({"error": "No tienes permiso para realizar esta acción"}), 403

    try:
        data = request.get_json()
        name = data.get("name")
        price = data.get("price")
        stock = data.get("stock", 0)
        category_ids = data.get("categories", [])

        if not name or not price:
            return jsonify({"error": "Los campos 'name' y 'price' son obligatorios"}), 400

        if not isinstance(category_ids, list):
            return jsonify({"error": "El campo 'categories' debe ser un arreglo"}), 400

        categories = Category.query.filter(Category.id.in_(category_ids)).all()
        if len(categories) != len(category_ids):
            return jsonify({"error": "Una o más categorías no existen"}), 400

        new_product = Product(
            name=name,
            description=data.get("description", ""),
            price=price,
            stock=stock,
            imagen_url=data.get("imagen_url", ""),
            featured=data.get("featured", False)
        )
        new_product.categories.extend(categories)

        db.session.add(new_product)
        db.session.commit()

        return jsonify(new_product.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Error al crear el producto: {str(e)}"}), 500

# Ruta para actualizar un producto
@product_routes.route('/<int:product_id>', methods=['PUT'])
@jwt_required()
def update_product(product_id):
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user or not user.is_admin:
        return jsonify({"error": "No tienes permiso para realizar esta acción"}), 403

    try:
        data = request.get_json()
        product = Product.query.get(product_id)

        if not product:
            return jsonify({"error": "Producto no encontrado"}), 404

        product.name = data.get("name", product.name)
        product.description = data.get("description", product.description)
        product.price = data.get("price", product.price)
        product.stock = data.get("stock", product.stock)
        product.imagen_url = data.get("imagen_url", product.imagen_url)
        product.featured = data.get("featured", product.featured)

        if "categories" in data:
            category_ids = data["categories"]
            if not isinstance(category_ids, list):
                return jsonify({"error": "El campo 'categories' debe ser un arreglo"}), 400

            categories = Category.query.filter(Category.id.in_(category_ids)).all()
            if len(categories) != len(category_ids):
                return jsonify({"error": "Una o más categorías no existen"}), 400
            product.categories = categories

        db.session.commit()

        return jsonify(product.serialize()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Error al actualizar el producto: {str(e)}"}), 500

# Ruta para eliminar un producto
@product_routes.route('/<int:product_id>', methods=['DELETE'])
@jwt_required()
def delete_product(product_id):
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user or not user.is_admin:
        return jsonify({"error": "No tienes permiso para realizar esta acción"}), 403

    try:
        product = Product.query.get(product_id)

        if not product:
            return jsonify({"error": "Producto no encontrado"}), 404

        db.session.delete(product)
        db.session.commit()

        return jsonify({"message": "Producto eliminado exitosamente"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Error al eliminar el producto: {str(e)}"}), 500
