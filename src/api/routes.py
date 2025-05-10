"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Genre
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import os

from flask_jwt_extended import create_access_token, current_user, jwt_required


import requests

# Import the Cloudinary libraries
# ==============================
import cloudinary
from cloudinary import CloudinaryImage
import cloudinary.uploader
import cloudinary.api

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

cloudinary.config(
    cloud_name= os.getenv('CLOUD_NAME'),
    api_key= os.getenv('CLOUDINARY_API_KEY'),
    api_secret= os.getenv('CLOUDINARY_API_SECRET'),
    secure= True
)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/img', methods=["POST"])
def upload_image():
    img = request.files["img"]
    img_url = cloudinary.uploader.upload(img)
    print(img_url)
    return jsonify({"img": img_url["url"]}),200



# Creacion de usuario 
@api.route('/register', methods=['POST'])
def register():
    fullName = request.json.get('fullName', None)
    username = request.json.get('username', None)
    address = request.json.get('address', None)
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if not fullName or not username or not email or not password:
        return jsonify({"msg": "Missing required fields"}), 400

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"msg": "Email already exists"}), 400

    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({"msg": "Username already exists"}), 400

    user = User(fullName=fullName, username=username, address=address, email=email, is_artist=True, is_active=True)
    user.set_password(password)

    db.session.add(user)
    db.session.commit()

    return jsonify({"msg": "User has been created"}), 201

@api.route('/login', methods=['POST'])
def generate_token():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(username=username).one_or_none()

    if not user or not user.check_password(password):
        return jsonify("Wrong username or password"), 401
    
    access_token = create_access_token(identity=user)  # Se pasa user.id
    return jsonify(access_token=access_token)


@api.route('/profile', methods=['GET'])
@jwt_required()
def get_current_user():
    return jsonify(current_user.serialize()), 200

# ROUTE TO LOAD GENRES
@api.route('/getGenresapi', methods=["GET"])
def getGenresApi():
    url = "https://api.deezer.com/genre"
    headers = {"accept": "application/json"}
    response = requests.get(url, headers = headers)
    data = response.json()
    for genre in data.get("data", []):
        if not Genre.query.filter_by(id = genre.get("id")).first():
            new_genre = Genre(id = genre.get("id"), name = genre.get("name"))
            db.session.add(new_genre)
        db.session.commit()
    return jsonify(data)

@api.route('/getGenres', methods=["GET"])
def getGenres():
    genres = Genre.query.filter(Genre.id != 0).all()
    return jsonify({"genres": [genre.serialize() for genre in genres]}), 200

