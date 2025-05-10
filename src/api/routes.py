"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/sign-up', methods=['GET'])
def register_user():

    response_body = {
        "message": "here you will create a new user"
    }

    return jsonify(response_body), 200


@api.route('/log-in', methods=['GET'])
def log_in_user():

    response_body = {
        "message": "here you will create the log in page"
    }

    return jsonify(response_body), 200


@api.route('/about-us', methods=['GET'])
def about_us():

    response_body = {
        "message": "aqui saldra el about us de todos nosotros"
    }

    return jsonify(response_body), 200

#