

from flask import request, jsonify, current_app
from werkzeug.security import check_password_hash
from datetime import datetime, timedelta
import jwt
from functools import wraps
from .models import User  # Asegúrate de la ruta correcta al modelo User

def generate_access_token(user):
    expires = datetime.utcnow() + current_app.config['JWT_ACCESS_TOKEN_EXPIRES']
    payload = {
        'user_id': user.id,
        'exp': expires
    }
    token = jwt.encode(payload, current_app.config['JWT_SECRET_KEY'], algorithm='HS256')
    return token

def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            try:
                bearer, token = auth_header.split()
                if bearer != 'Bearer':
                    return jsonify({'message': 'El token debe ser Bearer'}), 401
            except ValueError:
                return jsonify({'message': 'Formato de token no válido'}), 401

        if not token:
            return jsonify({'message': 'Token requerido'}), 401

        try:
            data = jwt.decode(token, current_app.config['JWT_SECRET_KEY'], algorithms=['HS256'])
            current_user = User.query.get(data['user_id'])
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token expirado'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Token inválido'}), 401

        return f(current_user, *args, **kwargs)
    return decorator

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('correo')
    password = data.get('contraseña')

    if not email or not password:
        return jsonify({'message': 'Correo y contraseña son obligatorios'}), 400

    user = User.query.filter_by(email=email).first()

    if user and user.check_password(password):
        access_token = generate_access_token(user)
        return jsonify({'access_token': access_token}), 200
    else:
        return jsonify({'message': 'Credenciales inválidas'}), 401

@app.route('/protected', methods=['GET'])
@token_required
def protected(current_user):
    return jsonify({'message': f'Esta es una ruta protegida para el usuario con ID: {current_user.id}'}), 200