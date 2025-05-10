"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Accounts
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required,verify_jwt_in_request, decode_token
from flask_jwt_extended.exceptions import NoAuthorizationError
from flask_bcrypt import Bcrypt

api = Blueprint('api', __name__)
bcrypt = Bcrypt()

CORS(api)
# @api.route('/hello', methods=['POST', 'GET'])
# def handle_hello():

#     response_body = {
#         "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
#     }

#     return jsonify(response_body), 200
        #este endpoint busca y muestra a todos los usuarios registrados
@api.route('/users', methods=['GET'])
def get_users():
    data = db.session.scalars(db.select(User)).all()
    result = list(map(lambda item: item.serialize(),data))
    if result == []:
        return jsonify({"msg":"Usuario no encontrado"}), 404
    response_body = {
        "results": result
    }
    return jsonify(response_body), 200
        #este endpoint busca un usuario especifico entre todos los demas
@api.route('/user/<int:user_id>', methods=['GET'])
def get_one_user(user_id):
    try:
        user = db.session.execute(db.select(User).filter_by(id=user_id)).scalar_one()
        return jsonify({"result":user.serialize()}), 200
    except:
        return jsonify({"msg":"Usuario o contraseña incorrecta"}), 404
    #este endpoint valida los datos de usuario y crea el token de acceso
@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    try:
        user = db.session.execute(db.select(User).filter_by(email=email)).scalar_one()
        if not bcrypt.check_password_hash(user.password, password):
            return jsonify({"msg": "Bad email or password"}), 401
        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token)
    except:
        return jsonify({"msg": "this user does not exist"}), 404
        #este endpoin protege la ruta del usuario
@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

@api.route("/verify-token", methods=["GET"])
def verify_token():
    try:
        verify_jwt_in_request()  # Verifica la validez del token
        identity = get_jwt_identity()  # Obtiene el usuario del token
        return jsonify({"valid": True, "user": identity}), 200
    except NoAuthorizationError:
        return jsonify({"valid": False, "message": "Token inválido o no proporcionado"}), 401
        
        #este endpoint crea una cuenta con el  id del usuario  
@api.route('/<int:user_id>/new-account', methods=['POST'])
def post_account(user_id):
    try:
        request_body = request.json

        exist = db.session.query(db.select(Accounts).filter_by(name=request_body["name"]).exists()).scalar()
        if not exist: 
            new_account = Accounts(user_id=user_id, name=request_body["name"], balance=request_body["balance"], coin=request_body["coin"], type=request_body["type"])
            db.session.add(new_account)
            db.session.commit()  
            return jsonify(request_body), 200
        else:
            return jsonify({"msg": "Account already exist"}), 404
    except Exception as e:
        return jsonify({"msg":"Error", "error": str(e)}), 500
        #este endpint muestra todas cuentas en general
@api.route('/accounts', methods=['GET'])
def get_accounts():
    data = db.session.scalars(db.select(Accounts)).all()
    result = list(map(lambda item: item.serialize(),data))
    if result == []:
        return jsonify({"msg":"no accounts, please create one"}), 404
    response_body = {
        "results": result
    }
    return jsonify(response_body), 200
        # este endpoin busca la lista de cuentas y muestra una sola cuenta especifica
@api.route('/accounts/<int:accounts_id>', methods=['GET'])
def get_one_accounts(accounts_id):
    try:
        account = db.session.execute(db.select(Accounts).filter_by(id=accounts_id)).scalar_one()
        return jsonify({"result":account.serialize()}), 200
    except:
        return jsonify({"msg":"account not found"}), 404
         #este endpoint valida si existe el usuario y muestra las cuentas de un usuario especifico
@api.route('/user/<int:user_id>/accounts', methods=['GET'])
def get_one_account_to_one_user(user_id):
    try:
        exist = db.session.query(db.select(Accounts).filter_by(user_id=user_id).exists()).scalar()
        if exist:
            accounts = db.session.execute(db.select(Accounts).filter_by(user_id=user_id)).scalars().all()
            if accounts != []:
                return jsonify({"result": [acc.serialize() for acc in accounts]}), 200
            return jsonify({"msg": "No accounts to show"})
        else:
            return jsonify({"msg": "user doesn't exist"}), 404
        
    except Exception as e:
        return jsonify({"msg":"Error", "error": str(e)}), 500

    
# endpoints
# registro usuario
@api.route("/signup", methods=["POST"])
def signup():
    body = request.json
    # para manejo de errores poner exactamente el nombre del front igual en los campos entre parentesis (esperar a que se haga el front)
    if not body or not body.get("email") or not body.get("password") or not body.get("last_name")or not body.get("first_name"):
        return jsonify({"msg": "missing fields"}), 400
    hashe_password = bcrypt.generate_password_hash(body["password"]).decode("utf-8")
    # encajar con los nombres del front estos (solo los que estan entre comillas)
    new_user = User(email = body["email"],password=hashe_password, last_name= body["last_name"],first_name= body["first_name"])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg": "user created"}), 201