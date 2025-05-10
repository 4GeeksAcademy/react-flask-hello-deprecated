import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash
import jwt
import datetime
import stripe
from api.models import db, Product, Order, Notification, OrderItem
from api.utils import APIException
from flask_jwt_extended import jwt_required, get_jwt_identity

# Cargar las variables de entorno
load_dotenv()

# Configuración de Stripe
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

# Inicializar Blueprint
api = Blueprint('api', __name__)
backend_url = os.getenv("BACKEND_URL")
CORS(api, resources={r"/api/*": {"origins": backend_url}})

@api.route('/create-payment', methods=['POST'])
@jwt_required()
def create_payment():
    user_id = get_jwt_identity()
    data = request.json
    cart_data = data.get("cart", [])

    line_items = []
    if not cart_data:
        return jsonify({"message": "El carrito está vacío."}), 400

    total_amount = 0
    for item in cart_data:
        product = Product.query.get(item['product_id'])
        if product:
            line_items.append({
                'price_data': {
                    'currency': 'usd',
                    'product_data': {'name': product.name},
                    'unit_amount': int(product.price * 100)
                },
                'quantity': item['quantity']
            })
            total_amount += product.price * item['quantity']

    try:
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=line_items,
            mode='payment',
            success_url=os.getenv('REACT_APP_SUCCESS_URL', 'https://default-success-url.com'),
            cancel_url=os.getenv('REACT_APP_CANCEL_URL', 'https://default-cancel-url.com'),
        )
        return jsonify({'id': session.id}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api.route('/hello', methods=['GET'])
def handle_hello():
    return jsonify({"message": "Hello! I'm a message from the backend"}), 200

@api.route('/orders', methods=['POST'])
def create_order():
    data = request.get_json()
    if not data.get('user_id') or not data.get('product_id') or not data.get('quantity'):
        return jsonify({"message": "Usuario, producto y cantidad son requeridos"}), 400

    product = Product.query.get(data['product_id'])
    if not product:
        return jsonify({"message": "Producto no encontrado"}), 404

    new_order = Order(
        user_id=data['user_id'],
        product_id=data['product_id'],
        quantity=data['quantity'],
        total_price=product.price * data['quantity']
    )
    db.session.add(new_order)
    db.session.commit()
    return jsonify({"message": "Pedido creado exitosamente"}), 201

@api.route('/orders', methods=['GET'])
def get_orders():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({"message": "El ID del usuario es obligatorio"}), 400

    orders = Order.query.filter_by(user_id=user_id).all()
    return jsonify([order.serialize() for order in orders]), 200

@api.route('/notifications', methods=['GET'])
def get_notifications():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({"message": "El ID del usuario es obligatorio"}), 400

    notifications = Notification.query.filter_by(user_id=user_id).all()
    return jsonify([notification.serialize() for notification in notifications]), 200

@api.route('/notifications', methods=['POST'])
def create_or_update_notification():
    data = request.get_json()
    if not data.get('message') or not data.get('user_id'):
        return jsonify({"message": "El mensaje y el ID del usuario son requeridos"}), 400

    notification = Notification.query.filter_by(user_id=data['user_id']).first()
    if notification:
        notification.message = data['message']
        db.session.commit()
        return jsonify({"message": "Notificación actualizada"}), 200

    new_notification = Notification(user_id=data['user_id'], message=data['message'])
    db.session.add(new_notification)
    db.session.commit()
    return jsonify({"message": "Notificación creada"}), 201

# Agregar más endpoints según sea necesario
