import os
from dotenv import load_dotenv
from flask import request, jsonify, Blueprint
from flask_cors import CORS
import stripe
from api.models import Cart, db, Product
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
    