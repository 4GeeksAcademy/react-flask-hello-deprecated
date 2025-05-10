from flask import Blueprint, request, jsonify
from api.models import db, Product, Cart
from flask_jwt_extended import jwt_required, get_jwt_identity

cart_routes = Blueprint('cart_routes', __name__)

# Obtener los productos en el carrito de un usuario
@cart_routes.route('/cart', methods=['GET'])
@jwt_required()  # Asegura que el token esté presente y sea válido
def get_cart():
    user_id = get_jwt_identity()  # Obtiene el ID del usuario desde el JWT
    if not user_id:
        return jsonify({"message": "El ID del usuario es obligatorio"}), 400

    cart_items = Cart.query.filter_by(user_id=user_id).all()
    if not cart_items:
        return jsonify({"message": "No hay productos en el carrito"}), 404

    return jsonify([item.serialize() for item in cart_items]), 200

# Añadir un producto al carrito
@cart_routes.route('/cart', methods=['POST'])
@jwt_required()
def add_to_cart():
    data = request.get_json()  # Obtener los datos de la solicitud
    if not data.get('product_id') or not data.get('quantity') or not data.get('user_id'):
        return jsonify({"message": "Producto, cantidad e ID del usuario son requeridos"}), 400

    product = Product.query.get(data['product_id'])
    if not product:
        return jsonify({"message": "Producto no encontrado"}), 404

    # Verificar si el producto ya está en el carrito
    cart_item = Cart.query.filter_by(user_id=data['user_id'], product_id=data['product_id']).first()
    if cart_item:
        cart_item.quantity += data['quantity']  # Si ya existe, solo aumentamos la cantidad
    else:
        new_cart_item = Cart(user_id=data['user_id'], product_id=data['product_id'], quantity=data['quantity'])
        db.session.add(new_cart_item)

    db.session.commit()  # Guardar los cambios en la base de datos
    return jsonify({"message": "Producto agregado al carrito"}), 201

# Eliminar un producto del carrito
@cart_routes.route('/cart/<int:id>', methods=['DELETE'])
@jwt_required()
def remove_from_cart(id):
    cart_item = Cart.query.get(id)

    if cart_item:
        db.session.delete(cart_item)
        db.session.commit()
        return jsonify({"message": "Producto eliminado del carrito"}), 200
    
    return jsonify({"message": "El producto no estaba en el carrito, por lo que no se eliminó."}), 200

# Limpiar el carrito después del pago
@cart_routes.route('/clear-cart', methods=['POST'])
@jwt_required()
def clear_cart():
    user_id = get_jwt_identity()  # Obtener el ID del usuario desde el JWT

    # Eliminar todos los productos del carrito para el usuario
    Cart.query.filter_by(user_id=user_id).delete()
    db.session.commit()

    return jsonify({"message": "Carrito vaciado exitosamente"}), 200
