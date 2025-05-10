"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash
import jwt
import datetime
from api.models import db, User, Product, Order, Notification, OrderItem
from api.utils import APIException
from flask_jwt_extended import jwt_required, get_jwt_identity


load_dotenv()

api = Blueprint('api', __name__)
CORS(api, resources={r"/api/*": {"origins": "https://stunning-lamp-g45qpxg76p9gfpq4-3000.app.github.dev"}})


SECRET_KEY = os.getenv("SECRET_KEY")

@api.route('/hello', methods=['GET'])
def handle_hello():
    return jsonify({"message": "Hello! I'm a message from the backend"}), 200


# Carrito de compras
@api.route('/cart', methods=['GET'])
def get_cart():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({"message": "El ID del usuario es obligatorio"}), 400

    cart_items = OrderItem.query.filter_by(user_id=user_id).all()
    return jsonify([item.serialize() for item in cart_items]), 200


@api.route('/cart', methods=['POST'])
def add_to_cart():
    data = request.get_json()
    if not data.get('product_id') or not data.get('quantity') or not data.get('user_id'):
        return jsonify({"message": "Producto, cantidad e ID del usuario son requeridos"}), 400

    product = Product.query.get(data['product_id'])
    if not product:
        return jsonify({"message": "Producto no encontrado"}), 404

    new_cart_item = OrderItem(user_id=data['user_id'], product_id=data['product_id'], quantity=data['quantity'])
    db.session.add(new_cart_item)
    db.session.commit()
    return jsonify({"message": "Producto agregado al carrito"}), 201


@api.route('/cart/<int:id>', methods=['DELETE'])
def remove_from_cart(id):
    cart_item = OrderItem.query.get(id)
    if not cart_item:
        return jsonify({"message": "Producto no encontrado en el carrito"}), 404

    db.session.delete(cart_item)
    db.session.commit()
    return jsonify({"message": "Producto eliminado del carrito"}), 200

# Crear un nuevo pedido
@api.route('/orders', methods=['POST'])
def create_order():
    data = request.get_json()
    if not data.get('user_id') or not data.get('product_id') or not data.get('quantity'):
        return jsonify({"message": "Usuario, producto y cantidad son requeridos"}), 400

    product = Product.query.get(data['product_id'])
    if not product:
        return jsonify({"message": "Producto no encontrado"}), 404
   
   # Crear un nuevo pedido
    new_order = Order(
        user_id=data['user_id'],
        product_id=data['product_id'],
        quantity=data['quantity'],
        total_price=product.price * data['quantity']
    )
    db.session.add(new_order)
    db.session.commit()
    return jsonify({"message": "Pedido creado exitosamente"}), 201

# Obtener pedidos de un usuario
@api.route('/orders', methods=['GET'])
def get_orders():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({"message": "El ID del usuario es obligatorio"}), 400

    orders = Order.query.filter_by(user_id=user_id).all()
    return jsonify([order.serialize() for order in orders]), 200

# Consultar recordatorios/notificaciones
@api.route('/notifications', methods=['GET'])
def get_notifications():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({"message": "El ID del usuario es obligatorio"}), 400

    notifications = Notification.query.filter_by(user_id=user_id).all()
    return jsonify([notification.serialize() for notification in notifications]), 200

# Crear o actualizar un recordatorio
@api.route('/notifications', methods=['POST'])
def create_or_update_notification():
    data = request.get_json()
    if not data.get('message') or not data.get('user_id'):
        return jsonify({"message": "El mensaje y el ID del usuario son requeridos"}), 400

   # Crear o actualizar una notificación
    notification = Notification.query.filter_by(user_id=data['user_id']).first()
    if notification:
        notification.message = data['message']
        db.session.commit()
        return jsonify({"message": "Notificación actualizada"}), 200

    new_notification = Notification(user_id=data['user_id'], message=data['message'])
    db.session.add(new_notification)
    db.session.commit()
    return jsonify({"message": "Notificación creada"}), 201
