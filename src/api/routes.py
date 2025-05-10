import jwt
from flask import Flask, request, jsonify, Blueprint
from api.utils import generate_sitemap, APIException
from api.models import Evento, Usuario, db
from flask_cors import CORS
from sqlalchemy.exc import IntegrityError  # Import IntegrityError
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash
from functools import wraps
import hashlib
import datetime

api = Blueprint('api', __name__)

SECRET_KEY = '2f0c5c0e5994d1f6c072eddd68cd9f5e'

# Allow CORS requests to this API
CORS(api)

# Utility function to generate JWT token
def generate_jwt(user):
    payload = {
        "sub": user.id,  # The ID of the user
        "email": user.email,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)  # Token expires in 1 hour
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
    return token




def jwt_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]

        if not token:
            return jsonify({"message": "Token is missing"}), 403

        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            current_user = Usuario.query.get(payload["sub"])
        except jwt.ExpiredSignatureError:
            return jsonify({"message": "Token has expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"message": "Invalid token"}), 401

        return f(current_user, *args, **kwargs)

    return decorated_function

import hashlib

# Function to generate a custom hash (SHA-512, truncated to 80 characters)
def generate_custom_hash(password):
    """
    Generate a custom hash for the password using SHA-512 and truncate it to 80 characters.
    """
    sha512_hash = hashlib.sha512(password.encode()).hexdigest()
    return sha512_hash[:80]  # Truncate to 80 characters

# Function to check if the provided password matches the stored hash
def check_password(stored_hash, password):
    """
    Check if the provided password matches the stored hashed password.
    """
    print("stored hasf", stored_hash),
    print("password", generate_custom_hash(password))
    # Generate the hash of the provided password and compare with the stored hash
    return stored_hash == generate_custom_hash(password)

# POST login - authenticate user and return JWT
@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    if not data.get('email') or not data.get('password'):
        return jsonify({"message": "Email and password are required"}), 400

    user = Usuario.query.filter_by(email=data['email']).first()


    if user and check_password(user.password, data['password']):
        # Generate JWT token if the password matches
        token = generate_jwt(user)
        return jsonify({"token": token}), 200
    else:
        return jsonify({"message": "Invalid email or password"}), 401

# GET all users
@api.route('/users', methods=['GET'])
def get_users():
    users = Usuario.query.all()
    return jsonify([user.serialize() for user in users]), 200

# GET a specific user by ID
@api.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = Usuario.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404
    return jsonify(user.serialize()), 200

# POST a new user
@api.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()

    # Hash the password before storing it in the database
    hashed_password = generate_custom_hash(data['password'])

    try:
        new_user = Usuario(
            email=data['email'],
            password=hashed_password,
            is_active=True
        )
        db.session.add(new_user)
        db.session.commit()
        return jsonify(new_user.serialize()), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({"message": "Username or email already exists"}), 400

# PUT update a user
@api.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = Usuario.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404

    data = request.get_json()
    user.username = data.get('username', user.username)
    user.email = data.get('email', user.email)
    user.password = data.get('password', user.password)

    db.session.commit()
    return jsonify(user.serialize()), 200

# DELETE a user
@api.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = Usuario.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted"}), 200


# GET all events
@api.route('/events', methods=['GET'])
def get_events():
    events = Evento.query.all()
    return jsonify([event.serialize() for event in events]), 200

# GET a specific event by ID
@api.route('/events/<int:event_id>', methods=['GET'])
def get_event(event_id):
    event = Evento.query.get(event_id)
    if not event:
        return jsonify({"message": "Event not found"}), 404
    return jsonify(event.serialize()), 200

# POST a new event
@api.route('/events', methods=['POST'])
def create_event():
    data = request.get_json()

    # Make sure that 'usuario_id' is passed as part of the data
    if 'usuario_id' not in data:
        return jsonify({"message": "'usuario_id' is required"}), 400

    try:
        new_event = Evento(
            titulo=data['title'],  # Mapping title field from request
            descripcion=data.get('description', ''),  # Description can be optional
            clima=data['clima'],  # Get weather data
            usuario_id=data['usuario_id'],  # Correctly map 'usuario_id'
            fecha=data['date']  # Assuming the date is passed as string in the request
        )
        db.session.add(new_event)
        db.session.commit()
        return jsonify(new_event.serialize()), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({"message": "An error occurred while creating the event"}), 400

# PUT update an event
@api.route('/events/<int:event_id>', methods=['PUT'])
def update_event(event_id):
    event = Evento.query.get(event_id)
    if not event:
        return jsonify({"message": "Event not found"}), 404

    data = request.get_json()

    event.titulo = data.get('title', event.titulo)
    event.descripcion = data.get('description', event.descripcion)
    event.clima = data.get('clima', event.clima)
    event.fecha = data.get('date', event.fecha)

    db.session.commit()
    return jsonify(event.serialize()), 200

# DELETE an event
@api.route('/events/<int:event_id>', methods=['DELETE'])
def delete_event(event_id):
    event = Evento.query.get(event_id)
    if not event:
        return jsonify({"message": "Event not found"}), 404
    db.session.delete(event)
    db.session.commit()
    return jsonify({"message": "Event deleted"}), 200

# GET events by user ID
@api.route('/events/user/<int:user_id>', methods=['GET'])
def get_events_by_user(user_id):
    events = Evento.query.filter_by(usuario_id=user_id).all()  # Query events by user_id
    
    if not events:
        return jsonify({"message": "No events found for this user"}), 404
    
    return jsonify([event.serialize() for event in events]), 200